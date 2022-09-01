<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Proyecto extends Model
{
    //
    // DEFINICION DE ATRIBUTOS
    public $id_proyecto;
    public $cue;
    public $anexo;

    public $id_tipo_financiamiento;
    //public $nombre_tipo_financiamiento;
    public $descripcion_proyecto;
    public $id_tipo_estado_proyecto;
    //public $tipo_estado_proyecto;
    
    public $quien_inicia_proyecto;
    public $monto_estimado_proyecto;
    public $prioridad_proyecto;
    public $porcentaje_avance;
    public $motivo_no_ejecucion;
    public $fecha_finalizacion;
    public $fecha_proyecto;
    public $quien_carga_proyecto;
    public $observacion_proyecto;
    public $persona_usuario_proyecto;
    public $foperacion_proyecto;
    public $id_cue_proyecto;
    public $activo_inactivo_proyecto;
    

    public function __construct($args=[]) {

        //$feche = strtotime('j-M-Y', $args['fecha_proyecto']);
        //$feche=$args['fecha_proyecto'];
        //var_dump($feche);exit;
        //$fecha=date($feche);
        //var_dump($fecha);exit;

        if( !isset($args['id_proyecto']) )  { $this->id_proyecto=-1; }  else { $this->id_proyecto= intval($args['id_proyecto']); }
        if( !isset($args['cue']) )          { $this->cue=-1; }          else { $this->cue= intval($args['cue']); }
        if( !isset($args['anexo']) )        { $this->anexo=-1; }        else { $this->anexo= intval($args['anexo']); }
        
        if( !isset($args['id_tipo_financiamiento']) )   { $this->id_tipo_financiamiento=-1; }   else { $this->id_tipo_financiamiento= intval($args['id_tipo_financiamiento']); }
        if( !isset($args['descripcion_proyecto'])||$args['descripcion_proyecto']=='' )     { $this->descripcion_proyecto=NULL; }     else { $this->descripcion_proyecto= $args['descripcion_proyecto']; }
        if( !isset($args['id_tipo_estado_proyecto'])||$args['id_tipo_estado_proyecto']=='' )  { $this->id_tipo_estado_proyecto= NULL; }  else { $this->id_tipo_estado_proyecto= intval($args['id_tipo_estado_proyecto']); }

        if( !isset($args['quien_inicia_proyecto']) )    { $this->quien_inicia_proyecto= NULL; }    else { $this->quien_inicia_proyecto= $args['quien_inicia_proyecto']; }
        if( !isset($args['monto_estimado_proyecto'])||$args['monto_estimado_proyecto']=='' )  { $this->monto_estimado_proyecto= NULL; }  else { $this->monto_estimado_proyecto= floatval($args['monto_estimado_proyecto']); }
        if( !isset($args['prioridad_proyecto']) )       { $this->prioridad_proyecto= NULL; }       else { $this->prioridad_proyecto= intval($args['prioridad_proyecto']); }
        if( !isset($args['porcentaje_avance'])||$args['porcentaje_avance']=='' )        { $this->porcentaje_avance= NULL; }        else { $this->porcentaje_avance= floatval($args['porcentaje_avance']); }
        if( !isset($args['motivo_no_ejecucion']) )      { $this->motivo_no_ejecucion= NULL; }      else { $this->motivo_no_ejecucion= $args['motivo_no_ejecucion']; }
        if( !isset($args['fecha_finalizacion']) )       { $this->fecha_finalizacion= NULL; }       else { $this->fecha_finalizacion= $args['fecha_finalizacion']; }
        if( !isset($args['fecha_proyecto']) )           { $this->fecha_proyecto=''; }           else { $this->fecha_proyecto= $args['fecha_proyecto']; }
        if( !isset($args['quien_carga_proyecto']) )     { $this->quien_carga_proyecto=NULL; }     else { $this->quien_carga_proyecto= $args['quien_carga_proyecto']; }
        if( !isset($args['observacion_proyecto']) )     { $this->observacion_proyecto=NULL; }     else { $this->observacion_proyecto= $args['observacion_proyecto']; }
        if( !isset($args['persona_usuario_proyecto']) ) { $this->persona_usuario_proyecto=-1; } else { $this->persona_usuario_proyecto= $args['persona_usuario_proyecto']; }
        if( !isset($args['foperacion_proyecto']) )      { $this->foperacion_proyecto=''; }      else { $this->foperacion_proyecto= $args['foperacion_proyecto']; }
        if( !isset($args['id_cue_proyecto']) )          { $this->id_cue_proyecto=-1; }          else { $this->id_cue_proyecto= intval($args['id_cue_proyecto']); }
        if( !isset($args['activo_inactivo_proyecto']) ) { $this->activo_inactivo_proyecto='A'; } else { $this->activo_inactivo_proyecto= $args['activo_inactivo_proyecto']; }
    }

    public function modificar_proyecto() {
        // DEFINICION de array con los parametros a enviar al SP
            $argumentos=[
                $id_proyecto= $this->id_proyecto,
                $cue= $this->cue,
                $anexo= $this->anexo,
                $id_tipo_financiamiento= $this->id_tipo_financiamiento,
                $descripcion_proyecto= $this->descripcion_proyecto,
                $id_tipo_estado_proyecto= $this->id_tipo_estado_proyecto,
                $quien_inicia_proyecto= $this->quien_inicia_proyecto,
                $monto_estimado_proyecto= $this->monto_estimado_proyecto,
                $prioridad_proyecto= $this->prioridad_proyecto,
                $porcentaje_avance= $this->porcentaje_avance,
                $motivo_no_ejecucion= $this->motivo_no_ejecucion,
                $fecha_finalizacion= $this->fecha_proyecto,
                $fecha_proyecto= $this->fecha_proyecto,
                $quien_carga_proyecto= $this->quien_carga_proyecto,
                $observacion_proyecto= $this->observacion_proyecto,
                $persona_usuario_proyecto= $this->persona_usuario_proyecto,
                /*$foperacion_proyecto= $this->foperacion_proyecto,
                $id_cue_proyecto= $this->id_cue_proyecto,*/
                $activo_inactivo_proyecto= $this->activo_inactivo_proyecto,
            ];
        //  GENERA respuesta del SP
            $respuesta= DB::select('SELECT * from infraest_relevamiento.modificar_proyecto( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', $argumentos);
        //  RETORNA $respuesta al CONTROLADOR
            return $respuesta;
    }
    //  \.modificar_proyecto()

    public function insertar_proyecto() {
        // DEFINICION de array con los parametros a enviar al SP
            $argumentos=[
                $id_proyecto= $this->id_proyecto,
                $cue= $this->cue,
                $anexo= $this->anexo,
                $id_tipo_financiamiento= $this->id_tipo_financiamiento,
                $descripcion_proyecto= $this->descripcion_proyecto,
                $id_tipo_estado_proyecto= $this->id_tipo_estado_proyecto,
                $quien_inicia_proyecto= $this->quien_inicia_proyecto,
                $monto_estimado_proyecto= $this->monto_estimado_proyecto,
                $prioridad_proyecto= $this->prioridad_proyecto,
                $porcentaje_avance= $this->porcentaje_avance,
                $motivo_no_ejecucion= $this->motivo_no_ejecucion,
                $fecha_finalizacion= $this->fecha_proyecto,
                $fecha_proyecto= $this->fecha_proyecto,
                $quien_carga_proyecto= $this->quien_carga_proyecto,
                $observacion_proyecto= $this->observacion_proyecto,
                $persona_usuario_proyecto= $this->persona_usuario_proyecto,
                $id_cue_proyecto= $this->id_cue_proyecto,
                $activo_inactivo_proyecto= $this->activo_inactivo_proyecto,
            ];
        //  GENERA respuesta del SP
            $respuesta= DB::select('SELECT * from infraest_relevamiento.insertar_proyecto( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', $argumentos);
        //  RETORNA $respuesta al CONTROLADOR
            return $respuesta;
    }
    //  \.insertar_proyecto()

    public function crear_proyecto() {
        // DEFINICION de array con los parametros a enviar al SP
            $argumentos=[
                //$id_proyecto= $this->id_proyecto,
                $cue= $this->cue,
                $anexo= $this->anexo,
                $id_tipo_financiamiento= $this->id_tipo_financiamiento,
                $descripcion_proyecto= $this->descripcion_proyecto,
                $id_tipo_estado_proyecto= $this->id_tipo_estado_proyecto,
                $quien_inicia_proyecto= $this->quien_inicia_proyecto,
                $monto_estimado_proyecto= $this->monto_estimado_proyecto,
                $prioridad_proyecto= $this->prioridad_proyecto,
                $porcentaje_avance= $this->porcentaje_avance,
                $motivo_no_ejecucion= $this->motivo_no_ejecucion,
                $fecha_finalizacion= $this->fecha_proyecto,
                $fecha_proyecto= $this->fecha_proyecto,
                $quien_carga_proyecto= $this->quien_carga_proyecto,
                $observacion_proyecto= $this->observacion_proyecto,
                $persona_usuario_proyecto= $this->persona_usuario_proyecto,
                //$id_cue_proyecto= $this->id_cue_proyecto,
                $activo_inactivo_proyecto= $this->activo_inactivo_proyecto,
            ];
        //  GENERA respuesta del SP
            $respuesta= DB::select('SELECT * from infraest_relevamiento.crear_proyecto( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', $argumentos);
                //var_dump($respuesta);exit;
        //  RETORNA $respuesta al CONTROLADOR
            return $respuesta;
    }
    //  \.crear_proyecto()




    public static function eliminar($id_proyecto) {
        // DEFINICION de array con los parametros a enviar al SP
            $argumento=[
                $id_proyecto
            ];

            //echo("variable argumento:");
            //var_dump($argumento);exit;

        //  GENERA respuesta del SP
            $respuesta= DB::select('SELECT * from infraest_relevamiento.eliminar_proyecto( ?)', $argumento);
        //  RETORNA $respuesta al CONTROLADOR
            return $respuesta;
    }
    //  \.eliminar_proyecto()
}
