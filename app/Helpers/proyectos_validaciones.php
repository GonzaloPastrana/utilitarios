<?php
    //  Controla que la relacion entre $fecha_original y $fecha_edicio sea CORRECTA (true)
        function control_precedencia_fechas($fecha_original, $fecha_edicion) {
            if($fecha_original>$fecha_edicion) {
                return false;
            } else { return true; }
        }
    //  Controla que la relacion entre $estado_original y $estado_edicion sea CORRECTA (true)
        function control_precedencia_estados($estado_original, $estado_edicion) {
            //  SI $estado_original==NULL, cualquier otro estado es VALIDO
                if($estado_original== NULL) { 
                    return true; 
                } else {    //  SI $estado_edicion==NULL ($estado_original NO ES NULL) ENTONCES NO ES VALIDO
                    if($estado_edicion== NULL) {
                        return false;
                    }
                }
            //  $estado_original y $estado_edicion NO SON NULL => hay que compararlos
                if($estado_original>$estado_edicion) {
                    return false;
                } else { return true; }
        }
    //  Determina si se debe sobreescribir el registro segun $fecha_origina y $fecha_edicion (cuando son iguales)
        function sobreescribir_registro($fecha_original, $fecha_edicion) {
            if($fecha_original==$fecha_edicion) {
                return true;
            } else { return false; }
        }


?>