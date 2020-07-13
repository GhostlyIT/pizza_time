<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Fileupload;

class FileuploadController extends Controller
{

    public function store(Request $request)
    {
        if($request->get('image'))
       {
          $image = $request->get('image');
          $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          \Image::make($request->get('image'))->save(public_path('images/pizzas/').$name);
        }

        $fileupload = new Fileupload();
        $fileupload->filename=$name;
        return response()->json($name);
    }
}
