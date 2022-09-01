@include('templates.header')
@include('templates.navigation')

<!-- CUADRO DE MENSAJE -->
  <div class="container d-flex justify-content-center align-items-center" style="height:200px;">
      <div class="row justify-content-center align-items-center">
            <h4 style="margin:10px;">SECCION TECHOS</h4>
      </div>
  </div>
<!-- \.CUADRO DE MENSAJE -->


<!-- ////////////////////////   AJAX    ////////////////////////   -->
<!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script> -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<!-- ////////////////////////   \.AJAX  ////////////////////////   -->
<script src="js/login/show_login_messages.js"></script>

@include('templates.footer')