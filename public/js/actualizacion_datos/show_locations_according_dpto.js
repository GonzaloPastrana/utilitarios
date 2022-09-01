$(document).ready(function() {
    update_select_localidades();

    //  OnChange - al cambiar una opcion del SELECT de DEPARTAMENTO...  -----------------------------//
        $('.select_departamento').change( function() {
            //var codigo_departamento= document.getElementById("codigo_departamento").value;
            update_select_localidades();
        });
        // \.onChange
    // ----------------------------------------------------------------------------------------------//
})

function update_select_localidades() {
    var codigo_departamento= document.getElementById("codigo_departamento").value;

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
};