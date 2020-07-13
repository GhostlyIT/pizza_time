<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderAndProducts;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function createNewOrder(Request $request) {
        $this->validate($request, [
            'name' => 'required|max:32',
            'address' => 'required',
            'phone' => 'required',
            'order_price' => 'required'
        ]);

        $newOrderArr = [
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'phone' => $request->input('phone'),
            'order_price' => $request->input('order_price')
        ];

        if ($request->input('user_id') != null) {
            $newOrderArr['user_id'] = $request->input('user_id');
        }

        $newOrder = Order::create($newOrderArr);

        $productId = array_unique($request->input('products'));
        foreach ($productId as $id) {
            $amount = array_count_values($request->input('products'))[$id];
            $arr = [
                'order_id' => $newOrder->id,
                'pizza_id' => $id,
                'amount' => $amount
            ];
            OrderAndProducts::create($arr);
        }

        return response()->json(['status'=>'OK'], 201);
    }

    public function getById($user_id) {
        return DB::select(
            DB::raw(
                "SELECT `orders`.*, `order_and_products`.`amount`, GROUP_CONCAT(`pizzas`.`name` SEPARATOR ', ') as `name`
                FROM `orders`, `pizzas`, `order_and_products`
                WHERE `orders`.`user_id` = ".$user_id."
                AND `order_and_products`.`order_id` = `orders`.`id`
                AND `order_and_products`.`pizza_id` = `pizzas`.`id`
                GROUP BY `orders`.`id`, `order_and_products`.`amount`
                ORDER BY `orders`.`id` DESC"
            )
        );
    }
}
