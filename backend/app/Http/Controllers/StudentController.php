<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Student;

class StudentController extends Controller
{
    private $status = 200;

    public function __construct(){
        
    }

    // --------------- [ Save Student function ] -------------
    public function saveStudent(Request $request) {
        $response = []; 

        //validate inputs
        $validator = Validator::make($request->all(), [
            "first_name" => "required",
            "last_name" => "required",
            "email" => "required|email",
            "phone" => "required|numeric",
        ]);

        if($validator->fails()) {
            return response()->json([
                "status" => false, "validation_errors" => $validator->errors()
            ]);
        }

        $studentId = (int) $request->id;
        $studentData = [
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "full_name" => $request->first_name . " " . $request->last_name,
            "email" => $request->email,
            "phone" => $request->phone
        ];

        if($studentId) {
            $student = Student::findOrFail($studentId);
            if($student) {
                $isUpdated = Student::where("id", $studentId)->update($studentData);
                if($isUpdated) {
                    $response = ["status" => $this->status, "success" => true, "message" => "student detail updated successfully"];
                }else{
                    $response = ["status" => "failed", "message" => "Whoops! failed to update, try again."];
                }
                
            }

        }else {
            $student = Student::create($studentData);
            if($student) {            
                $response = ["status" => $this->status, "success" => true, "message" => "student record created successfully", "data" => $student];
            }else {
                $response = ["status" => "failed", "success" => false, "message" => "Whoops! failed to create."];
            }
        }

        return response()->json($response);
    }

    // --------------- [ Students Listing ] -------------------
    public function getStudents() {
        $response = [];

        $students = Student::all();
        if(count($students) > 0) {
            $response = ["status" => $this->status, "success" => true, "count" => count($students), "data" => $students];
        }else {
            $response = ["status" => "failed", "success" => false, "message" => "Whoops! no record found"];
        }

        return response()->json($response);
    }

    // --------------- [ Student Detail ] ----------------
    public function studentDetail($id) {
        $response = []; 

        $student = Student::find($id);
        if($student) {
            $response = ["status" => $this->status, "success" => true, "data" => $student];
        }else {
            $response = ["status" => "failed", "success" => false, "message" => "Whoops! no student found"];
        }

        return response()->json($response);
    }

    //---------------- [ Delete Student ] ----------
    public function deleteStudent($id) {
        $response = [];

        $student = Student::find($id);
        if($student) {
            $isDeleted =  Student::where("id", $id)->delete();
            if($isDeleted) {
                $response = ["status" => $this->status, "success" => true, "message" => "student record deleted successfully"];
            }else{
                $response = ["status" => "failed", "message" => "failed to delete, please try again"];
            }
        }else {
            $response = ["status" => "failed", "message" => "Whoops! no student found with this id"];
        }

        return response()->json($response);
    }

} 