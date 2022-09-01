$(document).ready(function() {
    // update_select_localidades();



    // document.getElementById('mylink').onclick = function() {
    //     document.getElementById('myform').submit();
    //     return false;
    // };


    $( ".mostrar_historial" ).on('submit', function(e) {                                                                            //
        //e.preventDefault();
        alert( "Handler for .click() called." );
        console.log("asdfadf");

        window.location.replace('/welcome');
      });



    //  Submit - Al hacer click sobre un proyecto, se mostrará una pantalla amodal con el HISTORIAL de actualizaciones  --------------------//
    $('.formulario_proyectos_historial').on('submit', function(e) {                                                                            //
        e.preventDefault();

        window.location.replace('/welcome');

        var inputs_values= $(this).serializeArray();
        console.log(inputs_values);    
        console.log("VALOR DEL ID_CUE_PROYECTO:"+inputs_values[1].value);

        var id_cue_proyecto=inputs_values[1].value;

        //var id_cue_proyecto= $('input[name="input_id_cue_proyecto"]').val();
        //console.log(id_cue_proyecto);
            /*
            $.ajax({
                type: $(this).attr('method'),   //TIPO DE REQUEST: se lee el metodo del formuario con id=login-admin
                data: id_cue_proyecto,                    //se indica los datos que se quieren enviar a ajax
                url: $(this).attr('action'),   //a donde se van a enviar, en este caso, se indica lo que indica action
                //dataType: 'text',               //se indica el tipo de datos. No se utilizará ya que daba errores
                success: function(response) {       //cuando la llamada sea exitosa, el archivo definido en action devuelve TRUE o FALSE
                    //console.log(response.proyectos);
                    alert("EXITOSO");
                    
    
                }// ./success
            })// ./$.ajax
            */
        //}// FIN if-else                                                                                                                   //
    })
})
