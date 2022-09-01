@include('templates.header')
@include('templates.navigation')

<!-- AREA DE TRABAJO -->


          <!-- <h3 style="margin: 10px 0px">Avance de carga</h3> -->
          <!-- VALORES OCULTOS -->
              <input type="hidden" value="100" id="valor_1">
              <input type="hidden" value="20" id="valor_2">
              <input type="hidden" value="130" id="valor_11">
              <input type="hidden" value="70" id="valor_22">
          <!-- \.VALORES OCULTOS -->

<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

<div class="row">
    <div class="col-md-12">
        <div class="bd-callout bd-callout-pink">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4" style="display:flex; align-items:center;">
                            <div class="input-group mb-3">
                                <span class="input-group-text font-weight-bold" style="width:83px;">
                                    <div style="width:100%;">CUE</div>
                                </span>    
                                <input type="number" class="form-control" id="input_buscar_cue">
                                
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="input-group mb-3">
                                <span class="input-group-text font-weight-bold">ANEXO</span>    
                                <input type="text" class="form-control" id="input_buscar_anexo" value="00">
                                
                            </div>
                        </div>
                        
                        <div class="col-md-4 d-flex align-items-center mb-3">
                            <button type="button" class="btn btn-medium btn-pink" id="boton_buscar_xcueanexo">BUSCAR</button>
                        </div>
                    </div>
                    <!-- \.row -->
                </div>
                <!-- \.row col-md-6 -->
            
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-8" style="display:flex; align-items:center;">
                            <div class="input-group mb-3">
                                <span class="input-group-text font-weight-bold" id="basic-addon2">NOMBRE</span>    
                                <input type="text" class="form-control" id="input_buscar_nombre">
                            </div>
                        </div>
                        
                        <div class="col-md-4 d-flex align-items-center mb-3">
                            <button type="button" class="btn btn-medium btn-pink" id="boton_buscar_xnombre">BUSCAR</button>
                        </div>
                    </div>
                </div>
                <!-- \.row col-md-6 -->
            </div>
            <!-- \.row -->
        </div>
        <!-- \.bd-callout bd-callout-pink -->


        <div class="bd-callout bd-callout-pink">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        
                        <div class="col-md-12" style="display:flex; align-items:center;">
                            <div class="form-group mb-3 form-inline">
                                <label for="exampleFormControlSelect1" class="input-group-text font-weight-bold" style="height:44px;">DEPARTAMENTO</label>
                                <select class="form-control select_departamento" id="codigo_departamento">
                                    <option value="-1" selected>-</option>    
                                        <?php   foreach($departamentos as $departamento) {  ?>
                                                    <option class="form-control" value="{{$departamento->codigo_departamento}}">{{$departamento->nombre_departamento}}</option>
                                        <?php   }                                           ?>
                                </select>
                            </div>
                            <form method="POST" action="/fetch_localidades" if="form_aux">
                                {{csrf_field()}}
                                <input type="hidden" value="132">
                            </form>
                        </div>

                        <div class="col-md-12" style="display:flex; align-items:center;">
                            <div class="form-group mb-3 form-inline">
                                <label  for="exampleFormControlSelect1" 
                                        class="input-group-text font-weight-bold" 
                                        style="height:44px;width:158px;">LOCALIDAD</label>
                                <select class="form-control select_localidades_updated" id="codigo_localidad">
                                    <!-- OPCIONES generadas con AJAX -->
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-md-12 d-flex align-items-center mb-3">
                            <button type="button" class="btn btn-medium btn-pink" id="boton_buscar_depyloc">BUSCAR</button>
                        </div>
                    </div>
                    <!-- \.row -->
                </div>
                <!-- \.row col-md-6 -->
            </div>
            <!-- \.row -->

            <!-- FILTRAR POR NOMBRE -->
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-10">
                            <div class="input-group mb-3">
                                <span class="input-group-text font-weight-bold" id="basic-addon2">FILTRAR POR NOMBRE</span>    
                                <input type="text" class="form-control" id="cadena_filtrado_nombre">
                                
                            </div>
                        </div>
                        
                        <div class="col-md-2 d-flex align-items-center mb-3">
                            <button type="button" class="btn btn-medium btn-pink" id="boton_filtrar_depyloc">FILTRAR</button>
                        </div>
                        
                        <!-- GUARDA LA RUTA A LA CUAL REDIRIGIR -->
                        <input type="hidden" id="ruta_techos" value="{{route('establecimientos.techos')}}">

                    </div>
                    <!-- \.row -->
                </div>
                <!-- \.row col-md-6 -->
            </div>
            <!-- \.row -->
        </div>
        <!-- \.bd-callout bd-callout-pink -->
    </div>
</div>


<!-- TABLA - SPINNER - MENSAJE:NO HAY RESULTADOS -> DINAMINCOS con AJAX -->
    <div class="card-body" style="padding:0px;">
        <div class="table-responsive">
            <table class="table table-bordered table-triped table-hover">
                <thead class="table-danger" id="tabla_establecimientos_encabezado">
                    <!-- BORRADO Y COMPLETADO CON Js+Ajax -->
                </thead>
                <tbody class="tabla_establecimientos" id="tabla_establecimientos">
                    <!-- BORRADO Y COMPLETADO CON Js+Ajax -->
                </tbody>
            </table>
        </div>
        <!-- \.table-responsive -->
        
        <!-- LOADING-SPINNER -->
        <div class="col-md-12">
            <div class="row justify-content-center align-items-center">
                <div class="spinner-border text-pink" id="spinner-loading" role="status" style="margin-bottom:20px; display:none;">
                    <!-- <span class="sr-only"></span> -->
                </div>
            </div>
        </div>
        <!-- \.LOADING-SPINNER -->

        <!-- MENSAJE: NO SE ENCONTRARON RESULTADOS -->
        <div class="col-md-12">
            <div class="row justify-content-center align-items-center">
                <div id="no_hay_resultados" style="margin-bottom:20px; display: none">
                    <h4>NO SE ENCONTRARON RESULTADOS</h4>
                </div>
            </div>
        </div>
        <!-- \.MENSAJE: NO SE ENCONTRARON RESULTADOS -->
    </div>
    <!-- \.card-body -->
<!-- \.TABLA - SPINNER - MENSAJE:NO HAY RESULTADOS -> DINAMINCOS con AJAX -->


<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

<!-- ////////////////////////   AJAX    ////////////////////////   -->
<!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script> -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<!-- ////////////////////////   \.AJAX  ////////////////////////   -->

<!-- SCRIPT´s -->
    <!-- Genera el SELECT de LOCALIDADES según el DEPARTAMENTO seleccionado -->
        <script src="js/actualizacion_datos/show_locations_according_dpto.js"></script>
    <!-- Genera la TABLE de establecimientos según el DEPARTAMENTO y la LOCALIDAD seleccionada -->
        <script src="js/actualizacion_datos/show_stablishments_according_location_dpto.js"></script>

<!-- \.AREA DE TRABAJO -->


@include('templates.footer')



