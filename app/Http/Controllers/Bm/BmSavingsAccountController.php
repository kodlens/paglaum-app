<?php

namespace App\Http\Controllers\Bm;

use App\Http\Controllers\Controller;
use App\Models\SavingAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;


class BmSavingsAccountController extends Controller
{
    //
    public function index(){
        return Inertia::render('Bm/BmSavingsAccounts/BmSavingsAccountsIndex');
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
        $data = SavingAccount::with(['user'])
            ->find($id);
        
        if($data->is_bm_approved == 1){
            return response()->json([
                'errors' => [
                    'approval' => ['Already approved.']
                ],
                'message' => 'Already approved.'
            ], 422);
        }
        $data->is_bm_approved = 1;
        $data->is_approved = 1;
        $data->is_active = 1;
        $data->save();

        if(env('SMS') > 0){
            $apiKey = env('SMS_API_KEY');
            $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                'apikey'     => $apiKey,
                'number'     => $data->user['contact_no'],
                'message'    => 'Your savings application with account no. '.$data->account_no.' has been successfully activated.',
                'sendername' => 'LARATSYS',
            ]);

            // Check if request was successful
            if ($response->successful()) {
                $output = $response->json(); // Optional: handle the JSON response
            } else {
                // Handle the error
                \Log::error('SMS sending failed', [
                    'response' => $response->body(),
                    'status' => $response->status(),
                ]);
            }
        }
        //\Log::info('SMS sent for approve savings acc');

        return response()->json([
            'status' => 'approved',
        ], 200);
    }

    public function disapprove($id){
        $data = SavingAccount::find($id);
        if($data->is_bm_approved == 0){
            return response()->json([
                'errors' => [
                    'approval' => ['Already disapproved.']
                ],
                'message' => 'Already disapproved.',
            ], 422);
        }

        $data->is_bm_approved = 0;
        $data->is_active = 0;
        $data->is_approved = 0;
        $data->save();

        return response()->json([
            'status' => 'disapproved',
        ], 200);
    }


    public function activate($id){
        $data = SavingAccount::find($id);
        $data->is_active = 1;
        $data->save();

        return response()->json([
            'status' => 'activated',
        ], 200);
    }

    public function deactivate($id){
        $data = SavingAccount::find($id);
        $data->is_active = 0;
        $data->save();

        return response()->json([
            'status' => 'deactivated',
        ], 200);
    }

}

