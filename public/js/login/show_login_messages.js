
$(document).ready(function() {
    // update_select_localidades();

    //  OnChange - al cambiar una opcion del SELECT de DEPARTAMENTO...  -----------------------------//
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        

        //alert("GONZALO");
        //alert($(this).attr('action'));
        //var codigo_departamento= document.getElementById("codigo_departamento").value;
        //alert("GUATEMALA");
        var usuario= document.querySelector("input[name='usuario']").value;
        var password= document.querySelector("input[name='password']").value;

        //  NO SE INGRESARON CREDENCIALES
        if( usuario=="" || password=="") {
            Swal.fire({
                title:'Por favor, ingresar credenciales',
                icon: 'warning',            //muestra animacion de tilde
                showConfirmButton: false,   //NO muestra boton de confirmar
                timer: 3000,                //tiempo que permanece visible la notificación
                //html: '<p class="sweetalert2-html-actionText">Por favor,<br>ingresar credenciales</p>',
                //La propiedad html reemplaza a las propiedades: title y text
                //Las clases están definidas en el archivo admin/css/admin.css
            });
        } else {    //  SE INGRESARON USUARIO Y CONTRASEÑA
            var usuario= document.querySelector("input[name='usuario']").value;
            var password= document.querySelector("input[name='password']").value;

            $.ajax({
                type: "POST",
                url: $(this).attr('action'),
                data: {
                    usuario_ajax: usuario,
                    password_ajax: password,
                    _token: $('input[name="_token"]').val()
                },
                dataType: "json",
                success: function (response) {
                    // console.log(response['respuesta'][0].existe_usuario);
                    
                    if( response['respuesta'][0].comprobar_password == true) {
                        Swal.fire({
                            title: '¡BIENVENIDO/A!',
                            text:'Acabas de inicar sesión',
                            icon: 'success',            //muestra animacion de tilde
                            showConfirmButton: false,   //NO muestra boton de confirmar
                            timer: 2000,                //tiempo que permanece visible la notificación
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            //html: '<p class="sweetalert2-html-actionText">Acabas de iniciar sesión</p>',
                            //La propiedad html reemplaza a las propiedades: title y text
                            //Las clases están definidas en el archivo admin/css/admin.css
                        });

                        //Redirigir a la vista welcome luego de cierto tiempo
                        setTimeout( function() {
                            window.location.replace('/welcome');    //luego de esta sentencia, NO se puede volver a la pantalla de login con ATRAS
                        }, 2000);// Se esperará cierto tiempo antes de ejecutarse
    
                    } else {
                        Swal.fire({
                            //title: '¡BIENVENIDO!',
                            //text:'Iniciaste sesión con ÉXITO',
                            icon: 'error',            //muestra animacion de tilde
                            showConfirmButton: false,   //NO muestra boton de confirmar
                            timer: 2000,                //tiempo que permanece visible la notificación
                            html: '<p class="sweetalert2-html-errorText">¡ERROR!</p> <p class="sweetalert2-html-actionText">Credenciales inválidas</p>',
                            //La propiedad html reemplaza a las propiedades: title y text
                            //Las clases están definidas en el archivo admin/css/admin.css
                        });
                    }
    
    
                    // $.each(response.respuesta, function (key, value) {
                    //     console.log(value);   //  sentencia para control
                    // });
                    //\.each
                }
                // \.success
            });
            // \.ajax
        }
        // \.if-else
    });
    // \.submit
})
