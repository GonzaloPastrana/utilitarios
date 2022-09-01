// const { exists } = require("laravel-mix/src/File");

$(document).ready(function() {
    //  Al cargar la pagina, esta funcion se ejecutará si o si
        mostrar_proyectos_tabla();

    //  OnChange - al cambiar una opcion del SELECT de DEPARTAMENTO...  -----------------------------//
        $('.select_opcion_proyectos').change( function() {
            //var codigo_departamento= document.getElementById("codigo_departamento").value;
            mostrar_proyectos_tabla();  //  se debe ejecutar tambien cada vez que se seleccione una opcion el SELECT
        });
        // \.onChange
    // ----------------------------------------------------------------------------------------------//
})

function mostrar_proyectos_tabla() {
    //  Se rescata el valor de la opcion seleccionada en el SELECT
    var codigo_opcion_proyectos= document.getElementById("codigo_opcion_proyectos").value;
        //console.log(codigo_opcion_proyectos);

    //  Se DISCRIMINA la opcion seleccionada, de acuerdo a eso se forma la tabla a mostrar
        switch (codigo_opcion_proyectos) {
            case "1":
                        console.log('SIN FINANCIAMIENTO');
                        //tabla_proyecto_sin_financiamiento();
                        break;
            case "2":
                        console.log('CON FINANCIAMIENTO');
                        tabla_proyecto_cooperar123();
                        //tabla_proyecto_con_financiamiento();
                        break;
            case "3":
                        console.log('CONSTRUCCIONES ESCOLARES');
                        break;
            case "4":
                        console.log('COOPERAR I,II y III');
                        //var token= document.getElementById("token");
                        //console.log(token);
                        tabla_proyecto_cooperar123();
                        break;
            case "9":
                        console.log('INET 2022');
                        break;
            default:
                        console.log('>9');
                        break;
        }

    /*
    $.ajax({
        type: "POST",
        url: "/fetch_localidades",
        data: {
            codigo_departamento_ajax: codigo_departamento,
            _token: $('input[name="_token"]').val()
        },
        dataType: "json",
        success: function (response) {
            //  ELIMINACION DE localidades correspondientes al departamento seleccionado anteriormente  ------//
                    var select_localidades= document.getElementById("codigo_localidad");
                    while ( select_localidades.hasChildNodes() ) {
                        select_localidades.removeChild(select_localidades.lastChild)
                    }
            //  ----------------------------------------------------------------------------------------------//
            //  GENERACION de las localidades correspondientes al departamento seleccionado actualmente  --------//
                    $('.select_localidades_updated').append(
                        '<option value="-1" selected>-</option>'
                    );
                    $.each(response.localidades, function (key, value) {
                        //console.log(value.nombre_localidades);   //  sentencia para control
                        
                        $('.select_localidades_updated').append(
                            '<option class="form-control" value="'+value.codigo_localidades+'">'+value.nombre_localidades+'</option>'
                        );
                        // \.append
                    });
                    // \.each
            //  -------------------------------------------------------------------------------------------------//
        }
        // \.success
    });
    // \.ajax
    */
};
// \.function mostrar_proyectos_tabla


function tabla_proyecto_cooperar123() {
    var codigo_opcion_proyectos= document.getElementById("codigo_opcion_proyectos").value;

    var token= document.getElementById("token").value;

    console.log("opcion actual:"+codigo_opcion_proyectos);
    console.log(token);

    $.ajax({
        type: "POST",
        url: "/fetch_proyectos",
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        data: {
            codigo_opcion_proyectos_ajax: codigo_opcion_proyectos
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
                                        <form action='/fetch_historial' method='POST' class='formulario_proyectos_historial'>\
                                            <input type='hidden' name='_token' value='"+token+"'>\
                                            <input type='hidden' name='input_id_cue_proyecto' value="+value.id_cue_proyecto+">\
                                            <button type='submit' class='btn_historial_proyecto' title='HISTORIAL' data-toggle='modal' data-target='#exampleModal'>\
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

}


/*
$(document).ready(function() {
    // update_select_localidades();

    //  Submit - Al hacer click sobre un proyecto, se mostrará una pantalla amodal con el HISTORIAL de actualizaciones  --------------------//
    $('.formulario_proyectos_historial').on('submit', function(e) {
        e.preventDefault();
            //var id_cue_proyecto= document.querySelector("input[name='input_id_cue_proyecto']").value;
            // var id_cue_proyecto= document.querySelector('.input_id_cue_proyecto').value;

        //  Toma todos los valores de los inputs y los coloca en un array (_token + id_cue_proyecto)
        var inputs_values= $(this).serializeArray();
        //console.log(inputs_values[1].value);     
        //  Se restaca el valor de id_cue_proyecto
        var id_cue_proyecto= inputs_values[1].value;

        $.ajax({
            type: "POST",
            url: "/fetch_historial",
            data: {
                id_cue_proyecto_ajax: id_cue_proyecto,
                _token: $('input[name="_token"]').val()
            },
            dataType: "json",
            beforeSend: function() {
                //  ELIMINACION DE TABLA 
                    //  ELIMINACION DEL ENCABEZADO DE LA TABLA DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                    var tabla_historial_proyectos_encabezado= document.getElementById("tabla_historial_proyectos_encabezado");
                    while ( tabla_historial_proyectos_encabezado.hasChildNodes() ) {
                        tabla_historial_proyectos_encabezado.removeChild(tabla_historial_proyectos_encabezado.lastChild)
                    }
                    
                //  ELIMINACION DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                    var tabla_historial_proyectos_cuerpo= document.getElementById("tabla_historial_proyectos_cuerpo");
                    while ( tabla_historial_proyectos_cuerpo.hasChildNodes() ) {
                        tabla_historial_proyectos_cuerpo.removeChild(tabla_historial_proyectos_cuerpo.lastChild)
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
                    document.getElementById("tabla_historial_proyectos").style.display= "block";
            
                //  CREACION DE TABLA NUEVA
                    //  GENERACION DEL ENCABEZADO DE LA TABLA de los establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                    $('#tabla_historial_proyectos_encabezado').append(
                        '<tr>\
                            <th>Descripcion (lo que se quiere hacer)</th>\
                            <th>MONTO</th>\
                            <th>FECHA DEL RELEVAMIENTO</th>\
                            <th>QUIEN HIZO EL RELEVAMIENTO</th>\
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
                        $('.tabla_historial_proyectos_cuerpo').append(
                            '<tr>\
                                <td>'+value.descripcion_proyecto+'</td>\
                                <td>'+value.monto_estimado_proyecto+'</td>\
                                <td>'+value.fecha_proyecto+'</td>\
                                <td>'+value.quien_carga_proyecto+'</td>\
                            </tr>'
                        );
                        // \.append
                    });
                    // \.each                    
            }
            // \.success
        });
        // \.ajax           
    });
    // \.submit
})
*/