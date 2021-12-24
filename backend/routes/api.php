<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("create-student", [StudentController::class, "saveStudent"]);
Route::get("students", [StudentController::class, "getStudents"]);
Route::get("student/{id}", [StudentController::class, "studentDetail"]);
Route::delete("student/{id}", [StudentController::class, "deleteStudent"]);

//api authentication by passport
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);
Route::middleware('auth:api')->group(function() {
    Route::resource('products', ProductController::class);
});