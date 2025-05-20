<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\IdType;
use Inertia\Inertia;
use Inertia\Response;


class IdTypeController extends Controller
{
    public function index(){
        return Inertia::render('Admin/IdType/index');
    }


      public function getData(Request $req){
        return IdType::orderBy('id', 'desc')->paginate($req->perpage);
    }


    public function show($id){
        return IdType::find($id);
    }

    public function store(Request $req){

        $req->validate([
            'id_type' => 'required',
        ]);

        IdType::create([
            'id_type' => strtoupper($req->id_type),
            'order_no' => $req->order_no,
            'active' => $req->active ? 1 : 0,
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }

    public function update(Request $req, $id){
        
        $req->validate([
            'id_type' => 'required|unique:id_types,id_type,'.$id,
        ]);

        IdType::find($id)->update([
            'id_type' => strtoupper($req->id_type),
            'order_no' => $req->order_no,
            'active' => $req->active ? 1 : 0,
        ]);

        return response()->json([
            'status' => 'updated'
        ], 200);    
    }



    public function destroy($id){
        IdType::destroy($id);
        return response()->json([
            'status' => 'deleted'
        ], 200);
    }


}
