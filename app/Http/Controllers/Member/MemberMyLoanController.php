<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Loan;
use App\Models\LoanDetail;
use Auth;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Storage;

class MemberMyLoanController extends Controller
{
    //
    public function index(){
        return Inertia::render('Member/MyLoan/MyLoanIndex');
    }

    public function getMyLoans(Request $req){
        $user = Auth::user();
        
        return Loan::with(['loan_type', 'loan_subtype'])
            ->where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->get();
    }


    public function store(Request $req){
       
        $principal = (double)$req->principal;
        $user = Auth::user();

        if($user->is_loan_allowed == 0){
            return response()->json([
                'errors' => [
                    'principal' => ['Your account is not yet approved for any loan at this time.']
                ],
                'message' => 'Your account is not yet approved for any loan at this time.'
            ], 422);
        }

        if($principal < 100){
            return response()->json([
                'errors' => [
                    'principal' => ['Principal amount must not less than 100.'] 
                ],
                'message' => 'Principal amount must not less than 100.'
            ], 422);
        }

        $req->validate([
            'loan_type_id' => ['required', 'gt:0'],
            'loan_subtype_id' => ['required','gt:0'],
            'terms_month' => ['required', 'gt:0'],
            'interest' => ['required', 'gt:0'],
            'upload' => ['required'],
            'co_maker' => ['required'],
            'co_maker_identification' => ['required'],
            'co_maker_signature' => ['required'],
            'signature' => ['required'],
        ],[
            'loan_type_id.required' => 'Please select loan type',
            'loan_type_id.gt' => 'Please select loan type',
            'loan_subtype_id.required' => 'Please select loan sub type',
            'loan_subtype_id.gt' => 'Please select loan sub type',
            'interest.required' => 'Please select loan and loan subtype.',
            'interest.gt' => 'Please select loan and loan subtype.',
            'terms_month.required' => 'Please select loan sub type',
            'terms_month.gt' => 'Please select loan sub type',
            'upload.max' => 'The upload image must not be greater than 1MB in size',
            'upload.required' => 'Please upload an image of a valid Id',
            'co_maker_identification.required' => 'Please upload an image of a valid Id'
        ]);
        // check if the user have loan history
        $exists = Loan::where('user_id', $user->id)->existS();
        if($exists){
            /* -------------- add checking if allowed reloan ------------------ */
            /* -------------- prevent the user to reloan ------------------ */
            require __DIR__.'/partials/check_reloan.php';
            if($totalMonthsMustPaid > $countMonthsPaid){
                return response()->json([
                    'errors' => [
                        'principal' => ['Reloan is not allowed this time.']
                    ],
                    'message' => 'Reloan is not allowed this time.'
                ], 422);
            }
            /* -------------- *************END*********** ------------------ */
        }

        try{

            \DB::transaction(function () use ($req, $user) {

                $imgpath = $req->upload[0]['response'];
                $imgPathCoMakerIdentification = $req->co_maker_identification[0]['response'];

                $principal = $req->principal;
                $terms = $req->terms_month / 12;
                $interest = $req->interest / 100;
                $monthlyInterest = $principal * $interest * $terms;
                $totalPayment = $principal + ($monthlyInterest * $req->terms_month);
              
               
                $loan = Loan::create([
                    'user_id' => $user->id,
                    'purpose' => $req->purpose,
                    'loan_type_id' => $req->loan_type_id,
                    'loan_subtype_id' => $req->loan_subtype_id,
                    'principal' => $req->principal,
                    'interest' => $req->interest,
                    'mode_payment' => $req->mode_payment,
                    'terms_month' => $req->terms_month,
                    'total_payment' => $totalPayment,
                    'kyc_id' => $imgpath,
                    'co_maker' => $req->co_maker,
                    'co_maker_identification' => $imgPathCoMakerIdentification,
                    'co_maker_signature' => $req->co_maker_signature,
                    'signature' => $req->signature,
                ]);

                if (Storage::exists('public/temp/' . $imgpath)) {
                    // Move the file
                    Storage::move('public/temp/' . $imgpath, 'public/identifications/' . $imgpath); 
                    Storage::delete('public/temp/' . $imgpath);
                }
    
                //for CO Maker
                if (Storage::exists('public/temp/' . $imgPathCoMakerIdentification)) {
                    // Move the file
                    Storage::move('public/temp/' . $imgPathCoMakerIdentification, 'public/identifications/' . $imgPathCoMakerIdentification); 
                    Storage::delete('public/temp/' . $imgPathCoMakerIdentification);
                }
                
            });

            return response()->json([
                'status' => 'saved'
            ], 200);
            
        }catch(\Exception  $e){
            return response()->json(['error' => ['Transaction failed: ' . $e->getMessage()], 'message' => $e->getMessage()], 500);
        }
    }


    public function create(){
        return Inertia::render('Member/MyLoan/CreateEdit');
    }


    /** IMAGE HANDLING */
    /* ================= */
    public function tempUpload(Request $req){
        //return $req;
        $req->validate([
            'upload' => ['required', 'mimes:jpg,jpeg,png', 'max:5120']
        ],[
            'upload.max' => 'The upload image must not be greater than 1MB in size'
        ]);

        $file = $req->kyc_id;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $imageName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $imagePath = $file->storeAs('public/temp', $imageName);
        $n = explode('/', $imagePath);
        return $n[2];
    }

    public function removeUpload($fileName){
       
        if(Storage::exists('public/temp/' .$fileName)) {
            Storage::delete('public/temp/' . $fileName);
            return response()->json([
                'status' => 'temp_deleted'
            ], 200);
        }

        //this will remove the image from featured_image
        // if(Storage::exists('public/signatures/' . $fileName)) {
        //     Storage::delete('public/signatures/' . $fileName);

        //     Loan::where('featured_image', $fileName)
        //         ->update([
        //             'featured_image' => null
        //         ]);
        //     return response()->json([
        //         'status' => 'removed'
        //     ], 200);
        // }

        return response()->json([
            'status' => 'temp_error'
        ], 200);
    }


    public function coMakerTempUpload(Request $req){
          //return $req;
          $req->validate([
            'co_maker_identification' => ['required', 'mimes:jpg,jpeg,png', 'max:5120']
        ],[
            'co_maker_identification.max' => 'The upload image must not be greater than 1MB in size'
        ]);

        $file = $req->co_maker_identification;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $imageName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $imagePath = $file->storeAs('public/temp', $imageName);
        $n = explode('/', $imagePath);
        return $n[2];
    }

}
