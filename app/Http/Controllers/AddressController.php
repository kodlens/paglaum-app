<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Province;
use App\Models\City;
use App\Models\Barangay;

class AddressController extends Controller
{
    public function loadProvinces(){
        return Province::orderBy('provDesc', 'asc')
            ->where('active', 1)
            ->get();
    }


    public function loadCities(Request $req){
        $provCode = $req->provcode;

        return City::where('provCode', $provCode)
            ->orderBy('citymunDesc', 'asc')
            ->where('active', 1)
            ->get();
    }

    public function loadBarangays(Request $req){
        $citymunCode = $req->citycode;

        return Barangay::where('citymunCode', $citymunCode)
            ->orderBy('brgyDesc', 'asc')
            ->where('active', 1)
            ->get();
    }
}
