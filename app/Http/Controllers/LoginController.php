<?php

namespace App\Http\Controllers;

// MODELOS
use App\Models\Usuario;
// \.MODELOS

use Illuminate\Http\Request;

class LoginController extends Controller
{
    //
    public static function login() {
        return view('login');
    }

    public function autenticar(Request $request) {
        //  Instancia de obtjeto - usuario que intenta acceder
            $try_access= new Usuario($request);
                $try_access->usuario= $_POST['usuario_ajax'];
                $try_access->pass= $_POST['password_ajax'];
        
        //  Verifica que el usuario exista en la BD
            $respuesta= $try_access->existeUsuario();

            if($respuesta[0]->existe_usuario) { //  USUARIO EXISTE EN LA BD
                $respuesta= $try_access->comprobarPassword();   //  se sobre-escribe la variable $respuesta
            } else {    //  USUARIO NO EXISTE EN LA BD
                $respuesta[0]->comprobar_password= FALSE; 
            }

        //  USUARIO Y CONTRASEÑA CORRECTOS -> AUTENTICAR
            if($respuesta[0]->comprobar_password) {
                $try_access->autenticar();
            }

        //  Si el usuario NO EXISTE o si el password ES INCORRECTO, $respuesta será FALSE
            return response()->json([
                'respuesta'=> $respuesta
            ]);

    }

    public static function logout() {
        //  PARA TENER ACCESO A LA SUPER-GLOBAL $_SESSION
            //session_start();  //  NO HACE FALTA EJECUTAR ESTA LINEA NUEVAMENTE
        //  BORRAR DATOS DE LA SUPER-GLOBAL $_SESSION
        $_SESSION= [];
        
        //var_dump($_SESSION);
        
        return view('login');
    }
}
