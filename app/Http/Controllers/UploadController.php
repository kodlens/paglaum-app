<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    /** IMAGE HANDLING */
    /* ================= */
    public function tempUpload(Request $req){

        //return $req;
        $req->validate([
            'upload' => ['required', 'mimes:jpg,jpeg,png', 'max:5120']
        ],[
            'upload.max' => 'The upload image must not be greater than 1MB in size'
        ]);

        $file = $req->id_image;
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

        return response()->json([
            'status' => 'temp_error'
        ], 200);
    }


}
