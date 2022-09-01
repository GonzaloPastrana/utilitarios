<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Establecimiento extends Model
{
    //
    function buscar() {
        $proyectos= DB::select('SELECT * FROM infraest_relevamientos.proyectos;');

        var_dump($proyectos);
    }
}
