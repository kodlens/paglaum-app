<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\EducationLevel;

class AdminEducationLevelController extends Controller
{
    public function index(){
        return Inertia::render('Admin/EducationLevel/AdminEducationLevelIndex');
    }


    public function getData(Request $req){
        return EducationLevel::orderBy('id', 'desc')->paginate($req->perpage);
    }


    public function show($id){
        return EducationLevel::find($id);
    }

    public function store(Request $req){

        $req->validate([
            'education_level' => 'required',
            'description' => 'required',
        ]);

        EducationLevel::create([
            'education_level' => strtoupper($req->education_level),
            'description' => $req->description,
            'order_no' => $req->order_no,
            'active' => $req->active ? 1 : 0,
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }

    public function update(Request $req, $id){
        
        $req->validate([
            'education_level' => 'required|unique:education_levels,education_level,'.$id,
            'description' => 'required',
        ]);

        EducationLevel::find($id)->update([
            'education_level' => strtoupper($req->education_level),
            'description' => $req->description,
            'order_no' => $req->order_no,
            'active' => $req->active ? 1 : 0,
        ]);

        return response()->json([
            'status' => 'updated'
        ], 200);    
    }



    public function destroy($id){
        EducationLevel::destroy($id);
        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
