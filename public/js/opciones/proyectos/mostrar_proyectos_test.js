//  EJECUTAR al modificar el INPUT TIPO FINANCIAMIENTO
$('.crear_proyecto_tipo_financiamiento').change( function() {
    //alert("se modifico el SELECT");
    var id_tipo_financiamiento= document.getElementById('crear_proyecto_tipo_financiamiento').value;
    //alert(id_tipo_financiamiento);
    //  MUESTRA/OCULTA propiedades/input´s según el FINANCIAMIENTO QUE SE SELECCIONE
        switch (true) {
            case (  id_tipo_financiamiento==""   ):
                        console.log('PROYECTO SIN FINANCIAMIENTO');
                        // OCULTAR PROPIEDADES-INPUT´s
                            document.getElementById('campo_estado_proyecto').style.display="none";
                            document.getElementById('campo_porcentaje_de_avance').style.display="none";
                            document.getElementById('campo_motivo_no_ejecucion').style.display="none";
                            document.getElementById('campo_fecha_finalizacion').style.display="none";
                        break;
            case (  id_tipo_financiamiento==1   ):
                        console.log('Tipo de Financiamiento: Construcciones Escolares');
                        //  MOSTRAR PROPIEDADES-CAMPOS
                            document.getElementById('campo_estado_proyecto').style.display="block";
                            document.getElementById('campo_porcentaje_de_avance').style.display="block";
                        //  OCULTAR PROPIEDADES-CAMPOS
                            document.getElementById('campo_motivo_no_ejecucion').style.display="none";
                            document.getElementById('campo_fecha_finalizacion').style.display="none";
                        break;
            case (  id_tipo_financiamiento==2 || id_tipo_financiamiento==3 ||
                    id_tipo_financiamiento==5 || id_tipo_financiamiento==6 ||
                    id_tipo_financiamiento==19 || id_tipo_financiamiento==20    ):
                        console.log('Tipo de Financiamiento: Cooperar I,II,III y FORES I,II,III ');
                        //  MOSTRAR PROPIEDADES-CAMPOS
                            document.getElementById('campo_estado_proyecto').style.display="block";
                            document.getElementById('campo_porcentaje_de_avance').style.display="block";
                            document.getElementById('campo_motivo_no_ejecucion').style.display="block";
                        //  OCULTAR PROPIEDADES-CAMPOS
                            document.getElementById('campo_fecha_finalizacion').style.display="none";
                        break;
            case (  id_tipo_financiamiento==4 || id_tipo_financiamiento==7 ):
                        console.log('Tipo de Financiamiento: COVID y Obras Mayores');
                        //  MOSTRAR PROPIEDADES-CAMPOS
                            document.getElementById('campo_estado_proyecto').style.display="block";
                            document.getElementById('campo_porcentaje_de_avance').style.display="block";
                            document.getElementById('campo_fecha_finalizacion').style.display="block";
                        //  OCULTAR PROPIEDADES-CAMPOS
                            document.getElementById('campo_motivo_no_ejecucion').style.display="none";
                        break;
            case (  (id_tipo_financiamiento>=8 && id_tipo_financiamiento<=18 ) || 
                    id_tipo_financiamiento==21 || id_tipo_financiamiento==22         ):
                        console.log('Tipo de Financiamiento: Patio cubierto... Materiales de pintura, Insumos COVID, INET 2022');
                        //  MOSTRAR PROPIEDADES-CAMPOS
                            document.getElementById('campo_estado_proyecto').style.display="block";
                        //  OCULTAR PROPIEDADES-CAMPOS
                            document.getElementById('campo_porcentaje_de_avance').style.display="none";
                            document.getElementById('campo_motivo_no_ejecucion').style.display="none";
                            document.getElementById('campo_fecha_finalizacion').style.display="none";
                        break;
            default:
                        console.log("Se escogió una opcion NO configurada");
                        break;
        }
        // \.switch
        //  RE-INICIALIZAR CAMPOS QUE SE OCULTAN/MUESTRAN
            document.getElementById('input_estado_proyecto').value="";
            document.getElementById('input_porcentaje_de_avance').value="";
            document.getElementById('input_motivo_no_ejecucion').value="";
            document.getElementById('input_fecha_finalizacion').value="";

});

//  Al presionar el boton GUARDAR del FORMULARIO DE CREAR PROYECTO
    function crear_proyecto() {
        console.log("jodido");
        //  DEFINICION del OBJETO que almacenará los campos del modal de CREACION de proyectos
            var campos = {};

        //  Se RECORRERÁ el modal de CREACION para construir el vector campos con los datos que figuran en el modal
        $('#formulario_creacion_proyectos').find('input, select').each(function() {
            campos[this.name]= this.value;
        })
            console.log(campos);

        /*
        //  CONTROL de CAMPOS OBLIGATORIOS
            //  DEBE EXISTIR QUIEN HACE LA CARGA
                if(campos.quien_carga_proyecto == '') {
                    sweetalert2_mensaje_warning('Por favor, ingresar QUIEN HACE LA CARGA');
                    return;
                }
            //  DEBE EXISTIR FECHA
                if(campos.fecha_proyecto == '') {
                    sweetalert2_mensaje_warning('Por favor, ingresar FECHA');
                    return;
                }
        */

        //  AJAX + enviar OBJETO campo como un STRING
        $.ajax({
            type: "POST",
            url: "/establecimientos/proyectos/crear",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {'campos_ajax': JSON.stringify(campos)},
            success: function (response) {
                //console.log(response.respuesta_ajax);
                switch (true) {
                    case (  response.error_fecha == true   ):
                                //  FECHA de relevamiento ingresada NO RECIENTE (antecede a la fecha del registro mas reciente)
                                    sweetalert2_mensaje_warning('Por favor, ingrese una fecha más reciente')        
                                break;
                    case (  response.error_estado == true    ):
                                //  ESTADO ingresado NO VALIDO (antecede al estado del registro mas reciente)
                                    sweetalert2_mensaje_warning('ESTADO ingresado inválido')
                                break;
                    case (  response.error_porcentaje_avance == true    ):
                                //  ESTADO ingresado NO VALIDO (antecede al estado del registro mas reciente)
                                    sweetalert2_mensaje_warning('PORCENTAJE DE AVANCE ingresado inválido')
                                break;
                    case (  response.respuesta_ajax=='OK'   ):
                                //  MENSAJE de OPERACION EXITOSA
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Se ha creado un nuevo proyecto',
                                        //html: '<p class="sweetalert2-html-actionText">Actualización exitosa</p>',
                                        position: 'top-right',
                                        showConfirmButton: false,   //NO muestra boton de confirmar
                                        timer: 2000,                //tiempo que permanece visible la notificación
                                        customClass:{
                                            popup:'mt-5'
                                        }
                                    })
                                //  OCULTAR MODAL-EDICION
                                    $('#exampleModal_crear').modal('hide');
                                //  Cargar nuevamente la tabla que muestra los proyectos segun la OPCION seleccionada actual
                                    mostrar_proyectos_tabla();
                                break;
                    default:
                                console.log("Se escogió una opcion NO configurada");
                                break;
                }
                // \.switch
                
            }
            // \.success
        });
        // \.ajax
    }
    //  \.function crear_proyecto()

//  ==============================================================================================================================================//
//  ENCABEZADOS DE TABLA (según el tipo de FINANCIAMIENTO) - estructura + estilos  ===============================================================//
    var encabezado_tabla_sin_financiamiento='   <tr>\
                                                    <th style="width:25%;">Descripcion (lo que se quiere hacer)</th>\
                                                    <th style="width:25%;">Fecha del relevamiento</th>\
                                                    <th style="width:25%;">Quien hizo el relevamiento</th>\
                                                    <th style="width:10%;">ACCIONES</th>\
                                                </tr>';                                        
        // \.Se especifica el ancho de cada encabezado/columna para que la tabla ocupe todo el ancho disponible
    var encabezado_tabla_con_financiamiento='   <tr>\
                                                    <th>Financiamiento</th>\
                                                    <th>Descripcion (lo que se quiere hacer)</th>\
                                                    <th>Estado</th>\
                                                    <th>Monto</th>\
                                                    <th>Fecha del relevamiento</th>\
                                                    <th>Quien hizo el relevamiento</th>\
                                                    <th style="width:10%;">ACCIONES</th>\
                                                </tr>';

    var encabezado_tabla_construcciones_escolares=' <tr>\
                                                        <th>Financiamiento</th>\
                                                        <th>Descripcion (lo que se quiere hacer)</th>\
                                                        <th>Monto</th>\
                                                        <th>Fecha del relevamiento</th>\
                                                        <th>Quien hizo el relevamiento</th>\
                                                        <th style="width:10%;">ACCIONES</th>\
                                                    </tr>';

    var encabezado_tabla_cooperar123='  <tr>\
                                            <th>Financiamiento</th>\
                                            <th>Descripcion (lo que se quiere hacer)</th>\
                                            <th>Monto</th>\
                                            <th>Fecha del relevamiento</th>\
                                            <th>Quien hizo el relevamiento</th>\
                                            <th style="width:10%;">ACCIONES</th>\
                                        </tr>';
//  ENCABEZADOS DE TABLA HISTORIAL  ==============================================================================
    var encabezado_tabla_historial_construcciones_escolares='   <tr>\
                                                                    <th>Financiamiento</th>\
                                                                    <th>Descripcion (lo que se quiere hacer)</th>\
                                                                    <th>Estado</th>\
                                                                    <th>Porcentaje de&nbspAvance</th>\
                                                                    <th>Monto</th>\
                                                                    <th>Fecha de relevamiento</th>\
                                                                    <th>Quién hizo el relevamiento</th>\
                                                                </tr>';

    var encabezado_tabla_historial_general='   <tr>\
                                                        <th>Financiamiento</th>\
                                                        <th>Descripcion (lo que se quiere hacer)</th>\
                                                        <th>Estado</th>\
                                                        <th>Monto</th>\
                                                        <th>Fecha del relevamiento</th>\
                                                        <th>Quien hizo el relevamiento</th>\
                                                    </tr>';

    var encabezado_tabla_historial_cooperar_fores=' <tr>\
                                                        <th>Financiamiento</th>\
                                                        <th>Descripcion (lo que se quiere hacer)</th>\
                                                        <th>Estado</th>\
                                                        <th>Porcentaje de Avance</th>\
                                                        <th>Monto</th>\
                                                        <th>Motivo&nbspde NO&nbspejecución</th>\
                                                        <th>Fecha de relevamiento</th>\
                                                        <th>Quién hizo el relevamiento</th>\
                                                    </tr>';

    var encabezado_tabla_historial_covid_obras_mayores='<tr>\
                                                            <th>Financiamiento</th>\
                                                            <th>Descripcion (lo que se quiere hacer)</th>\
                                                            <th>Estado</th>\
                                                            <th>Porcentaje de Avance</th>\
                                                            <th>Monto</th>\
                                                            <th>Fecha&nbspde finalización</th>\
                                                            <th>Fecha de relevamiento</th>\
                                                            <th>Quién hizo el relevamiento</th>\
                                                        </tr>';
//  ================================================================================================================
//  CUERPO de HISTORIAL --------------------------------------------------------------------------------------------
    function cuerpo_historial_construcciones_escolares(financiamiento, descripcion, estado, porcentaje, monto, fecha, quien_carga) {
        //  TRATAMIENTO DE VALORES NULL´s
            if(estado==null) { estado="-"; }
            if(porcentaje==null) { porcentaje="-"; } else {porcentaje=porcentaje+"&nbsp%";}
            if(monto==null) { monto="-"; } else {monto="$&nbsp"+monto;}
            if(quien_carga==null) { quien_carga="-"; }
        //  VALOR DE RETORNO
        return '<tr>\
                    <td>'+financiamiento+'</td>\
                    <td>'+descripcion+'</td>\
                    <td class="text-center one_line">'+estado+'</td>\
                    <td class="text-center one_line">'+porcentaje+'</td>\
                    <td class="text-center">'+monto+'</td>\
                    <td class="text-center">'+fecha+'</td>\
                    <td class="text-center">'+quien_carga+'</td>\
                </tr>';
    }

    function cuerpo_historial_general(financiamiento, descripcion, estado, monto, fecha, quien_carga) {
        if(descripcion==null) { descripcion="-"; }
        if(estado==null) { estado="-"; }
        if(monto==null) { monto="-"; } else {monto="$&nbsp"+monto;}
        if(quien_carga==null) { quien_carga="-"; }
        return '<tr>\
                    <td>'+financiamiento+'</td>\
                    <td class="text-center">'+descripcion+'</td>\
                    <td class="text-center one_line">'+estado+'</td>\
                    <td class="text-center">'+monto+'</td>\
                    <td class="text-center">'+fecha+'</td>\
                    <td class="text-center">'+quien_carga+'</td>\
                </tr>';
    }

    function cuerpo_historial_cooperar_fores(financiamiento, descripcion, estado, porcentaje, monto, motivo_no_ejecucion, fecha, quien_carga) {
        //  TRATAMIENTO DE VALORES NULL´s
            if(descripcion==null) { descripcion="-"; }
            if(estado==null) { estado="-"; }
            if(porcentaje==null) { porcentaje="-"; } else {porcentaje=porcentaje+"&nbsp%";}
            if(monto==null) { monto="-"; } else {monto="$&nbsp"+monto;}
            if(motivo_no_ejecucion==null) { motivo_no_ejecucion="-"; }
            if(quien_carga==null) { quien_carga="-"; }
        //  VALOR DE RETORNO
        return '<tr>\
                    <td>'+financiamiento+'</td>\
                    <td class="text-center">'+descripcion+'</td>\
                    <td class="text-center one_line">'+estado+'</td>\
                    <td class="text-center one_line">'+porcentaje+'</td>\
                    <td class="text-center">'+monto+'</td>\
                    <td class="text-center">'+motivo_no_ejecucion+'</td>\
                    <td class="text-center">'+fecha+'</td>\
                    <td class="text-center">'+quien_carga+'</td>\
                </tr>';
    }

    function cuerpo_historial_covid_obras_mayores(financiamiento, descripcion, estado, porcentaje, monto, fecha_finalizacion, fecha, quien_carga) {
        //  TRATAMIENTO DE VALORES NULL´s
            if(descripcion==null) { descripcion="-"; }
            if(estado==null) { estado="-"; }
            if(porcentaje==null) { porcentaje="-"; } else {porcentaje=porcentaje+"&nbsp%";}
            if(monto==null) { monto="-"; } else {monto="$&nbsp"+monto;}
            if(fecha_finalizacion==null) { fecha_finalizacion="-"; }
            if(quien_carga==null) { quien_carga="-"; }
        //  VALOR DE RETORNO
        return '<tr>\
                    <td>'+financiamiento+'</td>\
                    <td class="text-center">'+descripcion+'</td>\
                    <td class="text-center one_line">'+estado+'</td>\
                    <td class="text-center one_line">'+porcentaje+'</td>\
                    <td class="text-center">'+monto+'</td>\
                    <td class="text-center">'+fecha_finalizacion+'</td>\
                    <td class="text-center">'+fecha+'</td>\
                    <td class="text-center">'+quien_carga+'</td>\
                </tr>';
    }

// =============================================================================================================//
//  FUNCIONES utilizadas en BEFORESEND
    function borrar_tabla_proyectos_mostrar_spinner() {
        //  OCULTAR TABLA DE PROYECTOS
            document.getElementById("tabla_historial_proyectos").style.display= "none";
        //  ELIMINACION DE TABLA (encabezado y cuerpo)
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
        //  ---------------------------------------------------------------------------------------
        //  OCULTAR MENSAJE "NO HAY RESULTADOS"
            document.getElementById("no_hay_resultados").style.display= "none";
        //  MOSTRAR SPINNER DE ESPERA
            document.getElementById("tabla_proyectos_spinner_loading").style.display= "block";
    }
    //  --------------------------------------------------------------------------------------------------------
    function borrar_campos_modal_edicion_proyecto_mostrar_spinner() {
        //  OCULTAR TABLA DE PROYECTOS
            //document.getElementById("tabla_historial_proyectos").style.display= "none";
        //  ELIMINACION DE CAMPOS
            var formulario_edicion_proyectos= document.getElementById("formulario_edicion_proyectos");
            while ( formulario_edicion_proyectos.hasChildNodes() ) {
                formulario_edicion_proyectos.removeChild(formulario_edicion_proyectos.lastChild)
            }
        //  ---------------------------------------------------------------------------------------
        //  MOSTRAR SPINNER DE ESPERA
            document.getElementById("modal_edicion_proyectos_spinner_loading").style.display= "block";
    }


    function borrar_tabla_historial_mostrar_spinner() {
        //  ELIMINACION DE TABLA 
            //  ELIMINACION DEL ENCABEZADO DE LA TABLA anterior  ------//
            var tabla_historial_proyectos_encabezado= document.getElementById("tabla_historial_proyectos_encabezado");
            while ( tabla_historial_proyectos_encabezado.hasChildNodes() ) {
                tabla_historial_proyectos_encabezado.removeChild(tabla_historial_proyectos_encabezado.lastChild)
            }
        //  ELIMINACION DE proyectos anteriores  ------//
            var tabla_proyectos_cuerpo= document.getElementById("tabla_historial_proyectos_cuerpo");
            while ( tabla_proyectos_cuerpo.hasChildNodes() ) {
                tabla_proyectos_cuerpo.removeChild(tabla_proyectos_cuerpo.lastChild)
            }
        //  ----------------------------------------------------------------------------------------------------------------//
        //  MOSTRAR SPINNER DE ESPERA
            document.getElementById("spinner-loading").style.display= "block";
        //  OCULTAR TABLA DE HISTORIAL DE PROYECTOS
            document.getElementById("tabla_historial_proyectos").style.display= "none";
    }
//  \.FUNCIONES utilizadas en el BEFORESEND  ===================================================================//

// =============================================================================================================//
//  FUNCIONES de utilizadades especificas
    function ocultar_tabla_proyectos_spinner_loading() {
        document.getElementById("tabla_proyectos_spinner_loading").style.display= "none";
    }

    function ocultar_modal_edicion_proyectos_spinner_loading() {
        document.getElementById("modal_edicion_proyectos_spinner_loading").style.display= "none";
    }
//  ========================================================================================================
function sweetalert2_mensaje_warning(mensaje){
    Swal.fire({
        icon: 'warning',
        //title: 'Oops...',
        html: '<p class="sweetalert2-html-actionText">'+mensaje+'</p>',
        showConfirmButton: false,   //NO muestra boton de confirmar
        timer: 2000,                //tiempo que permanece visible la notificación
        // footer: '<a href="">Why do I have this issue?</a>'
    })
}


function actualizar_proyecto() {
    //  DEFINICION del OBJETO que almacenará los campos del modal de EDICION de proyectos
        var campos = {};

    //  Se RECORRERÁ el modal de EDICION para construir el vector campos con los datos que figuran en el modal
    $('#formulario_edicion_proyectos').find('input, select').each(function() {
        campos[this.name]= this.value;
    })
        console.log(campos);

    //  CONTROL de CAMPOS OBLIGATORIOS
        //  DEBE EXISTIR QUIEN HACE LA CARGA
            if(campos.quien_carga_proyecto == '') {
                sweetalert2_mensaje_warning('Por favor, ingresar QUIEN HACE LA CARGA');
                return;
            }
        //  DEBE EXISTIR FECHA
            if(campos.fecha_proyecto == '') {
                sweetalert2_mensaje_warning('Por favor, ingresar FECHA');
                return;
            }
        
    //  AJAX + enviar OBJETO campo como un STRING
    $.ajax({
        type: "POST",
        url: "/establecimientos/proyectos/actualizar",
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        data: {'campos_ajax': JSON.stringify(campos)},
        success: function (response) {
            //console.log(response.respuesta_ajax);
            switch (true) {
                case (  response.error_fecha == true   ):
                            //  FECHA de relevamiento ingresada NO RECIENTE (antecede a la fecha del registro mas reciente)
                                sweetalert2_mensaje_warning('Por favor, ingrese una fecha más reciente')        
                            break;
                case (  response.error_estado == true    ):
                            //  ESTADO ingresado NO VALIDO (antecede al estado del registro mas reciente)
                                sweetalert2_mensaje_warning('ESTADO ingresado inválido')
                            break;
                case (  response.error_porcentaje_avance == true    ):
                            //  ESTADO ingresado NO VALIDO (antecede al estado del registro mas reciente)
                                sweetalert2_mensaje_warning('PORCENTAJE DE AVANCE ingresado inválido')
                            break;
                case (  response.respuesta_ajax=='OK'   ):
                            //  MENSAJE de OPERACION EXITOSA
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Actualización exitosa',
                                    //html: '<p class="sweetalert2-html-actionText">Actualización exitosa</p>',
                                    position: 'top-right',
                                    showConfirmButton: false,   //NO muestra boton de confirmar
                                    timer: 2000,                //tiempo que permanece visible la notificación
                                    customClass:{
                                        popup:'mt-5'
                                    }
                                })
                            //  OCULTAR MODAL-EDICION
                                $('#exampleModal_editar').modal('hide');
                            //  Cargar nuevamente la tabla que muestra los proyectos segun la OPCION seleccionada actual
                                mostrar_proyectos_tabla();
                            break;
                default:
                            console.log("Se escogió una opcion NO configurada");
                            break;
            }
            // \.switch
            
        }
        // \.success
    });
    // \.ajax
}
//  \.function actualizar_proyecto()
//  ----------------------------------------------------------------------------------------------------------------
function eliminar_proyecto(id_proyecto) {
    //  MOSTRAR CUADRO DE CONFIRMACION
        Swal.fire({
            title: '¿Desea eliminar el registro?',
            //text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#ed969e',  //  color rosa
            cancelButtonColor: '#6c757d',   //  color gris
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            customClass:{
                confirmButton:'ml-5 mr-5 font-weight-bold',
                cancelButton:'ml-5 mr-5 font-weight-bold',
            }
        }).then((result) => {   
            if (result.isConfirmed) {   //  SE CONFIRMA LA ACCION
                //  AJAX 
                    $.ajax({
                        type: "POST",
                        url: "/establecimientos/proyectos/eliminar",
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        data: { id_proyecto_ajax: id_proyecto },
                        success: function (response) {
                            
                            if(response.respuesta_ajax=='OK'){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Se eliminó el registro con éxito',
                                    //html: '<p class="sweetalert2-html-actionText">Actualización exitosa</p>',
                                    position: 'top-right',
                                    showConfirmButton: false,   //NO muestra boton de confirmar
                                    timer: 2000,                //tiempo que permanece visible la notificación
                                    customClass:{
                                        popup:'mt-5'    //  agrega margen superior al alerta
                                    }
                                })
                                //  \.Swal.fire
                            }
                            //  Cargar nuevamente la tabla que muestra los proyectos segun la OPCION seleccionada actual
                            mostrar_proyectos_tabla();
                        }
                        // \.success
                    });
                    // \.ajax
            }
        })
}
//  \.function eliminar_proyecto
//  ================================================================================================================
//  ================================================================================================================
$(document).ready(function() {
    //  Al cargar la pagina, esta funcion se ejecutará si o si
        mostrar_proyectos_tabla();
    //  OnChange - al cambiar una opcion del SELECT de DEPARTAMENTO...  -----------------------------//
        $('.select_opcion_proyectos').change( function() {
            mostrar_proyectos_tabla();  //  se debe ejecutar tambien cada vez que se seleccione una opcion el SELECT
        });
        // \.onChange
})
//  ================================================================================================================
// =================================================================================================================
// ================    MODAL - HISTORIAL   ========================================================================
//  Toma el id_cue_proyecto del proyecto seleccionado para poder mostrar posteriormente su historial
    function mostrar_historial(id_tipo_financiamiento, id_cue_proyecto){
            //console.log("ID_TIPO_FINANCIAMIENTO"+id_tipo_financiamiento);
            //console.log("ID_CUE_PROYECTO"+id_cue_proyecto);
        $.ajax({
            type: "POST",
            url: "/fetch_historial",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: { id_cue_proyecto_ajax: id_cue_proyecto },
            dataType: "json",
            beforeSend: borrar_tabla_historial_mostrar_spinner(),
            success: function (response) {
                    //console.log(response.proyectos);
                //  OCULTAR SPINNER DE ESPERA
                    document.getElementById("spinner-loading").style.display= "none";
                //  MOSTRAR TABLA DE HISTORIAL DE PROYECTOS
                    document.getElementById("tabla_historial_proyectos").style.display= "block";
                //  DISCRIMINA id_tipo_financiaminento para configurar CABECERA+CUERPO de la TABLA HISTORIAL a mostrar
                    switch (true) {
                        case (  id_tipo_financiamiento==1   ):
                                    //console.log('Historial Construcciones Escolares');
                                    //  GENERACION DEL ENCABEZADO DE LA TABLA HISTORIAL --------//
                                        $('#tabla_historial_proyectos_encabezado').append( encabezado_tabla_historial_construcciones_escolares );
                                    //  GENERACION del cuerpo de la TABLA HISTORIAL  --------//
                                        $.each(response.proyectos, function (key, value) {
                                            $('.tabla_historial_proyectos_cuerpo').append( cuerpo_historial_construcciones_escolares( value.nombre_tipo_financiamiento, value.descripcion_proyecto, value.tipo_estado_proyecto, value.porcentaje_avance, value.monto_estimado_proyecto, value.fecha_proyecto, value.quien_carga_proyecto) );
                                            // \.append
                                        });
                                        // \.each
                                    break;
                        case (  id_tipo_financiamiento==2 || id_tipo_financiamiento==3 ||
                                id_tipo_financiamiento==5 || id_tipo_financiamiento==6 ||
                                id_tipo_financiamiento==19 || id_tipo_financiamiento==20    ):
                                    console.log('Historial Cooperar I,II,III y FORES I,II,III ');
                                    //  GENERACION DEL ENCABEZADO DE LA TABLA HISTORIAL --------//
                                        $('#tabla_historial_proyectos_encabezado').append( encabezado_tabla_historial_cooperar_fores );
                                    //  GENERACION del cuerpo de la TABLA HISTORIAL  --------//
                                        $.each(response.proyectos, function (key, value) {
                                            $('.tabla_historial_proyectos_cuerpo').append( cuerpo_historial_cooperar_fores( value.nombre_tipo_financiamiento, value.descripcion_proyecto, value.tipo_estado_proyecto, value.porcentaje_avance, value.monto_estimado_proyecto, value.motivo_no_ejecucion, value.fecha_proyecto, value.quien_carga_proyecto   ) );
                                            // \.append
                                        });
                                        // \.each
                                    break;
                        case (  id_tipo_financiamiento==4 || id_tipo_financiamiento==7 ):
                                    //console.log('Historial COVID y Obras Mayores');
                                    //  GENERACION DEL ENCABEZADO DE LA TABLA HISTORIAL --------//
                                    $('#tabla_historial_proyectos_encabezado').append( encabezado_tabla_historial_covid_obras_mayores );
                                    //  GENERACION del cuerpo de la TABLA HISTORIAL  --------//
                                        $.each(response.proyectos, function (key, value) {
                                            $('.tabla_historial_proyectos_cuerpo').append( cuerpo_historial_covid_obras_mayores( value.nombre_tipo_financiamiento, value.descripcion_proyecto, value.tipo_estado_proyecto, value.porcentaje_avance, value.monto_estimado_proyecto, value.fecha_finalizacion, value.fecha_proyecto, value.quien_carga_proyecto  ) );
                                            // \.append
                                        });
                                        // \.each
                                    break;
                        case (  (id_tipo_financiamiento>=8 && id_tipo_financiamiento<=18 ) || 
                                id_tipo_financiamiento==21 || id_tipo_financiamiento==22         ):
                                    //console.log('Historial Patio cubierto... Materiales de pintura, Insumos COVID, INET 2022');
                                    //  GENERACION DEL ENCABEZADO DE LA TABLA HISTORIAL --------//
                                        $('#tabla_historial_proyectos_encabezado').append( encabezado_tabla_historial_general );
                                    //  GENERACION del cuerpo de la TABLA HISTORIAL  --------//
                                        $.each(response.proyectos, function (key, value) {
                                            $('.tabla_historial_proyectos_cuerpo').append( cuerpo_historial_general( value.nombre_tipo_financiamiento, value.descripcion_proyecto, value.tipo_estado_proyecto, value.monto_estimado_proyecto, value.fecha_proyecto, value.quien_carga_proyecto) );
                                            // \.append
                                        });
                                        // \.each
                                    break;
                        default:
                                    console.log("Se escogió una opcion NO configurada");
                                    break;
                    }
                    // \.switch
            }
            // \.success
        });
        // \.ajax
    }
    //  \.get_id_cue_proyecto()
// ================================================================================================================
// ================    MODAL - EDICION   ==========================================================================
    function modal_edicion_proyecto(id_proyecto){
        //console.log(id_proyecto);
        $.ajax({
            type: "POST",
            url: "/fetch_editar_proyecto",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: { id_proyecto_ajax: id_proyecto },
            dataType: "json",
            beforeSend: borrar_campos_modal_edicion_proyecto_mostrar_spinner(),
            success: function (response) {
                //  OCULTAR SPINNER DE ESPERA
                    ocultar_modal_edicion_proyectos_spinner_loading();
                //  GENERAR el codigo de SELECT de ESTADOS DEL PROYECTO     -----------------------------------------//
                    function generar_select_estados_proyectos() {
                        var select_estados_proyecto= 
                        '<div class="col-md-6">\
                            <div class="input-group mb-3">\
                                <span class="input-group-text font-weight-bold" style="width:121px;">\
                                    <div style="width:100%;">Estado</div>\
                                </span>\
                                <select class="form-control select_tipo_estado_proyecto" name="id_tipo_estado_proyecto" id="select_tipo_estado_proyecto" style="width:70%;">\
                                    <div>\
                                        <option class="form-control" value="">-</option>';
                        $.each(response.estados, function (key, value) {
                            select_estados_proyecto=select_estados_proyecto+
                                        '<option class="form-control" value='+value.id_tipo_estado_proyecto+'>'+value.tipo_estado_proyecto+'</option>';
                        });
                        // \.each - GERACION de las options
                        select_estados_proyecto=select_estados_proyecto+
                                    '</div>\
                                </select>\
                            </div>\
                        </div>';    //  final del bloque SELECT de ESTADOS PROYECTO
                        $('#formulario_edicion_proyectos').append(select_estados_proyecto); //  INSERCION del BLOQUE SELECT generado
                    }   //  \.generar_select_estados_proyectos()
                //  ----------------------------------------------------------------------------------------------------//
                //  GENERADORES del CUERPO de la pantalla de EDICION de proyectos
                    function generar_cuerpo_edicion_proyecto_general(id_proyecto, id_cue_proyecto, id_tipo_financiamiento, nombre_tipo_financiamiento, descripcion, monto ) {
                        $('#formulario_edicion_proyectos').append(
                            '<input type="hidden" class="form-control" name="id_proyecto" value='+id_proyecto+'>\
                            <input type="hidden" class="form-control" name="id_cue_proyecto" value='+id_cue_proyecto+'>\
                            \
                            <div class="col-md-12" style="display:flex; align-items:center;">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:184px;">\
                                        <div style="width:100%;">Financiamiento</div>\
                                    </span>\
                                    <input type="hidden" name="id_tipo_financiamiento" class="form-control" value='+id_tipo_financiamiento+' disabled>\
                                    <input type="text" name="nombre_tipo_financiamiento" class="form-control" value="'+nombre_tipo_financiamiento+'" disabled>\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                        <div style="width:100%;">Descripción</div>\
                                    </span>\
                                        <input type="text" name="descripcion_proyecto" class="form-control" value="'+descripcion+'" style="display: inline-block;">\
                                </div>\
                            </div>');
                        //  SELECT de ESTADOS PROYECTO    
                            generar_select_estados_proyectos();

                        $('#formulario_edicion_proyectos').append(
                            '<div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                    <div style="width:100%;">Monto</div>\
                                    </span>\
                                    <div class="input_editar_proyecto_monto">\
                                        <input type="number" name="monto_estimado_proyecto" step="0.01" max="9999999999.99" class="form-control" value='+monto+' style="display: inline-block; padding-left:25px;">\
                                        <span class="signo_peso">$</span>\
                                    </div>\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-6">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:184px;">\
                                        <div style="width:100%;">Fecha</div>\
                                    </span>\
                                    <input type="date" name="fecha_proyecto" class="form-control" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:184px;">\
                                        <div style="width:100%;">Quién hace la carga</div>\
                                    </span>\
                                    <input type="text" name="quien_carga_proyecto" class="form-control" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:184px;">\
                                        <div style="width:100%;">Observaciones</div>\
                                    </span>\
                                        <input type="text" name="observacion_proyecto" class="form-control" value="" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12 text-right">\
                                <button class="btn btn-lg btn-pink" id="boton_formulario_actualizar_proyecto" onclick="actualizar_proyecto()">Guardar</button>\
                            </div>'
                        );
                    }
                    function generar_cuerpo_edicion_proyecto_contrucciones_escolares(id_proyecto, id_cue_proyecto, id_tipo_financiamiento, nombre_tipo_financiamiento, descripcion, monto, porcentaje ) {
                        $('#formulario_edicion_proyectos').append(
                            '<input type="hidden" class="form-control" name="id_proyecto" value='+id_proyecto+'>\
                            <input type="hidden" class="form-control" name="id_cue_proyecto" value='+id_cue_proyecto+'>\
                            \
                            <div class="col-md-12" style="display:flex; align-items:center;">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                        <div style="width:100%;">Financiamiento</div>\
                                    </span>\
                                    <input type="hidden" name="id_tipo_financiamiento" class="form-control" value='+id_tipo_financiamiento+' disabled>\
                                    <input type="text" name="nombre_tipo_financiamiento" class="form-control" value="'+nombre_tipo_financiamiento+'" disabled>\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                        <div style="width:100%;">Descripción</div>\
                                    </span>\
                                        <input type="text" name="descripcion_proyecto" class="form-control" value="'+descripcion+'" style="display: inline-block;">\
                                </div>\
                            </div>');
                        //  SELECT de ESTADOS PROYECTO    
                            generar_select_estados_proyectos();

                        $('#formulario_edicion_proyectos').append(
                            '<div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                    <div style="width:100%;">Porcentaje de avance</div>\
                                    </span>\
                                    <div class="input_editar_proyecto_porcentaje">\
                                        <input type="number" name="porcentaje_avance" step="0.01" max="9999999999.99" class="form-control" value='+porcentaje+' style="display: inline-block; padding-left:25px;">\
                                        <span class="signo_porcentual">%</span>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                    <div style="width:100%;">Monto</div>\
                                    </span>\
                                    <div class="input_editar_proyecto_monto">\
                                        <input type="number" name="monto_estimado_proyecto" step="0.01" max="9999999999.99" class="form-control" value='+monto+' style="display: inline-block; padding-left:25px;">\
                                        <span class="signo_peso">$</span>\
                                    </div>\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-6">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                        <div style="width:100%;">Fecha</div>\
                                    </span>\
                                    <input type="date" name="fecha_proyecto" class="form-control" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                        <div style="width:100%;">Quién hace la carga</div>\
                                    </span>\
                                    <input type="text" name="quien_carga_proyecto" class="form-control" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12 text-right">\
                                <button class="btn btn-lg btn-pink" id="boton_formulario_actualizar_proyecto" onclick="actualizar_proyecto()">Guardar</button>\
                            </div>'
                        );
                    }
                    function generar_cuerpo_edicion_proyecto_cooperar_fores(id_proyecto, id_cue_proyecto, id_tipo_financiamiento, nombre_tipo_financiamiento, descripcion, monto, porcentaje , motivo_no_ejecucion) {
                        $('#formulario_edicion_proyectos').append(
                            '<input type="hidden" class="form-control" name="id_proyecto" value='+id_proyecto+'>\
                            <input type="hidden" class="form-control" name="id_cue_proyecto" value='+id_cue_proyecto+'>\
                            \
                            <div class="col-md-12" style="display:flex; align-items:center;">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                        <div style="width:100%;">Financiamiento</div>\
                                    </span>\
                                    <input type="hidden" name="id_tipo_financiamiento" class="form-control" value='+id_tipo_financiamiento+' disabled>\
                                    <input type="text" name="nombre_tipo_financiamiento" class="form-control" value="'+nombre_tipo_financiamiento+'" disabled>\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                        <div style="width:100%;">Descripción</div>\
                                    </span>\
                                        <input type="text" name="descripcion_proyecto" class="form-control" value="'+descripcion+'" style="display: inline-block;">\
                                </div>\
                            </div>');
                        //  SELECT de ESTADOS PROYECTO    
                            generar_select_estados_proyectos();

                        $('#formulario_edicion_proyectos').append(
                            '<div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                    <div style="width:100%;">Porcentaje de avance</div>\
                                    </span>\
                                    <div class="input_editar_proyecto_porcentaje">\
                                        <input type="number" name="porcentaje_avance" step="0.01" max="100.00" class="form-control" value='+porcentaje+' style="display: inline-block; padding-left:25px;">\
                                        <span class="signo_porcentual">%</span>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                        <div style="width:100%;">Motivo de no ejecución</div>\
                                    </span>\
                                        <input type="text" name="motivo_no_ejecucion" class="form-control" value="'+motivo_no_ejecucion+'" style="display: inline-block;">\
                                </div>\
                            </div>\
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                    <div style="width:100%;">Monto</div>\
                                    </span>\
                                    <div class="input_editar_proyecto_monto">\
                                        <input type="number" name="monto_estimado_proyecto" step="0.01" max="9999999999.99" class="form-control" value='+monto+' style="display: inline-block; padding-left:25px;">\
                                        <span class="signo_peso">$</span>\
                                    </div>\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-6">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                        <div style="width:100%;">Fecha</div>\
                                    </span>\
                                    <input type="date" name="fecha_proyecto" class="form-control" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                        <div style="width:100%;">Quién hace la carga</div>\
                                    </span>\
                                    <input type="text" name="quien_carga_proyecto" class="form-control" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:184px;">\
                                        <div style="width:100%;">Observaciones</div>\
                                    </span>\
                                        <input type="text" name="observacion_proyecto" class="form-control" value="" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12 text-right">\
                                <button class="btn btn-lg btn-pink" id="boton_formulario_actualizar_proyecto" onclick="actualizar_proyecto()">Guardar</button>\
                            </div>'
                        );
                    }
                    function generar_cuerpo_edicion_proyecto_covid_obras_mayores(id_proyecto, id_cue_proyecto, id_tipo_financiamiento, nombre_tipo_financiamiento, descripcion, monto, porcentaje , fecha_finalizacion) {
                        $('#formulario_edicion_proyectos').append(
                            '<input type="hidden" class="form-control" name="id_proyecto" value='+id_proyecto+'>\
                            <input type="hidden" class="form-control" name="id_cue_proyecto" value='+id_cue_proyecto+'>\
                            \
                            <div class="col-md-12" style="display:flex; align-items:center;">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                        <div style="width:100%;">Financiamiento</div>\
                                    </span>\
                                    <input type="hidden" name="id_tipo_financiamiento" class="form-control" value='+id_tipo_financiamiento+' disabled>\
                                    <input type="text" name="nombre_tipo_financiamiento" class="form-control" value="'+nombre_tipo_financiamiento+'" disabled>\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                        <div style="width:100%;">Descripción</div>\
                                    </span>\
                                        <input type="text" name="descripcion_proyecto" class="form-control" value="'+descripcion+'" style="display: inline-block;">\
                                </div>\
                            </div>');
                        //  SELECT de ESTADOS PROYECTO    
                            generar_select_estados_proyectos();

                        $('#formulario_edicion_proyectos').append(
                            '<div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                    <div style="width:100%;">Porcentaje de avance</div>\
                                    </span>\
                                    <div class="input_editar_proyecto_porcentaje">\
                                        <input type="number" name="porcentaje_avance" step="0.01" max="100.00" class="form-control" value='+porcentaje+' style="display: inline-block; padding-left:25px;">\
                                        <span class="signo_porcentual">%</span>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="col-md-6">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                        <div style="width:100%;">Fecha de finalización</div>\
                                    </span>\
                                    <input type="date" name="fecha_finalizacion" class="form-control" style="display: inline-block;" value='+fecha_finalizacion+'>\
                                </div>\
                            </div>\
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                    <div style="width:100%;">Monto</div>\
                                    </span>\
                                    <div class="input_editar_proyecto_monto">\
                                        <input type="number" name="monto_estimado_proyecto" step="0.01" max="9999999999.99" class="form-control" value='+monto+' style="display: inline-block; padding-left:25px;">\
                                        <span class="signo_peso">$</span>\
                                    </div>\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-6">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold" style="width:121px;">\
                                        <div style="width:100%;">Fecha</div>\
                                    </span>\
                                    <input type="date" name="fecha_proyecto" class="form-control" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12">\
                                <div class="input-group mb-3">\
                                    <span class="input-group-text font-weight-bold">\
                                        <div style="width:100%;">Quién hace la carga</div>\
                                    </span>\
                                    <input type="text" name="quien_carga_proyecto" class="form-control" style="display: inline-block;">\
                                </div>\
                            </div>\
                            \
                            <div class="col-md-12 text-right">\
                                <button class="btn btn-lg btn-pink" id="boton_formulario_actualizar_proyecto" onclick="actualizar_proyecto()">Guardar</button>\
                            </div>'
                        );
                    }
                //  -----------------------------------------------------------------------------------------------------//
                    //console.log(response.proyectos[0].id_tipo_financiamiento);

                if( response.hay_registros == true ){
                    //  GENERACION del cuerpo del FORMULARIO  --------//
                        $.each(response.proyectos, function (key, value) {
                            //  RESCATAR el valor id_tipo_financiamiento del proyecto a EDITAR
                                var id_tipo_financiamiento= response.proyectos[0].id_tipo_financiamiento;
                            //  SE MUESTRA "" en caso que los atributos sean null    --------//
                                if(value.descripcion_proyecto==null) { value.descripcion_proyecto=""; }
                                //if(value.monto_estimado_proyecto==null) { value.monto_estimado_proyecto=""; } // NO hace falta este control
                                if(value.motivo_no_ejecucion==null) { value.motivo_no_ejecucion=""; }
                            // -----------------------------------------------------//
                            //  DISCRIMINAR el id_tipo_financiamiento para mostrar ciertos CAMPOS
                                switch (true) {
                                    case (  id_tipo_financiamiento==1   ):
                                                //console.log('EDICION Construcciones Escolares');
                                                generar_cuerpo_edicion_proyecto_contrucciones_escolares(value.id_proyecto, value.id_cue_proyecto, value.id_tipo_financiamiento, value.nombre_tipo_financiamiento, value.descripcion_proyecto, value.monto_estimado_proyecto, value.porcentaje_avance);
                                                break;
                                    case (  id_tipo_financiamiento==2 || id_tipo_financiamiento==3 ||
                                            id_tipo_financiamiento==5 || id_tipo_financiamiento==6 ||
                                            id_tipo_financiamiento==19 || id_tipo_financiamiento==20    ):
                                                //console.log('EDICION Cooperar I,II,III y FORES I,II,III ');
                                                generar_cuerpo_edicion_proyecto_cooperar_fores(value.id_proyecto, value.id_cue_proyecto, value.id_tipo_financiamiento, value.nombre_tipo_financiamiento, value.descripcion_proyecto, value.monto_estimado_proyecto, value.porcentaje_avance, value.motivo_no_ejecucion);
                                                break;
                                    case (  id_tipo_financiamiento==4 || id_tipo_financiamiento==7 ):
                                                //console.log('EDICION COVID y Obras Mayores');
                                                generar_cuerpo_edicion_proyecto_covid_obras_mayores(value.id_proyecto, value.id_cue_proyecto, value.id_tipo_financiamiento, value.nombre_tipo_financiamiento, value.descripcion_proyecto, value.monto_estimado_proyecto, value.porcentaje_avance, value.fecha_finalizacion);
                                                break;
                                    case (  (id_tipo_financiamiento>=8 && id_tipo_financiamiento<=18 ) || 
                                            id_tipo_financiamiento==21 || id_tipo_financiamiento==22         ):
                                                //console.log('EDICION Patio cubierto... Materiales de pintura, Insumos COVID, INET 2022');
                                                generar_cuerpo_edicion_proyecto_general(value.id_proyecto, value.id_cue_proyecto, value.id_tipo_financiamiento, value.nombre_tipo_financiamiento, value.descripcion_proyecto, value.monto_estimado_proyecto);
                                                break;
                                    default:
                                                console.log("Se escogió una opcion NO configurada");
                                                break;
                                }
                                // \.switch
                        //  ---------------------------------------------------------------------------------------------------------------------
                            //  Marcar como SELECTED al estado correspondiente al proyecto seleccionado
                                $('.select_tipo_estado_proyecto option[value='+value.id_tipo_estado_proyecto+']').attr('selected','selected');
                        });
                        // \.each          
                }
                // \.if 9001958
            }
            // \.success
        });
        // \.ajax
        // console.log(document.getElementsByTagName("body"));
        //console.log(document.getElementById("exampleModal_editar"));
    }
    // \.function modal_edicion_proyecto()

// ==================================================================================================//
//  Función que switcheará hacia la funcion correspondiente segun la opcion seleccionada en el SELECT
    function mostrar_proyectos_tabla() {
        //  Se rescata el valor de la opcion seleccionada en el SELECT
            var codigo_opcion_proyectos= document.getElementById("codigo_opcion_proyectos").value;
        //  Se DISCRIMINA la opcion seleccionada, de acuerdo a eso se forma la tabla a mostrar
            switch (codigo_opcion_proyectos) {
                case "1":
                            console.log('SIN FINANCIAMIENTO');
                            tabla_proyecto_sin_financiamiento();
                            break;
                case "2":
                            console.log('CON FINANCIAMIENTO');
                            tabla_proyecto_con_financiamiento();
                            //tabla_proyecto_con_financiamiento();
                            break;
                case "3":
                            //console.log('CONSTRUCCIONES ESCOLARES');
                            tabla_proyecto_construcciones_escolares();
                            break;
                case "4":
                            //console.log('COOPERAR I,II y III');
                            tabla_proyecto_cooperar123();
                            break;
                case "9":
                            //console.log('INET 2022');
                            //tabla_proyecto_inet2022();
                            break;
                default:
                            console.log("Se escogió una opcion NO configurada");
                            break;
            }
            // \.switch
    };
    // \.function mostrar_proyectos_tabla

//  =============================================================================================================
//  ====    FUNCIONES SWITCHEADAS   =============================================================================
//  =============================================================================================================
//  =============================   FUNCIONES tabla_proyecto_xxx()  =============================================
    function tabla_proyecto_sin_financiamiento() {
        //  Se rescata el valor de la opcion seleccionada en el SELECT para enviarla por AJAX
            var codigo_opcion_proyectos= document.getElementById("codigo_opcion_proyectos").value;

        $.ajax({
            type: "POST",
            url: "/fetch_proyectos",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {
                codigo_opcion_proyectos_ajax: codigo_opcion_proyectos
            },
            dataType: "json",
            beforeSend: borrar_tabla_proyectos_mostrar_spinner(),
            success: function (response) {
                //  OCULTAR SPINNER DE ESPERA
                    ocultar_tabla_proyectos_spinner_loading()

                if( response.hay_registros == true ){
                    //  MOSTRAR TABLA DE HISTORIAL DE PROYECTOS
                        document.getElementById("tabla_proyectos").style.display= "block";
                    //  OCULTAR "NO HAY RESULTADOS"
                        document.getElementById("no_hay_resultados").style.display="none";
                
                    //  CREACION DE TABLA NUEVA
                        //  GENERACION DEL ENCABEZADO DE LA TABLA --------//
                        $('#tabla_proyectos_encabezado').append(encabezado_tabla_sin_financiamiento);
                        
                    //  GENERACION del cuerpo de la TABLA de establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                        $.each(response.proyectos, function (key, value) {
                            //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                                if(value.descripcion_proyecto==null) { value.descripcion_proyecto="-"; }
                                if(value.quien_carga_proyecto==null) { value.quien_carga_proyecto="-"; }
                                // if(value.monto_estimado_proyecto==null) { value.monto_estimado_proyecto="-"; }
                            // -----------------------------------------------------//
                            $('.tabla_proyectos_cuerpo').append(
                                '<tr>\
                                    <td>'+value.descripcion_proyecto+'</td>\
                                    <td class="text-center">'+value.fecha_proyecto+'</td>\
                                    <td>'+value.quien_carga_proyecto+'</td>\
                                    <td><!-- ACCIONES -->\
                                        <div class="row">\
                                            <div class="col-md-4 d-flex justify-content-center" style="padding:5px;" id="boton_proyecto_eliminar">\
                                                <input type="hidden" name="_token" value='+token+'>\
                                                <input type="hidden" name="input_id_cue_proyecto" value='+value.id_cue_proyecto+'>\
                                                <button type="submit"class="btn" title="HISTORIAL" data-toggle="modal" data-target="#exampleModal" onclick="mostrar_historial('+value.id_cue_proyecto+')">\
                                                    <i class="fa fa-clock-rotate-left fa-lg text-warning"></i>\
                                                </button>\
                                            </div>\
                                            <div class="col-md-4 d-flex justify-content-center" style="padding:5px;">\
                                                <button class="btn" title="ACTUALIZAR">\
                                                    <i class="fa fa-pencil fa-lg text-info"></i>\
                                                    <input type="hidden" id="id_proyecto_actualizar" value='+value.id_proyecto+'>\
                                                    <input type="hidden" id="id_cue_proyecto" value='+value.id_cue_proyecto+'>\
                                                </button>\
                                            </div>\
                                            <div class="col-md-4 d-flex justify-content-center" style="padding:5px;" id="boton_proyecto_eliminar">\
                                                <form action="/establecimientos/proyectos/eliminar" method="POST">\
                                                    <input type="hidden" name="id_proyecto_eliminar" value='+value.id_proyecto+'>\
                                                    <button type="submit" class="btn" title="ELIMINAR">\
                                                        <i class="fa fa-trash fa-lg text-danger"></i>\
                                                    </button>\
                                                </form>\
                                            </div>\
                                        </div>\
                                    </td>\
                                </tr>'
                            );
                            // \.append
                        });
                        // \.each
                } else {
                    document.getElementById("no_hay_resultados").style.display="block";
                }
                // \.if-else
            }
            // \.success
        });
        // \.ajax
    }
    // \.function tabla_proyecto_sin_financiamiento
    //  =============================================================================================================
    function tabla_proyecto_construcciones_escolares() {
        //  Se rescata el valor de la opcion seleccionada en el SELECT para enviarla por AJAX
            var codigo_opcion_proyectos= document.getElementById("codigo_opcion_proyectos").value;

        $.ajax({
            type: "POST",
            url: "/fetch_proyectos",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {
                codigo_opcion_proyectos_ajax: codigo_opcion_proyectos
            },
            dataType: "json",
            beforeSend: borrar_tabla_proyectos_mostrar_spinner(),
            success: function (response) {
                //  OCULTAR SPINNER DE ESPERA
                    ocultar_tabla_proyectos_spinner_loading()

                if( response.hay_registros == true ){
                    //  MOSTRAR TABLA DE HISTORIAL DE PROYECTOS
                        document.getElementById("tabla_proyectos").style.display= "block";
                    //  OCULTAR "NO HAY RESULTADOS"
                        document.getElementById("no_hay_resultados").style.display="none";
                
                    //  CREACION DE TABLA NUEVA
                        //  GENERACION DEL ENCABEZADO DE LA TABLA --------//
                        $('#tabla_proyectos_encabezado').append(encabezado_tabla_construcciones_escolares);
                        
                    //  GENERACION del cuerpo de la TABLA de establecimientos correspondientes al departamento y localidad seleccionados actualmente  --------//
                        $.each(response.proyectos, function (key, value) {
                            //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                                if(value.quien_carga_proyecto==null) { value.quien_carga_proyecto=""; }
                                if(value.monto_estimado_proyecto==null) { value.monto_estimado_proyecto=""; }
                            // -----------------------------------------------------//
                            $('.tabla_proyectos_cuerpo').append(
                                '<tr>\
                                    <td>'+value.nombre_tipo_financiamiento+'</td>\
                                    <td>'+value.descripcion_proyecto+'</td>\
                                    <td>$&nbsp'+value.monto_estimado_proyecto+'</td>\
                                    <td>'+value.fecha_proyecto+'</td>\
                                    <td>'+value.quien_carga_proyecto+'</td>\
                                    <td><!-- ACCIONES -->\
                                        <div class="row">\
                                            <div class="col-md-4" style="padding:5px;" id="boton_proyecto_eliminar">\
                                                <input type="hidden" name="_token" value='+token+'>\
                                                <input type="hidden" name="input_id_cue_proyecto" value='+value.id_cue_proyecto+'>\
                                                <button type="submit"class="btn" title="HISTORIAL" data-toggle="modal" data-target="#exampleModal" onclick="mostrar_historial('+value.id_cue_proyecto+')">\
                                                    <i class="fa fa-clock-rotate-left fa-lg text-warning"></i>\
                                                </button>\
                                            </div>\
                                            <div class="col-md-4" style="padding:5px;">\
                                                <button class="btn" title="ACTUALIZAR">\
                                                    <i class="fa fa-pencil fa-lg text-info"></i>\
                                                    <input type="hidden" id="id_proyecto_actualizar" value='+value.id_proyecto+'>\
                                                    <input type="hidden" id="id_cue_proyecto" value='+value.id_cue_proyecto+'>\
                                                </button>\
                                            </div>\
                                            <div class="col-md-4" style="padding:5px;" id="boton_proyecto_eliminar">\
                                                <form action="/establecimientos/proyectos/eliminar" method="POST">\
                                                    <input type="hidden" name="id_proyecto_eliminar" value='+value.id_proyecto+'>\
                                                    <button type="submit" class="btn" title="ELIMINAR">\
                                                        <i class="fa fa-trash fa-lg text-danger"></i>\
                                                    </button>\
                                                </form>\
                                            </div>\
                                        </div>\
                                    </td>\
                                </tr>'
                            );
                            // \.append
                        });
                        // \.each
                } else {
                    document.getElementById("no_hay_resultados").style.display="block";
                }
                // \.if-else
            }
            // \.success
        });
        // \.ajax
    }
    // \.function tabla_proyecto_construcciones_escolares
    //  =============================================================================================================
    function tabla_proyecto_cooperar123() {
        //  Se rescata el valor de la opcion seleccionada en el SELECT para enviarla por AJAX
            var codigo_opcion_proyectos= document.getElementById("codigo_opcion_proyectos").value;

        $.ajax({
            type: "POST",
            url: "/fetch_proyectos",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {
                codigo_opcion_proyectos_ajax: codigo_opcion_proyectos
            },
            dataType: "json",
            beforeSend: borrar_tabla_proyectos_mostrar_spinner(),
            success: function (response) {
                //  OCULTAR SPINNER DE ESPERA
                    ocultar_tabla_proyectos_spinner_loading();

                if( response.hay_registros == true ){
                    //  MOSTRAR TABLA DE PROYECTOS
                        document.getElementById("tabla_proyectos").style.display= "block";
                    //  OCULTAR "NO HAY RESULTADOS"
                        document.getElementById("no_hay_resultados").style.display="none";
                
                    //  CREACION DE TABLA NUEVA
                        //  GENERACION DEL ENCABEZADO DE LA TABLA  --------//
                            $('#tabla_proyectos_encabezado').append(encabezado_tabla_cooperar123);

                    //  GENERACION del cuerpo de la TABLA  --------//
                        $.each(response.proyectos, function (key, value) {
                            //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                                if(value.quien_carga_proyecto==null) { value.quien_carga_proyecto=""; }
                                if(value.monto_estimado_proyecto==null) { value.monto_estimado_proyecto=""; }
                            // -----------------------------------------------------//
                            $('.tabla_proyectos_cuerpo').append(
                                '<tr>\
                                    <td>'+value.nombre_tipo_financiamiento+'</td>\
                                    <td>'+value.descripcion_proyecto+'</td>\
                                    <td>$&nbsp'+value.monto_estimado_proyecto+'</td>\
                                    <td>'+value.fecha_proyecto+'</td>\
                                    <td>'+value.quien_carga_proyecto+'</td>\
                                    <td><!-- ACCIONES -->\
                                        <div class="row">\
                                            <div class="col-md-4" style="padding:5px;" id="boton_proyecto_eliminar">\
                                                <input type="hidden" name="_token" value='+token+'>\
                                                <input type="hidden" name="input_id_cue_proyecto" value='+value.id_cue_proyecto+'>\
                                                <button type="submit"class="btn" title="HISTORIAL" data-toggle="modal" data-target="#exampleModal" onclick="mostrar_historial('+value.id_cue_proyecto+')">\
                                                    <i class="fa fa-clock-rotate-left fa-lg text-warning"></i>\
                                                </button>\
                                            </div>\
                                            <div class="col-md-4" style="padding:5px;">\
                                                <button class="btn" title="ACTUALIZAR">\
                                                    <i class="fa fa-pencil fa-lg text-info"></i>\
                                                    <input type="hidden" id="id_proyecto_actualizar" value='+value.id_proyecto+'>\
                                                    <input type="hidden" id="id_cue_proyecto" value='+value.id_cue_proyecto+'>\
                                                </button>\
                                            </div>\
                                            <div class="col-md-4" style="padding:5px;" id="boton_proyecto_eliminar">\
                                                <form action="/establecimientos/proyectos/eliminar" method="POST">\
                                                    <input type="hidden" name="id_proyecto_eliminar" value='+value.id_proyecto+'>\
                                                    <button type="submit" class="btn" title="ELIMINAR">\
                                                        <i class="fa fa-trash fa-lg text-danger"></i>\
                                                    </button>\
                                                </form>\
                                            </div>\
                                        </div>\
                                    </td>\
                                </tr>'
                            );
                            // \.append
                        });
                        // \.each          
                } else {
                    //  MOSTRAR "NO HAY RESULTADOS"
                    document.getElementById("no_hay_resultados").style.display="block";
                }
                // \.if-else
            }
            // \.success
        });
        // \.ajax
    }
    // \.function tabla_proyecto_cooperar123
    //  =============================================================================================================
    function tabla_proyecto_con_financiamiento() {
        //  Se rescata el valor de la opcion seleccionada en el SELECT para enviarla por AJAX
            var codigo_opcion_proyectos= document.getElementById("codigo_opcion_proyectos").value;

        $.ajax({
            type: "POST",
            url: "/fetch_proyectos",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {
                codigo_opcion_proyectos_ajax: codigo_opcion_proyectos
            },
            dataType: "json",
            beforeSend: borrar_tabla_proyectos_mostrar_spinner(),
            success: function (response) {
                //  OCULTAR SPINNER DE ESPERA
                    ocultar_tabla_proyectos_spinner_loading();

                if( response.hay_registros == true ){
                    //  MOSTRAR TABLA DE PROYECTOS
                        document.getElementById("tabla_proyectos").style.display= "block";
                    //  OCULTAR "NO HAY RESULTADOS"
                        document.getElementById("no_hay_resultados").style.display="none";
                
                    //  CREACION DE TABLA NUEVA
                        //  GENERACION DEL ENCABEZADO DE LA TABLA  --------//
                            $('#tabla_proyectos_encabezado').append(encabezado_tabla_con_financiamiento);

                    //  GENERACION del cuerpo de la TABLA  --------//
                        $.each(response.proyectos, function (key, value) {
                            //  SE MUESTRA "" en caso que algunos atributos sean null    --------//
                                if(value.descripcion_proyecto==null) { value.descripcion_proyecto="-"; }
                                if(value.tipo_estado_proyecto==null) { value.tipo_estado_proyecto="-"; }
                                if(value.quien_carga_proyecto==null) { value.quien_carga_proyecto="-"; }
                                if(value.monto_estimado_proyecto==null) { value.monto_estimado_proyecto="-"; } else {value.monto_estimado_proyecto="$&nbsp"+value.monto_estimado_proyecto;}
                            // -----------------------------------------------------//
                            $('.tabla_proyectos_cuerpo').append(
                                '<tr>\
                                    <td>'+value.nombre_tipo_financiamiento+'</td>\
                                    <td>'+value.descripcion_proyecto+'</td>\
                                    <td class="one_line">'+value.tipo_estado_proyecto+'</td>\
                                    <td class="text-center">'+value.monto_estimado_proyecto+'</td>\
                                    <td class="text-center">'+value.fecha_proyecto+'</td>\
                                    <td class="text-center">'+value.quien_carga_proyecto+'</td>\
                                    <td style="width:170px;"><!-- ACCIONES -->\
                                        <div class="row">\
                                            <div class="col-md-4 d-flex justify-content-center" style="padding:5px;" id="boton_proyecto_eliminar">\
                                                <input type="hidden" name="_token" value='+token+'>\
                                                <input type="hidden" name="input_id_cue_proyecto" value='+value.id_cue_proyecto+'>\
                                                <button type="submit"class="btn" title="HISTORIAL" data-toggle="modal" data-target="#exampleModal" onclick="mostrar_historial('+value.id_tipo_financiamiento+','+value.id_cue_proyecto+')">\
                                                    <i class="fa fa-clock-rotate-left fa-lg text-warning"></i>\
                                                </button>\
                                            </div>\
                                            <div class="col-md-4 d-flex justify-content-center" style="padding:5px;">\
                                                <button class="btn boton_modal_editar_proyecto" title="ACTUALIZAR" name="boton_modal_editar_proyecto" data-toggle="modal" data-target="#exampleModal_editar" onclick="modal_edicion_proyecto('+value.id_proyecto+')">\
                                                    <i class="fa fa-pencil fa-lg text-info"></i>\
                                                    <input type="hidden" id="id_proyecto_actualizar" value='+value.id_proyecto+'>\
                                                    <input type="hidden" id="id_cue_proyecto" value='+value.id_cue_proyecto+'>\
                                                </button>\
                                            </div>\
                                            <div class="col-md-4 d-flex justify-content-center" style="padding:5px;" id="boton_proyecto_eliminar">\
                                                \
                                                    <input type="hidden" name="id_proyecto_eliminar" value='+value.id_proyecto+'>\
                                                    <button type="submit" class="btn boton_modal_editar_proyecto" title="ELIMINAR" onclick="eliminar_proyecto('+value.id_proyecto+')">\
                                                        <i class="fa fa-trash fa-lg text-danger"></i>\
                                                    </button>\
                                                \
                                            </div>\
                                        </div>\
                                    </td>\
                                </tr>'
                            );
                            // \.append
                        });
                        // \.each          
                } else {
                    //  MOSTRAR "NO HAY RESULTADOS"
                    document.getElementById("no_hay_resultados").style.display="block";
                }
                // \.if-else
            }
            // \.success
        });
        // \.ajax
    }
    // \.function tabla_proyecto_con_financiamiento

