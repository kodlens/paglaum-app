<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Area;
use Inertia\Response;

class AdminAreaContoller extends Controller
{
    //
    public function index(){
        return Inertia::render('Admin/Area/AdminAreaIndex');
    }


    public function getData(Request $req){
        return Area::orderBy('id', 'desc')->paginate($req->perpage);
    }


    public function show($id){
        return Area::find($id);
    }

    public function store(Request $req){
        return $req;
        $req->validate([
            'area' => 'required',
            'description' => 'required',
        ]);

        Area::create([
            'area' => strtoupper($req->area),
            'description' => $req->description,
            'order_no' => $req->order_no,
            'active' => $req->active ? 1 : 0,
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }

}
