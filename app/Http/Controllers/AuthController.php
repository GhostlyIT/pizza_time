<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        $http = new \GuzzleHttp\Client([
            'base_url' => env('http://localhost:8888'),
            'defaults' => [
                'headers' => [
                    'Accept' => 'application/json',
                    'content-type' => 'application/json'
                ],
                'verify' => false
            ]
        ]);

        try
        {
            $response = $http->post('http://127.0.0.1:8888/oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => env('OAUTH_CLIENT_ID'),
                    'client_secret' => env('OAUTH_CLIENT_SECRET'),
                    'username' => $email,
                    'password' => $password,
                    'scope' => ''
                ],
            ]);

            $tokens = json_decode((string)$response->getBody() , true);
        }
        catch(\GuzzleHttp\Exception\ClientException $e)
        {
            if ($e->getResponse()->getStatusCode() === 400) {
                return response()->json(['message' => 'Invalid email/password combination.', 'status' => 'error'], 400);
            }

            throw $e;
        }

        return response()->json(['message' => 'Successfully loged in.', 'tokens' => $tokens, 'status' => 'success']);
    }


    public function register(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'password_confirm' => 'required'
        ]);

        if ($request->input('password') != $request->input('password_confirm'))
            return response()->json(['message' => 'Password mismatch', 'status' => 'Error'], 401);

        $newUserArr = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ];

        $user = User::create($newUserArr);

        if ($user) {
            return response()->json(['message' => 'Account successfully created', 'status' => 'Success'], 200);
        } else {
            return response()->json(['message' => 'Error', 'status' => 'Error'], 401);
        }
    }
}
