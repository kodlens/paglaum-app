<?php

namespace App\Http\Controllers\Do;

use App\Http\Controllers\Controller;
use App\Models\SavingAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Auth;
use App\Models\User;


class DoMemberSavingsAccountController extends Controller
{
    //
    public function index(){
        return Inertia::render('Do/DoSavingsAccounts/DoSavingsAccountsIndex', []);
    }

    public function getData(Request $req){

        $data = SavingAccount::with(['user'])
            ->whereHas('user', function($q) use($req){
                $q->where('lname', 'like', $req->input('name').'%');
            })
            ->where('account_no', 'like', $req->input('sa').'%')
            ->paginate($req->perPage);

        return $data;
    }

    public function approve($id){
        $data = SavingAccount::find($id);
        if($data->is_do_approved == 1){
            return response()->json([
                'errors' => [
                    'approve' => ['Already approved.']
                ],
                'message' => 'Already approved.'
            ], 422);
        }

        $data->is_do_approved = 1;
        $data->save();

        return response()->json([
            'status' => 'approved',
        ], 200);
    }

    public function disapprove($id){
        $data = SavingAccount::find($id);

        if($data->is_bm_approved == 0){
            $data->is_do_approved = 0;
            $data->save();

            return response()->json([
                'status' => 'disapproved',
            ], 200);
        }
       return response()->json([
        'errors' => [
            'approve' => ['Deactivation is not permitted.']
        ],
        'message' => 'Deactivation is not permitted.'
       ], 422);
    }


    // public function activate($id){
    //     $data = SavingAccount::find($id);
    //     $data->opened_at = \Carbon\Carbon::now();
    //     $data->is_active = 1;
    //     $data->save();

    //      $user = User::where('id', $data->user_id)
    //         ->first();

    //     $output = '';
    //     if(env('SMS') > 0){
    //         $apiKey = env('SMS_API_KEY');
    //         $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
    //             'apikey'     => $apiKey,
    //             'number'     => $user->contact_no,
    //             'message'    => 'Hello ' . $user->lname . ', '. $user->fname . ', your savings account is now activated. Thank you.',
    //             'sendername' => 'LARATSYS',
    //         ]);
            
    //         // Check if request was successful
    //         if ($response->successful()) {
    //             $output = $response->json(); // Optional: handle the JSON response
    //         } else {
    //             // Handle the error
    //             \Log::error('SMS sending failed', [
    //                 'response' => $response->body(),
    //                 'status' => $response->status(),
    //             ]);
    //         }
    //     }

    //     return response()->json([
    //         'status' => 'activated',
    //     ], 200);
    // }

    // public function deactivate($id){
    //     $data = SavingAccount::find($id);
    //     $data->is_active = 0;
    //     $data->save();

    //     return response()->json([
    //         'status' => 'deactivated',
    //     ], 200);
    // }

}
