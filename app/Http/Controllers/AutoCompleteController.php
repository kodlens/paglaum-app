<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AutoCompleteController extends Controller
{
    public function memberAutocomplete(Request $req){
        //return $req;
        if($req->key === null){
            return [];
        }

        $req->validate([
            'key' => ['string']
        ]);

        return User::where('lname', 'like', $req->key. '%')
            ->get([
                'lname','fname', 'mname', 'sex'
            ]);
    }

    public function memberNotApproveAutocomplete(Request $req){
        //return $req;
        if($req->key === null){
            return [];
        }
        
        $req->validate([
            'key' => ['string']
        ]);

        return User::where('lname', 'like', $req->key. '%')
            ->where('active', 0)
            ->get([
                'lname','fname', 'mname', 'sex'
            ]);
    }

    public function savingsAutoComplete(Request $req){
        //return $req;
        if($req->key === null){
            return [];
        }
        
        $req->validate([
            'key' => ['string']
        ]);

        return User::where('lname', 'like', $req->key. '%')
            ->get([
                'lname','fname', 'mname', 'sex'
            ]);
    }
}
