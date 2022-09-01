@include('templates.header')
@include('templates.navigation')

@include('templates.inputs_rutas')


<!-- links para exportar a excel -->
<!-- <script src="https://unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js"></script>
<script src="https://unpkg.com/file-saverjs@latest/FileSaver.min.js"></script>
<script src="https://unpkg.com/tableexport@latest/dist/js/tableexport.min.js"></script> -->


<!-- <button id="btnExportar" class="btn btn-success">
    <i class="fas fa-file-excel"></i> Exportar datos a Excel
</button> -->


<div class="row">
    <div class="col-md-12">
        <div class="bd-callout bd-callout-pink">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 style="margin:10px;">PROYECTOS</h4>
                        </div>
                        <div class="col-md-6">
                            <form method="POST" action="/fetch_localidades" if="form_aux">
                                {{csrf_field()}}
                                <input type="hidden" value="132">
                            </form>
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
                                
                            </div>
                            
                        </div>

                        <?php
                        //ini_set('max_execution_time', 600);
                        //ini_set('memory_limit', '1024M');
                        ?>

                        <div class="col-md-12 d-flex justify-content-center">
                            <div class="row table-responsive">
                                <!-- <div class="col-md-12"> -->
                                    <div class=""><!-- SE PUEDE ELIMINAR -->
                                        <table class="display table table-bordered table-triped table-hover" id="tabla_proyectos">
                                            <thead class="table-danger">
                                                <tr>
                                                    <th>CUE/ANEXO</th>
                                                    <!-- Construcciones Escolares -->
                                                        <th>Financiamiento CE</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    
                                                        <!-- COOPERAR I -->
                                                        <th>Financiamiento COOP I</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento COOP II</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento COVID</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento FORES I</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento FORES II</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento OBRAS MAYORES</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento PATIO CUBIERTO</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento APRESTAMIENTO</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento INSUMOS</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento DESMALEZAMIENTO</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento REP Y AC PROV</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento SERV DE PINTURA</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento LIMPIEZA</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento EQUIPAMIENTO</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento SANITARIOS</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento BIOSEGURIDAD</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento MAT DE PINTURA</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento COOP III</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento FORES III</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento INSUMOS COVID</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                    <!-- COOPERAR II -->
                                                        <th>Financiamiento INET 2022</th>
                                                        <th>Descripcion (lo que se quiere hacer)</th>
                                                        <th>Estado</th>
                                                        <th>Monto</th>
                                                        <th>Fecha del relevamiento</th>
                                                        <th>Quien hizo el relevamiento</th>
                                                </tr>
                                            </thead>
                                                <tbody class="tabla_proyectos_cuerpo">
                                                <!-- LLENADO CON AJAX -->
                                                    <?php   $primera_iteracion= 1;  
                                                            $cueanexo_actual='-123456'; //  cue+anexo ALEATORIO NO-EXISTENTE    
                                                            $id_financiamiento_tabla= 1;   ?>
                                                            
                                                        <tr>
                                                    <?php   foreach($proyectos as $proyecto) {
                                                        //echo $proyecto->cue.anexo_to_string($proyecto->anexo);
                                                        //echo $cueanexo_actual;
                                                        //echo $proyecto->id_tipo_financiamiento;

                                                        if( $cueanexo_actual== $proyecto->cue.anexo_to_string($proyecto->anexo) ) {
                                                            //echo "OK";
                                                            //  SE ESTA EN EL MISMO CUE+ANEXO
                                                            //echo("iguales");
                                                            //$i=$i+1;echo $i;
                                                            //  EVALUAR y RELLENAR/COMPLETAR
                                                            if($id_financiamiento_tabla < $proyecto->id_tipo_financiamiento) {
                                                                //echo "relleno menor";
                                                                while($id_financiamiento_tabla < $proyecto->id_tipo_financiamiento) {     ?>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <?php   $id_financiamiento_tabla= $id_financiamiento_tabla+ 1;
                                                                }                ?>

                                                                    <td>{{$proyecto->nombre_tipo_financiamiento}}</td>
                                                                    <td>{{$proyecto->descripcion_proyecto}}</td>
                                                                    <td>{{$proyecto->tipo_estado_proyecto}}</td>
                                                                    <td>{{$proyecto->monto_estimado_proyecto}}</td>
                                                                    <td>{{$proyecto->fecha_proyecto}}</td>
                                                                    <td>{{$proyecto->quien_carga_proyecto}}</td>
                                                                <?php $id_financiamiento_tabla= $id_financiamiento_tabla+ 1;
                                                                    
                                                            } else {

                                                                if($id_financiamiento_tabla==$proyecto->id_tipo_financiamiento) {   ?>
                                                                    <td>{{$proyecto->nombre_tipo_financiamiento}}</td>
                                                                    <td>{{$proyecto->descripcion_proyecto}}</td>
                                                                    <td>{{$proyecto->tipo_estado_proyecto}}</td>
                                                                    <td>{{$proyecto->monto_estimado_proyecto}}</td>
                                                                    <td>{{$proyecto->fecha_proyecto}}</td>
                                                                    <td>{{$proyecto->quien_carga_proyecto}}</td>
                                                                    <?php $id_financiamiento_tabla= $id_financiamiento_tabla+ 1;
                                                                }
                                                            }

                                                        } else {
                                                            //echo "<br>NUEVO RENGLONAZO<br>";
                                                            //  SE CAMBIO DE CUE+ANEXO
                                                                //  RELLENAR SI ES NECESARIO
                                                                    if($primera_iteracion==1) {
                                                                        //  NO hacer nada
                                                                        //$primera_iteracion=0;   ?>
                                                                        <!-- <tr> -->
                                                                        <?php
                                                                    } else {
                                                                        if($id_financiamiento_tabla<=22) {
                                                                            while($id_financiamiento_tabla<=22) {    ?>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <?php   $id_financiamiento_tabla= $id_financiamiento_tabla+ 1;  
                                                                            }
                                                                        }
                                                                        
                                                                    }


                                                            //echo ("DISTINTOS");
                                                            //  ACTUALIZAR CUE+ANEXO ACTUAL
                                                            $cueanexo_actual= $proyecto->cue.anexo_to_string($proyecto->anexo);
                                                            $id_financiamiento_tabla= 1;
                                                            //echo $id_financiamiento_tabla;
                                                            ?>

                                                        <?php   if($primera_iteracion==1) {
                                                                    $primera_iteracion=0;
                                                                } else { ?>
                                                                    </tr>
                                                                    <tr>
                                                        <?php   }   ?>

                                                            
                                                                <td>{{$proyecto->cue}}{{anexo_to_string($proyecto->anexo)}}</td>
                                                            <?php
                                                            //  EVALUAR Y RELLENAR/COMPLETAR
                                                            if($id_financiamiento_tabla < $proyecto->id_tipo_financiamiento) {
                                                                while($id_financiamiento_tabla < $proyecto->id_tipo_financiamiento) {     ?>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <?php   $id_financiamiento_tabla= $id_financiamiento_tabla+ 1;
                                                                }   ?>

                                                                    <td>{{$proyecto->nombre_tipo_financiamiento}}</td>
                                                                    <td>{{$proyecto->descripcion_proyecto}}</td>
                                                                    <td>{{$proyecto->tipo_estado_proyecto}}</td>
                                                                    <td>{{$proyecto->monto_estimado_proyecto}}</td>
                                                                    <td>{{$proyecto->fecha_proyecto}}</td>
                                                                    <td>{{$proyecto->quien_carga_proyecto}}</td>
                                                                <?php $id_financiamiento_tabla= $id_financiamiento_tabla+ 1;
                                                            } else {
                                                                if($id_financiamiento_tabla==$proyecto->id_tipo_financiamiento) {   ?>
                                                                    <td>{{$proyecto->nombre_tipo_financiamiento}}</td>
                                                                    <td>{{$proyecto->descripcion_proyecto}}</td>
                                                                    <td>{{$proyecto->tipo_estado_proyecto}}</td>
                                                                    <td>{{$proyecto->monto_estimado_proyecto}}</td>
                                                                    <td>{{$proyecto->fecha_proyecto}}</td>
                                                                    <td>{{$proyecto->quien_carga_proyecto}}</td>
                                                                    <?php $id_financiamiento_tabla= $id_financiamiento_tabla+ 1;
                                                                }
                                                            }    
                                                        }   //  if-else QUE COMPARA CUE+ANEXO´s   ?>



                                                    <?php   }   //  foreach                                           ?>

                                                    <?php
                                                        while($id_financiamiento_tabla<=22) {    ?>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                            <?php   $id_financiamiento_tabla= $id_financiamiento_tabla+ 1;  
                                                        }                                       ?>
                                                    </tr>
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
<!-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->


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


<script src="https://cdn.jsdelivr.net/npm/table2excel@1.0.4/dist/table2excel.min.js"></script>

<script>
// $(document).ready(function() {
    
// $("#exportarExcel").click(function(){
//   $("#tabla_proyectos").table2excel({
//     // exclude CSS class
//     exclude:".noExl",
//     name:"Worksheet Name",
//     filename:"SomeFile",//do not include extension
//     fileext:".xls" // file extension
//   });
// });
// };
</script>






<script>
    $(document).ready(function() {
        $('#tabla_proyectos').DataTable( {
            dom: 'Bfrtip',
            buttons:[ 
                {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i> ',
                    titleAttr: 'Exportar a Excel',
                    className: 'btn btn-success'
                },
                {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i> ',
                    titleAttr: 'Exportar a PDF',
                    className: 'btn btn-danger'
                }
            ]	        
        } );
    } );
</script>



// <script>
//     const $btnExportar = document.querySelector("#btnExportar"),
//         $tabla = document.querySelector("#tabla_proyectos");

//     $btnExportar.addEventListener("click", function() {
//         let tableExport = new TableExport($tabla, {
//             exportButtons: false, // No queremos botones
//             filename: "Reporte de prueba", //Nombre del archivo de Excel
//             sheetname: "Reporte de prueba", //Título de la hoja
//         });
//         let datos = tableExport.getExportData();
//         let preferenciasDocumento = datos.tabla.xlsx;
//         tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
//     });
// </script>

// <script>
// $('#btnDescargar').on('click', function requestDescargar() {
//     alert("hoal");
//     var tableToExcel = (function() {
//   var uri = 'data:application/vnd.ms-excel;base64,'
//     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
//     , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
//     , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
//   return function(table, name) {
//     if (!table.nodeType) table = document.getElementById(table)
//     var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
//     window.location.href = uri + base64(format(template, ctx))
//   }
// })()
// });
// </script>





<script src="/js/opciones/redirect_to_options.js"></script>

<script src="/js/opciones/proyectos/mostrar_proyectos_actualizados.js"></script>

@include('templates.footer')