@include('templates.header')
@include('templates.navigation')

@include('templates.inputs_rutas')


<div class="row">
    <div class="col-md-12">
        <div class="bd-callout bd-callout-pink">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 style="margin:10px;">ACTUALIZACIÓN DE ESTADO DE PROYECTOS</h4>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3 form-inline" style="overflow:hidden;">
                                <label for="exampleFormControlSelect1" class="input-group-text font-weight-bold" style="height:44px;">Otra opción a actualizar</label>
                                <select class="form-control select_opcion" id="id_opcion" style="width:55%;">
                                    <div style="z-index:-1;">
                                    <option value="-1" selected>-</option>
                                        <?php   foreach($opciones as $opcion) {  ?>
                                                    <option class="form-control" value="{{$opcion->id_opcion}}">{{$opcion->descripcion}}</option>
                                        <?php   }                                           ?>
                                    </div>

                                </select>
                            </div>
                            <form method="POST" action="/fetch_localidades" if="form_aux">
                                {{csrf_field()}}
                                <input type="hidden" value="132">
                            </form>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4" style="display:flex; align-items:center;">
                            <div class="input-group mb-3">
                                <span class="input-group-text font-weight-bold">
                                    <div style="width:100%;">CUE/ANEXO</div>
                                </span>
                                <input type="number" class="form-control" value="{{$cue}}{{anexo_to_string($anexo)}}" disabled>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="input-group mb-3">
                                <span class="input-group-text font-weight-bold" style="width:121px;">
                                  <div style="width:100%;">NOMBRE</div>
                                </span>
                                <input type="text" class="form-control" value="{{$nombre_establecimiento}}" disabled style="display: inline-block;">
                            </div>
                        </div>
                    </div>
                    <!-- \.row -->

                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="row">
                                        <!-- <div class="col-md-6"> -->
                                            <h4 style="margin:10px;">ÚLTIMAS ACTUALIZACIONES</h4>
                                        <!-- </div> -->
                                        <!-- <div class="col-md-6">
                                            <input type="button" class="btn-success btn-lg" value="Nuevo Proyecto">
                                        </div> -->
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3 form-inline">
                                        <label for="exampleFormControlSelect1" class="input-group-text font-weight-bold" style="height:44px;">Filtrar</label>
                                        <select class="form-control select_opcion_proyectos" id="codigo_opcion_proyectos" style="width:70%;">
                                            <div style="z-index:-1;">
                                            <!-- <option value="0" selected>-</option>     -->
                                                <!-- <optgroup label=""> -->
                                                    <option class="form-control" value="1">Sin financiamiento</option>
                                                    <option class="form-control" value="2" selected>Con financiamiento</option>
                                                <!-- </optgroup> -->
                                                <!-- <optgroup label=""> -->
                                                    <option class="form-control" value="3">&nbsp&nbspConstrucciones Escolares</option>
                                                    <option class="form-control" value="4">&nbsp&nbspCooperar I,II y III</option>
                                                    <option class="form-control" value="5">&nbsp&nbspCOVID</option>
                                                    <option class="form-control" value="6">&nbsp&nbspInsumos COVID</option>
                                                    <option class="form-control" value="7">&nbsp&nbspFORES I,II y III</option>
                                                    <option class="form-control" value="8">&nbsp&nbspObras Mayores</option>
                                                    <option class="form-control" value="9">&nbsp&nbspINET 2022</option>
                                                    <option class="form-control" value="10">&nbsp&nbspOtros</option>
                                                <!-- </optgroup> -->
                                            </div>

                                        </select>
                                    </div>
                                    <form method="POST" action="/fetch_historial">

                                        <input type="hidden" value="132">
                                    </form>
                                    <input type="hidden" name="_token" id="token" value="{{ csrf_token() }}">
                                </div>
                            </div>
                            <div class="row" style="margin-bottom:15px;">
                                <div class="col-md-6">
                                    <button class="btn btn-primaryaux btn-lg font-weight-bold text-secondary" 
                                            data-toggle="modal" data-target="#exampleModal_crear" 
                                            id="boton_crear_proyecto">  
                                        <i class="fa fa-square-plus"></i>
                                        Nuevo Proyecto
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 d-flex justify-content-center">
                            <div class="row table-responsive">
                                <!-- <div class="col-md-12"> -->
                                    <div class=""><!-- SE PUEDE ELIMINAR -->
                                        <table class="table table-bordered table-triped table-hover" id="tabla_proyectos">
                                            <thead class="table-danger" id="tabla_proyectos_encabezado">
                                                <!-- LLENADO CON AJAX -->
                                            </thead>
                                                <tbody class="tabla_proyectos_cuerpo" id="tabla_proyectos_cuerpo">
                                                <!-- LLENADO CON AJAX -->
                                                </tbody>
                                        </table>
                                    </div><!-- \.SE PUEDE ELIMINAR -->
                                <!-- </div> -->
                            </div>
                        </div>
                        <!-- LOADING-SPINNER -->
                            <div class="col-md-12">
                                <div class="row justify-content-center align-items-center">
                                    <div class="spinner-border text-pink" id="tabla_proyectos_spinner_loading" role="status" style="margin-bottom:0px; display:block;">
                                        <!-- <span class="sr-only"></span> -->
                                    </div>
                                </div>
                            </div>
                        <!-- \.LOADING-SPINNER -->
                        <!-- MENSAJE: NO SE ENCONTRARON RESULTADOS -->
                            <div class="col-md-12">
                                <div class="row justify-content-center align-items-center">
                                    <div id="no_hay_resultados" style="display: none">
                                        <h4>NO SE ENCONTRARON RESULTADOS</h4>
                                    </div>
                                </div>
                            </div>
                        <!-- \.MENSAJE: NO SE ENCONTRARON RESULTADOS -->





                        
<!-- Modal - HISTORIAL-->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="padding-top:50px;">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">HISTORIAL</h5>
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
      </div>
      <div class="modal-body">
        <!-- LOADING-SPINNER -->
            <div class="col-md-12">
                <div class="row justify-content-center align-items-center">
                    <div class="spinner-border text-pink" id="spinner-loading" role="status" style="margin-bottom:0px; display:block;">
                        <!-- <span class="sr-only"></span> -->
                    </div>
                </div>
            </div>
        <!-- \.LOADING-SPINNER -->
        <div class="table-responsive" id="tabla_historial_proyectos" style="display:none;">
            <table class="table table-bordered table-triped table-hover">
                <thead class="table-danger" id="tabla_historial_proyectos_encabezado">
                    <!-- BORRADO Y COMPLETADO CON AJAX -->
                </thead>
                <tbody class="tabla_historial_proyectos_cuerpo" id="tabla_historial_proyectos_cuerpo">


                </tbody>
            </table>
        </div>
      </div>
      <div class="modal-footer">
        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>


<!-- Modal - EDITAR-->
<div class="modal fade" id="exampleModal_editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="padding-top:50px;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">ACTUALIZAR</h5>
                <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <div class="modal-body">
                <!-- LOADING-SPINNER -->
                    <div class="col-md-12">
                        <div class="row justify-content-center align-items-center">
                            <div class="spinner-border text-pink" id="modal_edicion_proyectos_spinner_loading" role="status" style="margin-bottom:0px; display:none;">
                                <!-- <span class="sr-only"></span> -->
                            </div>
                        </div>
                    </div>
                <!-- \.LOADING-SPINNER -->
                <!-- CUERPO -->
                    <div class="row">
                        <!-- <form class="col-md-12" action="/establecimientos/proyectos/actualizar" method="POST" id="formulario_edicion_proyectos">
                            
                        </form> -->
                        <div class="col-md-12" id="formulario_edicion_proyectos">
                            <!-- <input type="text" class="form-control" value="Cooperar I"> -->
                        </div>

                    </div>
                    <!-- \.row -->
                <!-- \.CUERPO -->
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
        </div>
    </div>
</div>
<!-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

<!-- Modal - CREAR NUEVO PROYECTO-->
<div class="modal fade" id="exampleModal_crear" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="padding-top:50px;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Crear nuevo Proyecto</h5>
                <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <div class="modal-body">
                <!-- LOADING-SPINNER -->
                    <div class="col-md-12">
                        <div class="row justify-content-center align-items-center">
                            <div class="spinner-border text-pink" id="modal_creacion_proyectos_spinner_loading" role="status" style="margin-bottom:0px; display:none;">
                                <!-- <span class="sr-only"></span> -->
                            </div>
                        </div>
                    </div>
                <!-- \.LOADING-SPINNER -->
                <!-- CUERPO -->
                    <div class="row">
                        <!-- <form class="col-md-12" action="/establecimientos/proyectos/actualizar" method="POST" id="formulario_edicion_proyectos">
                            
                        </form> -->
                        <div class="col-md-12" id="formulario_creacion_proyectos">
                            <!-- <input type="text" class="form-control" value="Cooperar I"> -->
                            <div class="col-md-12" style="display:flex; align-items:center;">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold">
                                        <div style="width:100%;">Financiamiento</div>
                                    </span>
                                    <select class="form-control crear_proyecto_tipo_financiamiento" name="id_tipo_financiamiento" id="crear_proyecto_tipo_financiamiento">
                                        <div>
                                                <option class="form-control" value="-1">-</option>
                                            <?php   foreach($tipos_financiamiento as $tipo_financiamiento) {  ?>
                                                <option class="form-control" value="{{$tipo_financiamiento->id_tipo_financiamiento}}">{{$tipo_financiamiento->nombre_tipo_financiamiento}}</option>
                                            <?php   }                                                 ?>
                                        </div>
                                    </select>
                                </div>
                            </div>
                
                            <div class="col-md-12">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold" style="width:121px;">
                                        <div style="width:100%;">Descripción</div>
                                    </span>
                                        <input type="text" name="descripcion_proyecto" class="form-control" value="" style="display: inline-block;">
                                </div>
                            </div>
                            <div class="col-md-6"  id="campo_estado_proyecto" style="display:none;">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold" style="width:121px;">
                                        <div style="width:100%;">Estado</div>
                                    </span>
                                    <select class="form-control select_tipo_estado_proyecto" name="id_tipo_estado_proyecto" id="input_estado_proyecto" style="width:70%;">
                                        <div>
                                                <option class="form-control" value="">-</option>
                                            <?php   foreach($estados_proyecto as $estado_proyecto) {  ?>
                                                <option class="form-control" value="{{$estado_proyecto->id_tipo_estado_proyecto}}">{{$estado_proyecto->tipo_estado_proyecto}}</option>
                                            <?php   }                                                 ?>
                                        </div>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12" id="campo_porcentaje_de_avance" style="display:none;">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold">
                                    <div style="width:100%;">Porcentaje de avance</div>
                                    </span>
                                    <div class="input_editar_proyecto_porcentaje">
                                        <input type="number" name="porcentaje_avance" id="input_porcentaje_de_avance" step="0.01" max="100.00" class="form-control" value="" style="display: inline-block; padding-left:25px;">
                                        <span class="signo_porcentual">%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6" id="campo_fecha_finalizacion" style="display:none;">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold">
                                        <div style="width:100%;">Fecha de finalización</div>
                                    </span>
                                    <input type="date" name="fecha_finalizacion" id="input_fecha_finalizacion" class="form-control" style="display: inline-block;" value="">
                                </div>
                            </div>
                            <div class="col-md-12" id="campo_motivo_no_ejecucion" style="display:none;">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold">
                                        <div style="width:100%;">Motivo de no ejecución</div>
                                    </span>
                                        <input type="text" name="motivo_no_ejecucion" id="input_motivo_no_ejecucion" class="form-control" value="" style="display: inline-block;">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold" style="width:121px;">
                                    <div style="width:100%;">Monto</div>
                                    </span>
                                    <div class="input_editar_proyecto_monto">
                                        <input type="number" name="monto_estimado_proyecto" step="0.01" max="9999999999.99" class="form-control" value="" style="display: inline-block; padding-left:25px;">
                                        <span class="signo_peso">$</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold" style="width:121px;">
                                        <div style="width:100%;">Fecha</div>
                                    </span>
                                    <input type="date" name="fecha_proyecto" class="form-control" style="display: inline-block;">
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold">
                                        <div style="width:100%;">Quién hace la carga</div>
                                    </span>
                                    <input type="text" name="quien_carga_proyecto" class="form-control" style="display: inline-block;">
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <div class="input-group mb-3">
                                    <span class="input-group-text font-weight-bold" style="width:184px;">
                                        <div style="width:100%;">Observaciones</div>
                                    </span>
                                        <input type="text" name="observacion_proyecto" class="form-control" value="" style="display: inline-block;">
                                </div>
                            </div>
                            
                            <div class="col-md-12 text-right">
                                <button class="btn btn-lg btn-pink" id="boton_formulario_crear_proyecto" onclick="crear_proyecto()">Guardar</button>
                            </div>
                        </div>

                    </div>
                    <!-- \.row -->
                <!-- \.CUERPO -->
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
        </div>
    </div>
</div>
<!-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
                    </div>

                </div>
                <!-- \.row col-md-6 -->
            </div>
            <!-- \.row -->
        </div>
        <!-- \.bd-callout bd-callout-pink -->


    </div>
</div>




<!-- ////////////////////////   AJAX    ////////////////////////   -->
<!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script> -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<!-- ////////////////////////   \.AJAX  ////////////////////////   -->

<script>
    $(document).ready(function () {
        $('#example').DataTable();
    });

    /*
    $(document).ready(function () {
        $('#tabla_proyectos').DataTable({
            "lengthChange": false,      //  cuadro de busqueda-filtrado
            "sScrollX": false,
            //"searching": false
            language: {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Entradas",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            "ordering": true,               // Allows ordering
            //"searching": true,              // Searchbox
            "paging": false,                 // Pagination false->muestra todas las filas, true->muestra segun pageLenght
            "info": false,                  // Shows 'Showing X of X' information
            "pagingType": 'simple_numbers', // Shows Previous, page numbers & next buttons only
            "pageLength": 10,               // Defaults number of rows to display in table
            "columnDefs": [
                {
                    "targets": 'dialPlanButtons',
                    "searchable": false,    // Stops search in the fields
                    "sorting": false,       // Stops sorting
                    "orderable": false      // Stops ordering
                }
            ],
            "dom": '<"top"f>rt<"bottom"lp><"clear">', // Positions table elements
            //"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, 'All']], // Sets up the amount of records to display

            "language": {
                //"search": "_INPUT_",            // Removes the 'Search' field label
                "search": "",
                "zeroRecords": "NO SE ENCONTRARON RESULTADOS",
                //"searchPlaceholder": "Search"   // Placeholder for the search box
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            "search": {
                //"addClass": 'form-control input-lg col-xs-12'
            },
            "fnDrawCallback":function(){
                $("input[type='search']").attr("id", "searchBox");
                $('#dialPlanListTable').css('cssText', "margin-top: 0px !important;");
                $("select[name='dialPlanListTable_length'], #searchBox").removeClass("input-sm");
                $("select[name='dialPlanListTable_length'], #searchBox").addClass("alinear");
                $('#searchBox').css("width", "300px").focus();
                $('#searchBox').css("margin-left", "0px");
                $('#searchBox').css("margin-bottom", "8px");
                $('#dialPlanListTable_filter').removeClass('dataTables_filter');
            }
        });


        //  DETALLES
            //  PARA OBSERVAR EL ELEMENTO QUE CONTENDRA EL CAMPO INPUT Buscar
                var input_search= document.getElementById("tabla_proyectos_filter").firstChild;
                //console.log(input_search);
            //  CREACION DE ELEMENTO LABEL - CONFIGURAR ELEMENTO CREADO
                var label = document.createElement("label");
                label.innerHTML="<label for='exampleFormControlSelect1' class='input-group-text font-weight-bold alinear' style='height:44px; padding:1px 15px;'>BUSCAR</label>";

            //  SELECCIONAR CAMPO INPUT
                var input= document.getElementById("searchBox");
            //  UBICAR ELEMENTO LABEL DELANTE DEL CAMPO INPUT SELECCIONADO
                input_search.insertBefore(label,input);

            //  ENCERRAR ELEMENTOS DE CLASE alinear EN UN DIV
                $( ".alinear" ).wrapAll( "<div class='row buscar_search'/>");
            //  ENCERRAR ELEMENTO DE CLASE top EN UN DIV
                $( ".top" ).wrapAll( "<div class='col-md-12'/>");

            //  SE ELIMINA UN CAMPO INPUT QUE SE CREABA AUTOMATICAMENTE (NO INTENCIONAL)
                //var buscar_search= document.querySelector(".buscar_search");
                //buscar_search.removeChild(buscar_search.lastChild)
    });
    */
</script>




<script>

</script>

<script src="/js/opciones/redirect_to_options.js"></script>

<!-- <script src="/js/opciones/proyectos/mostrar_proyectos.js"></script> -->
<script src="/js/opciones/proyectos/mostrar_proyectos_test.js"></script>
<!-- <script src="/js/opciones/proyectos/mostrar_proyectos_test.js"></script> -->
<!-- <script src="/js/opciones/proyectos/historial_proyectos.js"></script> -->
<script src="/js/opciones/proyectos/historial_proyectos_test.js"></script>

<script src="/js/opciones/proyectos/actualizar_proyectos.js"></script>
@include('templates.footer')