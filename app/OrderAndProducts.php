<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderAndProducts extends Model
{
    protected $fillable = ['order_id', 'pizza_id', 'amount'];
}
