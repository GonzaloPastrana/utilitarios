function get_cueanexo(cueanexo) {
            console.log(cueanexo);

            var ruta_part1= document.getElementById('ruta_techos').value;
            //console.log(ruta_part1+'?cueanexo='+cueanexo);
            var ruta_destino= ruta_part1;
            console.log(ruta_destino);

            $.ajax({
                type: "POST",
                url: "/cueanexo_selected",
                data: {
                    cueanexo_ajax: cueanexo,
                    _token: $('input[name="_token"]').val()
                },
                dataType: "json",
                success: function (response) {        
                    
                    if( response.seted == true) {
                        //  REDIRIGIR A LA PAGINA DE TECHOS
                            location.href= ruta_destino;
                    }
                }
                // \.success
            });
            // \.ajax   
};
// \.get_cueanexo()

$(document).ready(function() {

    $('#boton_buscar_xcueanexo').click( function() {
        var input_cue= document.getElementById("input_buscar_cue").value;
        var input_anexo= document.getElementById("input_buscar_anexo").value;

        // console.log(input_cue);
        // console.log(input_anexo);

        if( input_cue=="") {
            Swal.fire({
                icon: 'warning',
                //title: 'Oops...',
                html: '<p class="sweetalert2-html-actionText">Por favor, ingresar CUE</p>',
                showConfirmButton: false,   //NO muestra boton de confirmar
                timer: 3000,                //tiempo que permanece visible la notificación
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        } else {
            $.ajax({
                type: "POST",
                url: "/fetch_establecimientos_xcueanexo",
                data: {
                    input_cue_ajax: input_cue,
                    input_anexo_ajax: input_anexo,
                    _token: $('input[name="_token"]').val()
                },
                dataType: "json",
                beforeSend: function() {
                    //  ELIMINACION DE TABLA 
                        //  ELIMINACION DEL ENCABEZADO DE LA TABLA DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                        var tabla_establecimientos_encabezado= document.getElementById("tabla_establecimientos_encabezado");
                        while ( tabla_establecimientos_encabezado.hasChildNodes() ) {
                            tabla_establecimientos_encabezado.removeChild(tabla_establecimientos_encabezado.lastChild)
                        }
                        
                    //  ELIMINACION DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                        var tabla_establecimientos= document.getElementById("tabla_establecimientos");
                        while ( tabla_establecimientos.hasChildNodes() ) {
                            tabla_establecimientos.removeChild(tabla_establecimientos.lastChild)
                        }
                    //  ----------------------------------------------------------------------------------------------------------------//

                    //  QUITAR MENSAJE: No hay resultados
                        document.getElementById("no_hay_resultados").style.display="none";
                    //  MOSTRAR SPINNER DE ESPERA
                        document.getElementById("spinner-loading").style.display= "block";
                },
                success: function (response) {
                    //  QUITAR SPINNER DE ESPERA
                        document.getElementById("spinner-loading").style.display="none";
                            //console.log(response.establecimiento);    //  control y pruebas
                    //  CREACION DE TABLA NUEVA
                        //  GENERACION DEL ENCABEZADO DE LA TABLA de los establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                            $('#tabla_establecimientos_encabezado').append(
                                '<tr>\
                                    <th>Cue-Anexo</th>\
                                    <th>Nombre</th>\
                                    <th>CUI</th>\
                                    <th>Dirección</th>\
                                    <th>Localidad</th>\
                                    <th>Departamento</th>\
                                    <th>Teléfono</th>\
                                </tr>'
                            );
                            //console.log(codigo_departamento);
                            //console.log(codigo_localidad);
                            
                        //  GENERACION del cuerpo de la TABLA de establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                            $.each(response.establecimientos, function (key, value) {
                                //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                                    if(value.direccion==null) { value.direccion=""; }
                                    if(value.telefono==null) { value.telefono=""; }
                                // -----------------------------------------------------//
                                $('.tabla_establecimientos').append(
                                    '<tr onclick="get_cueanexo('+value.cueanexo+')">\
                                        <td>'+value.cueanexo+'</td>\
                                        <td>'+value.nombre+'</td>\
                                        <td>'+value.cui+'</td>\
                                        <td>'+value.direccion+'</td>\
                                        <td>'+value.departamento+'</td>\
                                        <td>'+value.localidad+'</td>\
                                        <td>'+value.telefono+'</td>\
                                    </tr>'
                                );
                                // \.append
                            });
                            // \.each
                }
                // \.success
            });
            // \.ajax   
        }
        // \.if-else
    });
    // \.click #boton_buscar_xcueanexo

    $('#boton_buscar_xnombre').click( function() {
        var input_nombre= document.getElementById("input_buscar_nombre").value;
        
        // console.log(input_cue);
        // console.log(input_anexo);

        if( input_nombre=="") {
            Swal.fire({
                icon: 'warning',
                //title: 'Oops...',
                html: '<p class="sweetalert2-html-actionText">Por favor, ingresar NOMBRE</p>',
                showConfirmButton: false,   //NO muestra boton de confirmar
                timer: 3000,                //tiempo que permanece visible la notificación
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        } else {
            $.ajax({
                type: "POST",
                url: "/fetch_establecimientos_xnombre",
                data: {
                    input_nombre_ajax: input_nombre,
                    _token: $('input[name="_token"]').val()
                },
                dataType: "json",
                beforeSend: function() {
                    //  ELIMINACION DE TABLA 
                        //  ELIMINACION DEL ENCABEZADO DE LA TABLA DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                        var tabla_establecimientos_encabezado= document.getElementById("tabla_establecimientos_encabezado");
                        while ( tabla_establecimientos_encabezado.hasChildNodes() ) {
                            tabla_establecimientos_encabezado.removeChild(tabla_establecimientos_encabezado.lastChild)
                        }
                        
                    //  ELIMINACION DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                        var tabla_establecimientos= document.getElementById("tabla_establecimientos");
                        while ( tabla_establecimientos.hasChildNodes() ) {
                            tabla_establecimientos.removeChild(tabla_establecimientos.lastChild)
                        }
                    //  ----------------------------------------------------------------------------------------------------------------//

                    //  QUITAR MENSAJE: No hay resultados
                        document.getElementById("no_hay_resultados").style.display="none";
                    //  MOSTRAR SPINNER DE ESPERA
                        document.getElementById("spinner-loading").style.display= "block";
                },
                success: function (response) {
                    document.getElementById("spinner-loading").style.display="none";
                            //console.log(response.establecimiento);    //  control y pruebas
                    if( response.hay_registros == true ){
                        //  QUITAR MENSAJE: No hay resultados
                            document.getElementById("no_hay_resultados").style.display="none";
                        //  CREACION DE TABLA NUEVA
                            //  GENERACION DEL ENCABEZADO DE LA TABLA de los establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                            $('#tabla_establecimientos_encabezado').append(
                                '<tr>\
                                    <th>Cue-Anexo</th>\
                                    <th>Nombre</th>\
                                    <th>CUI</th>\
                                    <th>Dirección</th>\
                                    <th>Localidad</th>\
                                    <th>Departamento</th>\
                                    <th>Teléfono</th>\
                                </tr>'
                            );
                            //console.log(codigo_departamento);
                            //console.log(codigo_localidad);
                            // console.log(response.hay_registros);
                            
                        //  GENERACION del cuerpo de la TABLA de establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                            $.each(response.establecimientos, function (key, value) {
                                //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                                    if(value.direccion==null) { value.direccion=""; }
                                    if(value.telefono==null) { value.telefono=""; }
                                // -----------------------------------------------------//
                                $('.tabla_establecimientos').append(
                                    '<tr onclick="get_cueanexo('+value.cueanexo+')">\
                                        <td>'+value.cueanexo+'</td>\
                                        <td>'+value.nombre+'</td>\
                                        <td>'+value.cui+'</td>\
                                        <td>'+value.direccion+'</td>\
                                        <td>'+value.departamento+'</td>\
                                        <td>'+value.localidad+'</td>\
                                        <td>'+value.telefono+'</td>\
                                    </tr>'
                                );
                                // \.append
                            });
                            // \.each
                    } else {
                        document.getElementById("no_hay_resultados").style.display="block";
                    }                    
                }
                // \.success
            });
            // \.ajax   
        }
        // \.if-else
    });
    // \.click #boton_buscar_xnombre



    $('#boton_buscar_depyloc').click( function() {
        var codigo_departamento= document.getElementById("codigo_departamento").value;
        var codigo_localidad= document.getElementById("codigo_localidad").value;

        if( codigo_departamento==-1 || codigo_localidad==-1) {
            Swal.fire({
                icon: 'warning',
                //title: 'Oops...',
                html: '<p class="sweetalert2-html-actionText">Por favor, seleccione<br>DEPARTAMENTO<br>y LOCALIDAD</p>',
                showConfirmButton: false,   //NO muestra boton de confirmar
                timer: 3000,                //tiempo que permanece visible la notificación
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        } else {
            $.ajax({
                type: "POST",
                url: "/fetch_establecimientos",
                data: {
                    codigo_departamento_ajax: codigo_departamento,
                    codigo_localidad_ajax: codigo_localidad,
                    _token: $('input[name="_token"]').val()
                },
                dataType: "json",
                beforeSend: function() {
                    //  ELIMINACION DE TABLA 
                        //  ELIMINACION DEL ENCABEZADO DE LA TABLA DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                        var tabla_establecimientos_encabezado= document.getElementById("tabla_establecimientos_encabezado");
                        while ( tabla_establecimientos_encabezado.hasChildNodes() ) {
                            tabla_establecimientos_encabezado.removeChild(tabla_establecimientos_encabezado.lastChild)
                        }
                        
                    //  ELIMINACION DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                        var tabla_establecimientos= document.getElementById("tabla_establecimientos");
                        while ( tabla_establecimientos.hasChildNodes() ) {
                            tabla_establecimientos.removeChild(tabla_establecimientos.lastChild)
                        }
                    //  ----------------------------------------------------------------------------------------------------------------//

                    //  QUITAR MENSAJE: No hay resultados
                        document.getElementById("no_hay_resultados").style.display="none";
                    //  MOSTRAR SPINNER DE ESPERA
                        document.getElementById("spinner-loading").style.display= "block";
                },
                success: function (response) {
                    //  QUITAR SPINNER DE ESPERA
                        document.getElementById("spinner-loading").style.display="none";
                            //console.log(response.establecimiento);    //  control y pruebas
                    //  CREACION DE TABLA NUEVA
                        //  GENERACION DEL ENCABEZADO DE LA TABLA de los establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                            $('#tabla_establecimientos_encabezado').append(
                                '<tr>\
                                    <th>Cue-Anexo</th>\
                                    <th>Nombre</th>\
                                    <th>CUI</th>\
                                    <th>Dirección</th>\
                                    <th>Localidad</th>\
                                    <th>Departamento</th>\
                                    <th>Teléfono</th>\
                                </tr>'
                            );
                            //console.log(codigo_departamento);
                            //console.log(codigo_localidad);
                            
                        //  GENERACION del cuerpo de la TABLA de establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                            $.each(response.establecimientos, function (key, value) {
                                //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                                    if(value.direccion==null) { value.direccion=""; }
                                    if(value.telefono==null) { value.telefono=""; }
                                // -----------------------------------------------------//
                                $('.tabla_establecimientos').append(
                                    '<tr onclick="get_cueanexo('+value.cueanexo+')">\
                                        <td>'+value.cueanexo+'</td>\
                                        <td>'+value.nombre+'</td>\
                                        <td>'+value.cui+'</td>\
                                        <td>'+value.direccion+'</td>\
                                        <td>'+value.departamento+'</td>\
                                        <td>'+value.localidad+'</td>\
                                        <td>'+value.telefono+'</td>\
                                    </tr>'
                                );
                                // \.append
                            });
                            // \.each
                }
                // \.success
            });
            // \.ajax   
        }
        // \.if-else
    });
    // \.click #boton_buscar_depyloc


    $('#boton_filtrar_depyloc').click( function() {
        var codigo_departamento= document.getElementById("codigo_departamento").value;
        var codigo_localidad= document.getElementById("codigo_localidad").value;
        var cadena_filtrado_nombre= document.getElementById("cadena_filtrado_nombre").value;
        
        //  VERIDICAR que se haya seleccionado DEPARTAMENTO y LOCALIDAD
        if( codigo_departamento==-1 || codigo_localidad==-1) {
            Swal.fire({
                icon: 'warning',
                //title: 'Oops...',
                html: '<p class="sweetalert2-html-actionText">Por favor, seleccione<br>DEPARTAMENTO<br>y LOCALIDAD</p>',
                showConfirmButton: false,   //NO muestra boton de confirmar
                timer: 3000,                //tiempo que permanece visible la notificación
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        } else {
            //  VERIRICAR  que se haya ingresado una CADENA DE FILTRADO
            if( cadena_filtrado_nombre=="") {
                Swal.fire({
                    icon: 'warning',
                    //title: 'Oops...',
                    html: '<p class="sweetalert2-html-actionText">Por favor, ingrese texto en el campo<br>FILTRADO POR NOMBRE</p>',
                    showConfirmButton: false,   //NO muestra boton de confirmar
                    timer: 3000,                //tiempo que permanece visible la notificación
                    // footer: '<a href="">Why do I have this issue?</a>'
                })
            } else {
                $.ajax({
                    type: "POST",
                    url: "/fetch_establecimientos_filtrados_nombre",
                    data: {
                        codigo_departamento_ajax: codigo_departamento,
                        codigo_localidad_ajax: codigo_localidad,
                        cadena_filtrado_nombre_ajax: cadena_filtrado_nombre,
                        _token: $('input[name="_token"]').val()
                    },
                    dataType: "json",
                    beforeSend: function() {
                        //  ELIMINACION DE TABLA 
                            //  ELIMINACION DEL ENCABEZADO DE LA TABLA DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                            var tabla_establecimientos_encabezado= document.getElementById("tabla_establecimientos_encabezado");
                            while ( tabla_establecimientos_encabezado.hasChildNodes() ) {
                                tabla_establecimientos_encabezado.removeChild(tabla_establecimientos_encabezado.lastChild)
                            }
                            
                        //  ELIMINACION DE establecimientos correspondientes al departamento y localidad seleccionados anteriormente  ------//
                            var tabla_establecimientos= document.getElementById("tabla_establecimientos");
                            while ( tabla_establecimientos.hasChildNodes() ) {
                                tabla_establecimientos.removeChild(tabla_establecimientos.lastChild)
                            }
                        //  ----------------------------------------------------------------------------------------------------------------//
                        //  QUITAR MENSAJE: No hay resultados
                            document.getElementById("no_hay_resultados").style.display="none";
                        //  MOSTRAR SPINNER DE ESPERA
                            document.getElementById("spinner-loading").style.display= "block";
                    },
                    success: function (response) {
                        document.getElementById("spinner-loading").style.display="none";
                                //console.log(response.establecimiento);    //  control y pruebas
                        if( response.hay_registros == true ){
                            //  QUITAR MENSAJE: No hay resultados
                                document.getElementById("no_hay_resultados").style.display="none";
                            //  CREACION DE TABLA NUEVA
                                //  GENERACION DEL ENCABEZADO DE LA TABLA de los establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                                $('#tabla_establecimientos_encabezado').append(
                                    '<tr>\
                                        <th>Cue-Anexo</th>\
                                        <th>Nombre</th>\
                                        <th>CUI</th>\
                                        <th>Dirección</th>\
                                        <th>Localidad</th>\
                                        <th>Departamento</th>\
                                        <th>Teléfono</th>\
                                    </tr>'
                                );
                                //console.log(codigo_departamento);
                                //console.log(codigo_localidad);
                                // console.log(response.hay_registros);
                                
                            //  GENERACION del cuerpo de la TABLA de establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                                $.each(response.establecimientos, function (key, value) {
                                    //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                                        if(value.direccion==null) { value.direccion=""; }
                                        if(value.telefono==null) { value.telefono=""; }
                                    // -----------------------------------------------------//
                                    $('.tabla_establecimientos').append(
                                        '<tr onclick="get_cueanexo('+value.cueanexo+')">\
                                            <td>'+value.cueanexo+'</td>\
                                            <td>'+value.nombre+'</td>\
                                            <td>'+value.cui+'</td>\
                                            <td>'+value.direccion+'</td>\
                                            <td>'+value.departamento+'</td>\
                                            <td>'+value.localidad+'</td>\
                                            <td>'+value.telefono+'</td>\
                                        </tr>'
                                    );
                                    // \.append
                                });
                                // \.each
                        } else {
                            document.getElementById("no_hay_resultados").style.display="block";
                        }
                    }
                    // \.success
                });
                // \.ajax   
            }
            // \.if-else
        }
        // \.if-else
    });
    // \.click #boton_filtrar_depyloc
})
// \.ready