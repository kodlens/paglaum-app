<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;


class SmsNotif extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sms-notif';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sending SMS Notification';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->sendSMS(
            '09706102876',
            'This is sample message from command'
        );
    }


     public function sendSMS($mobile, $msg){

        if(env('SMS') > 0){
            $apiKey = env('SMS_API_KEY');
            $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                'apikey'     => $apiKey,
                'number'     => $mobile,
                'message'    => $msg,
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
    }


}
