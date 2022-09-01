<?php

namespace App\Http\Controllers;

// MODELOS
    use App\Models\Proyecto;
// \.MODELOS

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProyectoController extends Controller
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
    
    public function index_proyectos() {
        $cue= intval($_SESSION['cue']);
        $anexo= intval($_SESSION['anexo']);

        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
                $cue,
                $anexo,
            ];
        //  LLAMADA A FUNCION - ESTABLECIMIENTO
        $establecimientos= DB::select('SELECT * from infraest_relevamiento.buscar_establecimientos_xcue_xanexo( ?, ?)', $argumentos);
        //var_dump($establecimientos[0]->nombre);exit;

        $nombre_establecimiento= $establecimientos[0]->nombre;

        
        //  LLAMADA A FUNCION - OPCIONES PARA ACTUALIZAR
        $opciones= DB::select('SELECT * from infraest_relevamiento.all_opciones_relevamiento()');
        
        //  LLAMADA A FUNCION - SELECT TIPOS DE FINANCIAMIENTO
        $tipos_financiamiento= DB::select('SELECT * from infraest_relevamiento.all_tipos_financiamientos()');

        //  LLAMADA A FUNCION - SELECT ESTADOS DE PROYECTOS
        $estados_proyecto= DB::select('SELECT * from infraest_relevamiento.all_estados_proyectos()');

        //  LLAMADA A FUNCION - PROYECTOS
        $proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyectos_activos_cue_anexo( ?, ?)', $argumentos);
        //var_dump(sizeof($proyectos));exit;
        //echo("<pre>");
        //var_dump($tipos_financiamiento);exit;
        //echo("</pre>");
        
        return view('opciones/proyectos', compact(  'cue','anexo', 'nombre_establecimiento', 
                                                    'opciones', 'tipos_financiamiento', 'estados_proyecto', 
                                                    'proyectos') );
    }

    public function mostrar_proyectos(Request $request) {
        //  SE RECUPERAN VALORES DE SESSION
            $cue= intval($_SESSION['cue']);
            $anexo= intval($_SESSION['anexo']);
        //  SE RECUPAR VALOR DE AJAX (para switchear el SP correspondiente)
            $codigo_opcion_proyectos= intval($_POST['codigo_opcion_proyectos_ajax']);
            //echo($codigo_opcion_proyectos);exit;
        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
                $cue,
                $anexo
            ];
            //var_dump($argumentos);exit;
        //  SEGUN LA OPCION SELECCIONADA SE LLAMA AL SP O FUNCION CORRESPONDIENTE
            switch ($codigo_opcion_proyectos) {
                case 1:
                        //  LLAMADA A FUNCION - PROYECTOS SIN FINANCIAMIENTO
                            $proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyectos_sin_financiamiento( ?, ?)', $argumentos);
                        break;
                case 2:
                        //  LLAMADA A FUNCION - PROYECTOS CON FINANCIAMIENTO
                            $proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyectos_con_financiamiento( ?, ?)', $argumentos);
                        break;
                case 3:
                        //  LLAMADA A FUNCION - PROYECTOS CONSTRUCCIONES ESCOLARES
                            $proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyectos_construcciones_escolares( ?, ?)', $argumentos);
                        break;
                case 4:
                        //  LLAMADA A FUNCION - PROYECTOS COOPERAR 1 2 y 3
                            $proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyectos_cooperar123( ?, ?)', $argumentos);
                        break;
                default:
                echo "i no es igual a 0, 1 ni 2";
            }

        //  LLAMADA A FUNCION - PROYECTOS
        //$proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyectos_cooperar123( ?, ?)', $argumentos);
        
        // echo("<pre>");
        // var_dump($proyectos);
        // echo("</pre>");
        // exit;
                
        //  SI NO HAY REGISTROS...
            if(sizeof($proyectos)==0) { $hay_registros= false; } else { $hay_registros= true; }
        //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
        return response()->json([
            'hay_registros'=> $hay_registros,
            'proyectos'=> $proyectos
        ]);
    }


    public function historial_proyectos_nothing(Request $request) {
          
        //echo("método historial_proyectos<br>");
        //var_dump($request->input_id_cue_proyecto);exit;

        $cue= intval($_SESSION['cue']);
        $anexo= intval($_SESSION['anexo']);
        $id_cue_proyecto= intval($_POST['input_id_cue_proyecto']);
        //echo $id_cue_proyecto;
        //return;
        //exit;
        //return 0;
        return view('welcome');
    }
    // \.historial_proyectos_nothing

    public function historial_proyectos(Request $request) {
          
        //echo("método historial_proyectos<br>");
        //var_dump($request->input_id_cue_proyecto);exit;

        $cue= intval($_SESSION['cue']);
        $anexo= intval($_SESSION['anexo']);
        $id_cue_proyecto= intval($_POST['id_cue_proyecto_ajax']);

        //$id_cue_proyecto= $request->input_id_cue_proyecto;
        //echo("hasta aqui llega");
        // var_dump($request->cue);exit;
        //var_dump($request->input_id_cue_proyecto);
        //var_dump($_POST['id_cue_proyecto_ajax']);
        //exit;
        

        //echo"ENTRA AL FETCH_HISTORIAL<br>";//exit;


        //return view('welcome');

        // if(isset($_POST['id_cue_proyecto_ajax'])) {
        //     $id_cue_proyecto= intval($_POST['id_cue_proyecto_ajax']);    
        //     echo $id_cue_proyecto;
        //     echo "entro al if";
        // }

        // if(isset($_POST['input_id_cue_proyecto'])) {
        //     $input_id_cue_proyecto= intval($_POST['input_id_cue_proyecto']);    
        //     //echo $input_id_cue_proyecto;
        //     $id_cue_proyecto= $input_id_cue_proyecto;
        //     //echo "entro al 2do if";
        // } else {echo "NO entro al if";}


        //var_dump($_POST);exit;

        
        
        //$id_cue_proyecto= intval($request->input_id_cue_proyecto);
        
        
        //exit;
        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
                $cue,
                $anexo,
                $id_cue_proyecto
            ];
        //var_dump($id_cue_proyecto);exit;
        //var_dump($argumentos);exit;
        //  LLAMADA A FUNCION - PROYECTOS
        $proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyectos_id_cue_proyecto( ?, ?, ?)', $argumentos);
        
        //  echo("<pre>");
        //var_dump($proyectos);
        //  echo("</pre>");
        // exit;

        //echo"aqui si llegoooo";exit;
                
        //  SI NO HAY REGISTROS...
            if(sizeof($proyectos)==0) { $hay_registros= false; } else { $hay_registros= true; }
        

        //return json_encode($proyectos, JSON_UNESCAPED_UNICODE);

        //return $proyectos;


        //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
            return response()->json([
        //     /*'hay_registros'=> $hay_registros,*/
                'proyectos'=> $proyectos
            ]);

        
    }
    // \.historial_proyectos

    public function editar_proyectos(Request $request) {
        //echo"EDITAR PROYECTOS<br>";
        $cue= intval($_SESSION['cue']);
        $anexo= intval($_SESSION['anexo']);

        //echo"EDITAR PROYECTO";exit;

        $id_proyecto= intval($_POST['id_proyecto_ajax']);

        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
        $argumentos= [
            //$cue,
            //$anexo,
            $id_proyecto
        ];

        //var_dump($argumentos);exit;

        //  LLAMADA A FUNCION - PROYECTOS
            $proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyecto_id_proyecto( /*?, ?,*/ ?)', $argumentos);
        
        //  LLAMADA A FUNCION - ESTADOS
            $estados= DB::select('SELECT * from infraest_relevamiento.all_estados_proyectos( )');
        //  echo("<pre>");
        //var_dump($proyectos);
        //  echo("</pre>");
        // exit;

        //  SI NO HAY REGISTROS...
            if(sizeof($proyectos)==0) { $hay_registros= false; } else { $hay_registros= true; }

        //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
            return response()->json([
                'hay_registros'=> $hay_registros,
                'proyectos'=> $proyectos,
                'estados'=> $estados,
            ]);
    }
    //  \.editar_proyectos()


    public function actualizar_proyectos(Request $request) {

        // $cue= intval($_SESSION['cue']);
        // $anexo= intval($_SESSION['anexo']);
   
        //  Se convierte en OBJETO al STRING campos_ajax (campos_ajax era un OBJETO anterioremente, fue convertido a string para poder ser pasado por AJAX)
            $campos = json_decode($_POST['campos_ajax']);
            //var_dump($campos);exit;

        //  RESCATAR VALORES: cue, anexo
            //  RESCATO el id_proyecto para rescatar CUE y ANEXO
                $id_proyecto= $campos->id_proyecto;
                
                $argumentos=[
                    $id_proyecto
                ];
            //  LLAMADA A FUNCION - PROYECTOS
                $proyecto= DB::select('SELECT * from infraest_relevamiento.buscar_proyecto_id_proyecto( ?)', $argumentos);
            //  ASIGNACION de variables $cue y $anexo
                $cue= $proyecto[0]->cue;
                $anexo= $proyecto[0]->anexo;
        //  RESCATO el id_tipo_financiamiento para poder DISCRIMINAR
            $id_tipo_financiamiento= $campos->id_tipo_financiamiento;
            
        //  DISCRIMINO $id_tipo_financiamiento para determinar bien cómo GENERAR el OBJETO PROYECTO ¡¡REVISAR!!
            switch (true) {
                case (  $id_tipo_financiamiento==1  ):
                        
                    echo "CASE 1";
                        break;
                case (  $id_tipo_financiamiento==2 || $id_tipo_financiamiento==3 ||
                        $id_tipo_financiamiento==5 || $id_tipo_financiamiento==6 ||
                        $id_tipo_financiamiento==19 || $id_tipo_financiamiento==20    ):
                        
                    //echo "CASE 2";
                        break;
                case ($id_tipo_financiamiento==4 || $id_tipo_financiamiento==7):
                        
                    echo "CASE 3";
                        break;
                case (  ($id_tipo_financiamiento>=8 && $id_tipo_financiamiento<=18 ) || 
                        $id_tipo_financiamiento==21 || $id_tipo_financiamiento==22      ):
                        
                    //echo "CASE 9<br><br>";    
                        break;
                default:
                        echo "CASE DEFAULT";
            }
        
        //  CONVERSION OBJETO->ARRAY + cambio de nombre->$args
            $args= (array) $campos;
        
        //  AGREGA cue+anexo+persona_usuario_proyecto al ARRAY obtenido
            $args['cue']=$cue;
            $args['anexo']=$anexo;
            
            $args['persona_usuario_proyecto']=$anexo;

        //  CONTROLES - para luego mostrar mensajes en AJAX
            //  CONTROL PRECEDENCIA DE FECHAS   ------------------------------------------- //
                $fecha_original= $proyecto[0]->fecha_proyecto;
                $fecha_edicion= $args['fecha_proyecto'];
                if( control_precedencia_fechas($fecha_original, $fecha_edicion) ) {
                    $error_fecha= false;    //  NO HAY ERROR
                } else {
                    $error_fecha= true;     //  HAY ERROR
                }
            //  CONTROL PRECEDENCIA DE ESTADOS   ------------------------------------------- //
                $estado_original= $proyecto[0]->id_tipo_estado_proyecto;
                $estado_edicion= $args['id_tipo_estado_proyecto'];
                if( control_precedencia_estados($estado_original, $estado_edicion) ) {
                    $error_estado= false;    //  NO HAY ERROR
                } else {
                    $error_estado= true;     //  HAY ERROR
                }
            //  CONTROL PRECEDENCIA DE PORCENTAJE DE AVANCE   ------------------------------------------- //
                if(isset($args['porcentaje_avance_proyecto'])) {    //  este contro SOLO se hace si existe en INPUT porcentaje_avance_proyecto en el MOFDAL-EDICION
                    $porcentaje_avance_original= $proyecto[0]->porcentaje_avance;
                    $porcentaje_avance_edicion= $args['porcentaje_avance_proyecto'];
                    if( control_precedencia_estados($porcentaje_avance_original, $porcentaje_avance_edicion) ) {
                        $error_porcentaje_avance= false;    //  NO HAY ERROR
                    } else {
                        $error_porcentaje_avance= true;     //  HAY ERROR
                    }
                } else { 
                    $error_porcentaje_avance= false;        //  asignacion a fines prácticos
                }
        //  ====================================================================================================    //
        //  SI NO HAY ERRORES => sobreescribe o inserta, de lo contrario, NO HACE NADA y solo devuelve a AJAX las variables $error_xxx
            if( $error_fecha== false && $error_estado== false && $error_porcentaje_avance== false ) {
                //  OVERWRITE OR INSERT   ------------------------------------------- //
                if( sobreescribir_registro($fecha_original, $fecha_edicion) ) {
                    $sobreescribir_registro= true;  //  SOBREESCRIBIR
                    //  INSTANCIA de PROYECTO - objeto cuyos atributos sobreescribiran a los de uno ya existene
                        $proyecto= new Proyecto($args);
                        //var_dump($proyecto);exit;
                    //  LLAMADA A FUNCION - MODIFICAR PROYECTO
                        $respuesta_modelo= $proyecto->modificar_proyecto();
                        //var_dump($respuesta_modelo);exit;
                        //  OBTIENE valor de la variable de retorno del SP
                            $respuesta= (array) $respuesta_modelo[0];   //  al OBJETO $respuesta_modelo[0] se lo convierte en array
                            $respuesta_ajax= $respuesta['modificar_proyecto'];  //  se rescata el unico elemento del array para enviarlo al AJAX
                            //var_dump($respuesta_ajax);exit;
                    //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
                        return response()->json([
                            'error_fecha'=> $error_fecha,
                            'error_estado'=> $error_estado,
                            'error_porcentaje_avance'=> $error_porcentaje_avance,
                            'respuesta_ajax'=> $respuesta_ajax,
                        ]);
                } else {
                    $sobreescribir_registro= false;     //  INSERTAR
                    //  INSTANCIA de PROYECTO - objeto cuyos atributos sobreescribiran a los de uno ya existene
                    $proyecto= new Proyecto($args);
                    //  LLAMADA A FUNCION - MODIFICAR PROYECTO
                        $respuesta_modelo= $proyecto->insertar_proyecto();
                        //  OBTIENE valor de la variable de retorno del SP
                            $respuesta= (array) $respuesta_modelo[0];   //  al OBJETO $respuesta_modelo[0] se lo convierte en array
                            $respuesta_ajax= $respuesta['insertar_proyecto'];  //  se rescata el unico elemento del array para enviarlo al AJAX
                            
                    //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
                        return response()->json([
                            'error_fecha'=> $error_fecha,
                            'error_estado'=> $error_estado,
                            'error_porcentaje_avance'=> $error_porcentaje_avance,
                            'respuesta_ajax'=> $respuesta_ajax,
                        ]);
                }
            } else {    //  NO SE HACE NADA y SOLO se devuelven las variables $error_xxx
                //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
                    return response()->json([
                        'error_fecha'=> $error_fecha,
                        'error_estado'=> $error_estado,
                        'error_porcentaje_avance'=> $error_porcentaje_avance,
                        //'respuesta_ajax'=> $respuesta_ajax,
                    ]);
            }   //  \. if-else $error_fecha, $error_estado, $error_porcentaje_avance
    }
    // \.actualizar_proyectos()


    public function crear_proyectos() {

        $cue= intval($_SESSION['cue']);
        $anexo= intval($_SESSION['anexo']);
   
        //  Se convierte en OBJETO al STRING campos_ajax (campos_ajax era un OBJETO anterioremente, fue convertido a string para poder ser pasado por AJAX)
            $campos = json_decode($_POST['campos_ajax']);
            //var_dump($campos);exit;
        //  RESCATO el id_tipo_financiamiento para poder DISCRIMINAR
            $id_tipo_financiamiento= $campos->id_tipo_financiamiento;
            
        //  DISCRIMINO $id_tipo_financiamiento para determinar bien cómo GENERAR el OBJETO PROYECTO ¡¡REVISAR!!
            switch (true) {
                case (  $id_tipo_financiamiento==""  ):
                        
                    echo "CASE '' ";
                        break;
                case (  $id_tipo_financiamiento==1  ):
                        
                    echo "CASE 1";
                        break;
                case (  $id_tipo_financiamiento==2 || $id_tipo_financiamiento==3 ||
                        $id_tipo_financiamiento==5 || $id_tipo_financiamiento==6 ||
                        $id_tipo_financiamiento==19 || $id_tipo_financiamiento==20    ):
                        
                    //echo "CASE 2";
                        break;
                case ($id_tipo_financiamiento==4 || $id_tipo_financiamiento==7):
                        
                    echo "CASE 3";
                        break;
                case (  ($id_tipo_financiamiento>=8 && $id_tipo_financiamiento<=18 ) || 
                        $id_tipo_financiamiento==21 || $id_tipo_financiamiento==22      ):
                        
                    //echo "CASE 9<br><br>";    
                        break;
                default:
                        echo "CASE DEFAULT<br>";
            }
        
        //  CONVERSION OBJETO->ARRAY + cambio de nombre->$args
            $args= (array) $campos;
                //var_dump($args);exit;
        //  AGREGA cue+anexo+persona_usuario_proyecto al ARRAY obtenido
            $args['cue']= $cue;
            $args['anexo']= $anexo;

            //var_dump($_SESSION['id_usuario']);exit;
            $args['persona_usuario_proyecto']= 'pendiente';
            //$args['persona_usuario_proyecto']= $_SESSION['id_usuario'];
        //  ====================================================================================================    //
            //  INSTANCIA de PROYECTO - objeto cuyos atributos sobreescribiran a los de uno ya existene
                $proyecto_nuevo= new Proyecto($args);
                    //echo ("<pre>");var_dump($proyecto_nuevo);exit;
            //  LLAMADA A FUNCION - MODIFICAR PROYECTO
                $respuesta_modelo= $proyecto_nuevo->crear_proyecto();
                //  OBTIENE valor de la variable de retorno del SP
                    $respuesta= (array) $respuesta_modelo[0];   //  al OBJETO $respuesta_modelo[0] se lo convierte en array
                    $respuesta_ajax= $respuesta['crear_proyecto'];  //  se rescata el unico elemento del array para enviarlo al AJAX
                    
            //  RETORNO DE VARIABLES Y RESULTADOS A AJAX
                return response()->json([
                    //'error_fecha'=> $error_fecha,
                    //'error_estado'=> $error_estado,
                    //'error_porcentaje_avance'=> $error_porcentaje_avance,
                    'respuesta_ajax'=> $respuesta_ajax,
                ]);
    }
    // \.crear_proyectos()


    public function eliminar_proyectos() {        
        $id_proyecto=$_POST['id_proyecto_ajax'];
        
        $respuesta_modelo= Proyecto::eliminar($id_proyecto);

        //  OBTIENE valor de la variable de retorno del SP
        $respuesta= (array) $respuesta_modelo[0];   //  al OBJETO $respuesta_modelo[0] se lo convierte en array
        $respuesta_ajax= $respuesta['eliminar_proyecto'];  //  se rescata el unico elemento del array para enviarlo al AJAX
        
        return response()->json([
            'respuesta_ajax'=> $respuesta_ajax,
        ]);
    }
    // \.eliminar_proyectos

    public function proyectos_actualizados() {
        ini_set('max_execution_time', 600);
        ini_set('memory_limit', '512M');

        // DEFINICION DEL VECTOR DE ARGUMENTOS - se utiliza en la llamada a la funcion
            $argumentos= [
            ];
        

        //  LLAMADA A FUNCION - PROYECTOS
            $proyectos= DB::select('SELECT * from infraest_relevamiento.buscar_proyectos_actualizados()');

        //var_dump(sizeof($proyectos));exit;
        //echo("<pre>");
        //var_dump($proyectos);exit;
        //echo("</pre>");
        
        return view('informes/proyectos_actualizados', compact('proyectos') );
    }
    //  \.proyectos_actualizados()



}
// \.class ProyectoController