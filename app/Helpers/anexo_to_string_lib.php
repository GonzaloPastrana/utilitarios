<?php
    //session_start();
    
    //$anexo= $_SESSION['anexo'];

    function anexo_to_string($anexo) {
        if( strlen($anexo)==1 ) {
            $anexo= "0".$anexo;
        }
        return $anexo;
    }


?>