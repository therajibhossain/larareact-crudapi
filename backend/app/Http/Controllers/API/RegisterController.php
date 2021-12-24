<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class RegisterController extends BaseController
{
    public function register(Request $request) {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success = [
            'token' => $this->createToken($user),
            'name' => $user->name
        ];

        return $this->sendResponse($success, 'User registered successfully.');
    }

    public function login(Request $request) {
        if(Auth::attempt([
            'email' => $request->email, 'password' => $request->password
        ])) {
            $user = Auth::user();
            $success = [
                'token' => $this->createToken($user),
                'name' => $user->name
            ];

            return $this->sendResponse($success, 'User logged in successfully.');
        }else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
}
