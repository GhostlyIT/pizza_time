<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class PizzaController extends Controller
{
    public function getAll(Request $request) {
        if ($request->input('user_id')) {
            return response()->json(DB::table('orders')->where('user_id', $request->input('user_id')->get()));
        }
        return Pizza::all();
    }

    public function store(Request $request) {
        $this->validate($request, [
            'name' => 'required|unique:pizzas|max:255',
            'description' => 'required',
            'price' => 'integer'
        ]);
        $newPizza = Pizza::create($request->all());
        return response()->json($newPizza, 201);
    }

    public function update(Request $request, Pizza $pizza) {
        $pizza->update($request->all());
        return response()->json($pizza, 200);
    }

    public function delete(Pizza $pizza) {
        $pizza->delete();
        return response()->json(null, 204);
    }
}
