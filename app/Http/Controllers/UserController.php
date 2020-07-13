<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function getUserData(Request $request)
    {
        return response()->json(['user' => auth()->guard('api')->user()], 200);
    }
}
