<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('pizzas', 'PizzaController@getAll');
Route::post('pizzas/add', 'PizzaController@store');
Route::resource('pizzas/imageUpload', 'FileuploadController');

Route::post('order/add', 'OrderController@createNewOrder');
Route::post('order/addProducts', 'OrderController@mergeOrderAndProducts');
Route::get('order/get/{id}', 'OrderController@getById');

Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');
Route::get('user/getData', 'UserController@getUserData');
