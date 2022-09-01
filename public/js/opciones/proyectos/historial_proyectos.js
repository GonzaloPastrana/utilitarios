$(document).ready(function() {
    // update_select_localidades();

    
    //  Submit - Al hacer click sobre un proyecto, se mostrará una pantalla amodal con el HISTORIAL de actualizaciones  --------------------//
    $('.formulario_proyectos_historial').on('submit', function(e) {
        e.preventDefault();
            //var id_cue_proyecto= document.querySelector("input[name='input_id_cue_proyecto']").value;
            // var id_cue_proyecto= document.querySelector('.input_id_cue_proyecto').value;
        
        //  Toma todos los valores de los inputs y los coloca en un array (_token + id_cue_proyecto)
        var inputs_values= $(this).serializeArray();
        console.log(inputs_values);    
        console.log("VALOR DEL ID_CUE_PROYECTO:"+inputs_values[1].value);

        var id_cue_proyecto=inputs_values[1].value;

        //var id_cue_proyecto= $('input[name="input_id_cue_proyecto"]').val();
        console.log(id_cue_proyecto);
        
        $.ajax({
            type: "POST",
            url: "/fetch_historial",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {
                id_cue_proyecto_ajax: id_cue_proyecto
            },
            dataType: "json",
            beforeSend: function() {
                //  ELIMINACION DE TABLA 
                    //  ELIMINACION DEL ENCABEZADO DE LA TABLA DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                    var tabla_proyectos_encabezado= document.getElementById("tabla_proyectos_encabezado");
                    while ( tabla_proyectos_encabezado.hasChildNodes() ) {
                        tabla_proyectos_encabezado.removeChild(tabla_proyectos_encabezado.lastChild)
                    }
                    
                //  ELIMINACION DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                    var tabla_proyectos_cuerpo= document.getElementById("tabla_proyectos_cuerpo");
                    while ( tabla_proyectos_cuerpo.hasChildNodes() ) {
                        tabla_proyectos_cuerpo.removeChild(tabla_proyectos_cuerpo.lastChild)
                    }
                //  ----------------------------------------------------------------------------------------------------------------//
                //  MOSTRAR SPINNER DE ESPERA
                    document.getElementById("spinner-loading").style.display= "block";
                //  BORRAR TABLA DE HISTORIAL DE PROYECTOS
                    document.getElementById("tabla_historial_proyectos").style.display= "none";
            },
            success: function (response) {
                console.log(response.proyectos);
                //  OCULTAR SPINNER DE ESPERA
                    document.getElementById("spinner-loading").style.display= "none";
                //  MOSTRAR TABLA DE HISTORIAL DE PROYECTOS
                    document.getElementById("tabla_proyectos").style.display= "block";
            
                //  CREACION DE TABLA NUEVA
                    //  GENERACION DEL ENCABEZADO DE LA TABLA de los establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                    $('#tabla_proyectos_encabezado').append(
                        '<tr>\
                            <th>Descripcion (lo que se quiere hacer)</th>\
                            <th>MONTO</th>\
                            <th>FECHA DEL RELEVAMIENTO</th>\
                            <th>QUIEN HIZO EL RELEVAMIENTO</th>\
                            <th>ACCIONES</th>\
                        </tr>'
                    );
                    //console.log(codigo_departamento);
                    //console.log(codigo_localidad);
                    // console.log(response.hay_registros);
                    
                //  GENERACION del cuerpo de la TABLA de establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                    $.each(response.proyectos, function (key, value) {
                        //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                            if(value.quien_carga_proyecto==null) { value.quien_carga_proyecto=""; }
                            if(value.monto_estimado_proyecto==null) { value.monto_estimado_proyecto=""; }
                        // -----------------------------------------------------//
                        $('.tabla_proyectos_cuerpo').append(
                            "<tr>\
                                <td>'"+value.descripcion_proyecto+"'</td>\
                                <td>'"+value.monto_estimado_proyecto+"'</td>\
                                <td>'"+value.fecha_proyecto+"'</td>\
                                <td>'"+value.quien_carga_proyecto+"'</td>\
                                <td><!-- ACCIONES -->\
                                    <div class='row'>\
                                        <div class='col-md-4' style='padding:5px;'>\
                                            <form action='/establecimientos/proyectos/historial' method='POST' class='formulario_proyectos_historial'>\
                                                <input type='hidden' name='_token' value='"+token+"'>\
                                                <input type='hidden' name='input_id_cue_proyecto' value="+value.id_cue_proyecto+">\
                                                <button type='submit' class='btn' title='HISTORIAL' data-toggle='modal' data-target='#exampleModal'>\
                                                    <i class='fa fa-clock-rotate-left fa-lg text-warning'></i>\
                                                </button>\
                                            </form>\
                                        </div>\
                                        <div class='col-md-4' style='padding:5px;'>\
                                            <button class='btn' title='ACTUALIZAR'>\
                                                <i class='fa fa-pencil fa-lg text-info'></i>\
                                                <input type='hidden' id='id_proyecto_actualizar' value='"+value.id_proyecto+"'>\
                                                <input type='hidden' id='id_cue_proyecto' value='"+value.id_cue_proyecto+"'>\
                                            </button>\
                                        </div>\
                                        <div class='col-md-4' style='padding:5px;' id='boton_proyecto_eliminar'>\
                                            <form action='/establecimientos/proyectos/eliminar' method='POST'>\
                                                \
                                                <input type='hidden' name='id_proyecto_eliminar' value='"+value.id_proyecto+"'>\
                                                <button type='submit' class='btn' title='ELIMINAR'>\
                                                        <i class='fa fa-trash fa-lg text-danger'></i>\
                                                    </button>\
                                            </form>\
                                        </div>\
                                    </div>\
                                </td>\
                            </tr>"
                        );
                        // \.append
                    });
                    // \.each                    
            }
            // \.success
        });
        // \.ajax




















        //var cue= "<%= $_SESSION['cue']%>";
        // var cue=  sessionStorage.getItem('cue');;
        //console.log(cue);    

        //LhaFFZs3EpkGhsifcfByRyKrXoLJMQovhksTb09I
        //LhaFFZs3EpkGhsifcfByRyKrXoLJMQovhksTb09I 

        //  Se restaca el valor de id_cue_proyecto
        
        //var id_cue_proyecto= inputs_values[1].value;    //1
        
        // var token= $('input[name="_token"]').val();
        // console.log(token);

        //console.log(id_cue_proyecto);

        // this.submit();
        //this.submit();

        
    });
    // \.submit
})
