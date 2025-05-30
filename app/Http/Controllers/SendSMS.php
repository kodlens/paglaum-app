<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Carboon\Carbon;

class SendSMS extends Controller
{

    public function sendSMS($contactNo, $message)
    {
        if(env('SMS') > 0){
            $apiKey = env('SMS_API_KEY');
            $response = Http::asForm()->post('https://semaphore.co/api/v4/messages', [
                'apikey'     => $apiKey,
                'number'     => $contactNo,
                'message'    => $message,
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
        // Example: log the message or integrate with a service
        \Log::info("Sending SMS to $contactNo: $message");

        // OR if using a real service (e.g., Twilio)
        // Twilio::message($phoneNumber, $message);
    }

}
