@include('templates.header')
@include('templates.navigation')

<!-- AREA DE TRABAJO -->


          <h3 style="margin: 10px 0px">Avance de carga</h3>
          <!-- VALORES OCULTOS -->
              <input type="hidden" value="100" id="valor_1">
              <input type="hidden" value="20" id="valor_2">
              <input type="hidden" value="130" id="valor_11">
              <input type="hidden" value="70" id="valor_22">
          <!-- \.VALORES OCULTOS -->

<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
          <!-- CALLOUT_SEFGE-->
          <div class="bd-callout bd-callout-pink">
            <!-- CAPTURA A IMPRIMIR-->
            <div id="sefge" class="placa_avance_seccion">
                <h4>Secretaría y Subsecretaría de Estado de Fortalecimiento a la Gestión Escolar<br>Relevamiento de Infraestructura</h4>
                <div class="chartCard">
                    <div class="chartBox">
                        <h1>TOTAL: 200 <br>Técnicos Territoriales</h1>
                    </div>    <!-- chartBox -->

                    <div class="chartBox">
                        <canvas id="myChart1"></canvas><br>
                        <h1>130 registros</h1>
                        <p> Cantidad de equipos técnicos 
                            territoriales que ingresaron al 
                            Sistema para registrar su usuario y contraseña.
                        </p><br>
                    </div>    <!-- chartBox -->

                    <div class="chartBox">
                        <canvas id="myChart2"></canvas><br>
                        <h1>70 registros</h1>
                        <p> Cantidad de equipos técnicos 
                            territoriales que relevaron 
                            información sobre el estado de 
                            infraestructura, servicios, 
                            seguridad e higiene escolar.
                        </p>
                    </div>    <!-- chartBox -->
                </div>    <!-- chartCard -->
            </div>      <!-- id="sefge" -->
            <!-- \. CAPTURA A IMPRIMIR-->

            <!-- BOTON - DESCARGAR PDF -->
            <div class="chartBox d-flex justify-content-center">
                <div style="padding-top: 10px;">
                    <button id="btnCrearPdf" class="btn btn-danger " style="font-weight: 700;">DESCARGAR PDF
                        <img src="images/icono_pdf.png" height="15" title="Haga clic aqui para descargar">
                    </button>
                </div>
            </div>
            <!-- \. BOTON - DESCARGAR PDF -->
          </div>    <!-- \. CALLOUT_SEFGE-->
        
<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
          <!-- CALLOUT_SEFGE-->
          <div class="bd-callout bd-callout-pink">
            <!-- CAPTURA A IMPRIMIR-->
            <div id="sefge" class="placa_avance_seccion">
                <h4>Secretaría y Subsecretaría de Bienestar Educativo<br>Relevamiento de Infraestructura</h4>
                <div class="chartCard">
                    <div class="chartBox">
                        <h1>TOTAL: 200 <br>Técnicos Territoriales</h1>
                    </div>    <!-- chartBox -->

                    <div class="chartBox">
                        <canvas id="myChart1"></canvas><br>
                        <h1>130 registros</h1>
                        <p> Cantidad de equipos técnicos 
                            territoriales que ingresaron al 
                            Sistema para registrar su usuario y contraseña.
                        </p><br>
                    </div>    <!-- chartBox -->

                    <div class="chartBox">
                        <canvas id="myChart2"></canvas><br>
                        <h1>70 registros</h1>
                        <p> Cantidad de equipos técnicos 
                            territoriales que relevaron 
                            información sobre el estado de 
                            infraestructura, servicios, 
                            seguridad e higiene escolar.
                        </p>
                    </div>    <!-- chartBox -->
                </div>    <!-- chartCard -->
            </div>      <!-- id="sefge" -->
            <!-- \. CAPTURA A IMPRIMIR-->

            <!-- BOTON - DESCARGAR PDF -->
            <div class="chartBox d-flex justify-content-center">
                <div style="padding-top: 10px;">
                    <button id="btnCrearPdf" class="btn btn-danger " style="font-weight: 700;">DESCARGAR PDF
                        <img src="images/icono_pdf.png" height="15" title="Haga clic aqui para descargar">
                    </button>
                </div>
            <!-- \. BOTON - DESCARGAR PDF -->
          </div>    <!-- \. CALLOUT_SEFGE-->


<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->



<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->



<!-- \.AREA DE TRABAJO -->

@include('templates.footer')


