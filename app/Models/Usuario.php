<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Usuario extends Model
{

    // DEFINICION DE ATRIBUTOS
        public $id_usuario;    
        public $nombre;
        public $apellido;
        public $usuario;
        public $pass;
        public $sexo;
        public $acceso;
        public $id_perfil;
        public $foperacion;
        public $id_persona;
        

    public function __construct($args=[]) {
        $this->id_usuario= $args['id_usuario'] == NULL ? -1 : $args['id_usuario'];
        $this->nombre= $args['nombre'] == NULL ? '' : $args['nombre'];
        $this->apellido= $args['apellido'] == NULL ? '' : $args['apellido'];
        $this->usuario= $args['usuario'] == NULL ? '' : $args['usuario'];
        $this->pass= $args['password'] == NULL ? '' : $args['password'];
        $this->sexo= $args['sexo'] == NULL ? '' : $args['sexo'];
        $this->acceso= $args['acceso'] == NULL ? '' : $args['acceso'];
        $this->id_perfil= $args['id_perfil'] == NULL ? '' : $args['id_perfil'];
        $this->foperacion= $args['foperacion'] == NULL ? '' : $args['foperacion'];
        $this->id_persona= $args['id_persona'] == NULL ? -1 : $args['id_persona'];
    }

    public function existeUsuario() {
        // VERIFICACION DE USUARIO EXISTENTE
            $argumentos=[
                $this->usuario
            ];
            //var_dump($argumentos);exit;
            // STORE PROCEDURA
            $resultset_bool= DB::select('SELECT * FROM infraest_relevamiento.existe_usuario(?)', $argumentos);

            
            //var_dump($resultset_bool[0]->existe_usuario);exit;
            
            //echo($resultset_bool[0]->existe_usuario);exit;
            return $resultset_bool;
            //return $resultset_bool[0]->existe_usuario;

            // return response()->json([
            //     'resultado'=> $resultset_bool[0]->existe_usuario
            // ]);
            
    }


    public function comprobarPassword() {
            $argumentos=[
                $this->usuario,
                $this->pass
            ];
            //var_dump($argumentos);exit;
        // STORE PROCEDURE
            $resultset_bool= DB::select('SELECT * FROM infraest_relevamiento.comprobar_password( ?, ?)', $argumentos);
            
            //var_dump($resultset_bool[0]->comprobar_password);exit;            
            
            return $resultset_bool;

            // return response()->json([
            //     'resultado'=> $resultset_bool[0]->existe_usuario
            // ]);
            
    }

    public function autenticar() {
        //  CREAR VARIABLES DE SESIÓN
            //  BUSCAR USUARIO según usuario ingresado-> se lo guardará en $resultset_usuario
                $argumento=[
                    $this->usuario
                ];

                $resultset_usuario= DB::select('SELECT * FROM infraest_relevamiento.buscar_usuario_usuario( ?)', $argumento);

            //  REGISTRAR EL ID DE USUARIO
                $_SESSION['id_usuario']= $resultset_usuario[0]->id_usuario;
            
            //  REGISTRAR EL TIPO DE USUARIO (ACCESO)
                $_SESSION['id_perfil']= $resultset_usuario[0]->id_perfil;
            
            //  REGISTRAR EL INICIO DE SESIÓN PARA PERMITIR NAVEGAR POR EL SITIO
                $_SESSION['login']= TRUE;

    }
}
