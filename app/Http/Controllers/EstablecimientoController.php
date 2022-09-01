<?php

namespace App\Http\Controllers;

// MODELOS
    use App\Models\Departamento;
// \.MODELOS

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstablecimientoController extends Controller
{
    //
    // public function _invoke() {
    //     return "BIENVENIDO";
    // }

        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function index() {
        return view('principal');
    }

    public function buscar() {
        // $var=12;
        // return view('welcome', compact('var'));
        // $proyectos= DB::select('SELECT * FROM infraest_relevamientos.proyectos;');
        // var_dump($proyectos);

        //$resutlado= DB::select('SELECT * FROM infraest_relevamiento.v_tabla_completa');
        //  $resultado= DB::select('SELECT * FROM infraest_relevamiento.buscar_establecimiento3(9000351, 0)');
        //echo($resutlado[0]);exit;
        
        //echo("<pre>");

                        //echo($resutlado[0]);exit;
                        //var_dump($resutlado[0]);exit;
        
        //var_dump($resultado);exit;
        //echo("</pre>");

        $departamentos= Departamento::todos();
        //var_dump($departamentos[0]);exit;
        //$departamentos= DB::select('SELECT * FROM infraest_relevamiento.all_departamentos();');
        //  echo("<pre>");
        //  var_dump($departamentos[0]->codigo_departamento);
        //  echo("</pre>");exit;
        
        return view('actualizacion_datos', compact('departamentos'));
    }

    public function fetchstablishments() {

        $resultado= DB::select('SELECT * FROM infraest_relevamiento.buscar_establecimiento3(9000351, 0)');
        return response()->json([
            'resultado'=> $resultado
        ]);
        
    }


    public function fetch_localidades() {
        /*
        $codigo_departamento= $_POST['codigo_departamento'];
        var_dump($codigo_departamento);exit;

        $localidades= DB::select('SELECT * FROM infraest_relevamiento.all_departamentos();');
        return response()->json([
            'localidades'=> $localidades
        ]);
        */
       //var_dump($request->id);
        $codigo_departamento= $_POST['codigo_departamento_ajax'];

        // echo($codigo_departamento);

        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
        $argumentos= [
            $codigo_departamento
        ];
        //  LLAMADA A FUNCION
        $localidades= DB::select('SELECT * from infraest_relevamiento.buscar_localidades(?)', $argumentos);

        // echo("<pre>");
        // var_dump($localidades[0]->codigo_localidades);
        // echo("</pre>");exit;


        return response()->json([
            'localidades'=> $localidades
        ]);
        
    }


    public function buscar_cue_anexo() {

        $input_cue= intval($_POST['input_cue_ajax']);
        $input_anexo= intval($_POST['input_anexo_ajax']);
        
        // echo("CUE: ".$input_cue."<br>");
        // echo("ANEXO: ".$input_anexo."<br>");exit;

        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
                $input_cue,
                $input_anexo,
            ];

        //  LLAMADA A FUNCION
        $establecimientos= DB::select('SELECT * from infraest_relevamiento.buscar_establecimientos_xcue_xanexo(?,?)', $argumentos);
        //  SI NO HAY REGISTROS...
            if(sizeof($establecimientos)==0) {
                $hay_registros= false;
            } else {
                $hay_registros= true;
            }
        //  echo("<pre>");
        //  var_dump($establecimientos[0]->cueanexo);
        //  echo("</pre>");exit;

        //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
            return response()->json([
                'hay_registros'=> $hay_registros,
                'establecimientos'=> $establecimientos
            ]);
    }

    public function buscar_nombre() {

        $input_nombre= '%'.$_POST['input_nombre_ajax'].'%';
        
        // echo("NOMBRE: ".$input_nombre."<br>");exit;
        
        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
                $input_nombre,
            ];

        //  LLAMADA A FUNCION
        $establecimientos= DB::select('SELECT * from infraest_relevamiento.buscar_establecimientos_xnombre(?)', $argumentos);
        //  SI NO HAY REGISTROS...
            if(sizeof($establecimientos)==0) {
                $hay_registros= false;
            } else {
                $hay_registros= true;
            }
        //  echo("<pre>");
        //  var_dump($establecimientos[0]->cueanexo);
        //  echo("</pre>");exit;

        //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
            return response()->json([
                'hay_registros'=> $hay_registros,
                'establecimientos'=> $establecimientos
            ]);
    }





    public function buscar_departamento_localidad() {
        /*
        $codigo_departamento= $_POST['codigo_departamento'];
        var_dump($codigo_departamento);exit;

        $localidades= DB::select('SELECT * FROM infraest_relevamiento.all_departamentos();');
        return response()->json([
            'localidades'=> $localidades
        ]);
        */
       //var_dump($request->id);
        

        $codigo_departamento= $_POST['codigo_departamento_ajax'];
        $codigo_localidad= $_POST['codigo_localidad_ajax'];
        // echo("codigo de departamento: ".$codigo_departamento."<br>");
        // echo("codigo de localidad: ".$codigo_localidad."<br>");exit;

        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
                $codigo_departamento,
                $codigo_localidad,
            ];

        //  LLAMADA A FUNCION
        $establecimientos= DB::select('SELECT * from infraest_relevamiento.buscar_establecimientos(?,?)', $argumentos);
        //  SI NO HAY REGISTROS...
            if(sizeof($establecimientos)==0) {
                $hay_registros= false;
            } else {
                $hay_registros= true;
            }
        //  echo("<pre>");
        //  var_dump($establecimientos[0]->cueanexo);
        //  echo("</pre>");exit;


        return response()->json([
            'hay_registros'=> $hay_registros,
            'establecimientos'=> $establecimientos
        ]);
        
    }

    public function buscar_departamento_localidad_nombre() {
        $codigo_departamento= $_POST['codigo_departamento_ajax'];
        $codigo_localidad= $_POST['codigo_localidad_ajax'];
        $cadena_filtrado_nombre= '%'.$_POST['cadena_filtrado_nombre_ajax'].'%';
        
        // echo("codigo de departamento: ".$codigo_departamento."<br>");
        // echo("codigo de localidad: ".$codigo_localidad."<br>");
        //echo("cadena de filtardo: ".$cadena_filtrado_nombre."<br>");exit;
//exit;
        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
                $codigo_departamento,
                $codigo_localidad,
                $cadena_filtrado_nombre
            ];

        //  LLAMADA A FUNCION
        $establecimientos= DB::select('SELECT * from infraest_relevamiento.buscar_establecimientos_xdepto_xloc_xnom( ?, ?, ?)', $argumentos);

        //  SI NO HAY REGISTROS...
        if(sizeof($establecimientos)==0) {
            $hay_registros= false;
        } else {
            $hay_registros= true;
        }

        //echo("<pre>");
        //var_dump(sizeof($establecimientos));
        // var_dump($establecimientos);
        // var_dump($establecimientos[0]->cueanexo);
        //echo("</pre>");exit;


        return response()->json([
            'hay_registros'=> $hay_registros,
            'establecimientos'=> $establecimientos
        ]);
        
    }


    public function set_cueanexo() {
        $cueanexo= $_POST['cueanexo_ajax'];

        //  EXTRACCION de CUE y ANEXO de la variable CUEANEXO obtenida al seleccionar fila en tabla de resultados
            $cue= substr($cueanexo, 0, 7);
            $anexo= substr($cueanexo, 7, 2);
        //  SE SETEA las llaves cue y anexo de la SUPER-GLOBAL $_SESSION
            $_SESSION['cue']= $cue;
            $_SESSION['anexo']= $anexo;
        
        $seted= TRUE;

        return response()->json([
            'seted'=> $seted
        ]);
        
    }

    public function index_techos() {
        $cue= intval($_SESSION['cue']);
        $anexo= intval($_SESSION['anexo']);

        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
                $cue,
                $anexo,
            ];
        //  LLAMADA A FUNCION - ESTABLECIMIENTO
        $establecimientos= DB::select('SELECT * from infraest_relevamiento.buscar_establecimientos_xcue_xanexo(?,?)', $argumentos);
        //var_dump($establecimientos[0]->nombre);exit;

        $nombre_establecimiento= $establecimientos[0]->nombre;

        
        //  LLAMADA A FUNCION - OPCIONES PARA ACTUALIZAR
        $opciones= DB::select('SELECT * from infraest_relevamiento.all_opciones_relevamiento()');

        
        return view('opciones/techos', compact('cue','anexo', 'nombre_establecimiento', 'opciones') );
    }


}
