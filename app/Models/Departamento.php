<?php

namespace App\Models;


// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Departamento extends Model
{
    //
    // use HasFactory;

    public static function todos() {
        //$departamentos= DB::select('SELECT * FROM infraest_relevamiento.all_departamentos();');
        $departamentos= DB::select('SELECT * FROM infraest_relevamiento.all_departamentos();');
        //echo($departamentos);exit;
        return $departamentos;
    }
}
