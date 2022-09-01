@include('templates.header')
@include('templates.navigation')

<!-- LOGIN -->
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card" style="z-index: 1;">
        <div class="card-header d-flex justify-content-center" style="margin-top: 20px; padding: 5px 20px; border: none;">
          <h3 style="margin: 0;">LOGIN</h3>
          
        </div>
        <div class="card-body" style="margin-bottom: 0px; padding: 5px 20px; border: none;">
          <form method="POST" action="{{route('login')}}" id="form_login">
          {{csrf_field()}}
            <div class="input-group form-group">
                <div class="input-group-prepend">
                    <span class="input-group-text d-flex justify-content-center"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" 
                        name="usuario" placeholder="Usuario" 
                        autocomplete="off">
            </div>
            <div class="input-group form-group">
                <div class="input-group-prepend">
                    <span class="input-group-text d-flex justify-content-center"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" class="form-control" 
                        name="password" placeholder="Contraseña" 
                        autocomplete="off">
            </div>
            
            <div class="form-group d-flex justify-content-center">
                <input  type="submit" value="INGRESAR" 
                        class="btn btn-lg login_btn btn-block" id="btn_login_ingresar">
            </div>
          </form>
        </div>
        <div class="card-footer" style="margin-top: 0; border: none;">
          <div class="d-flex justify-content-center" style="color: #000;">
            <p align="center" style="margin: 0px; padding: 0px 20px;">Si es su primera vez o no conoce su contraseña haga 
              <a href="#" class="click_aca">click acá</a> 
              o en su defecto, por favor contáctese con el Depto. de Estadistica Educativa
              <b>(estadisticatuc@gmail.com)</b></p>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- \.LOGIN -->

<div style="position: fixed;bottom: 0;width: 100%; padding-bottom: 15px;">   
    <!-- Fondo de pantalla oscurecido -->
        <div class="fondo_oscuro_modal" id="mensaje"></div>
</div>

<!-- ////////////////////////   AJAX    ////////////////////////   -->
<!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script> -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<!-- ////////////////////////   \.AJAX  ////////////////////////   -->
<script src="/js/login/show_login_messages.js"></script>

@include('templates.footer')