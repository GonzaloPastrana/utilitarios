$(document).ready(function () {
    $('#id_opcion').change( function() {
    
        var id_opcion= document.getElementById("id_opcion").value;
        //console.log(id_opcion);

        var ruta_destino;
        //  SEGÚN LA OPCION SELECCIONADA, SE REDIRECCIONARÁ A UNA RUTA ESPECÍFICA
        switch (id_opcion) {
            case "1":
                ruta_destino= document.getElementById('ruta_techos').value;
                break;
            case "2":
                break;
            case "3":
                // ruta_destino= document.getElementById('ruta_pisos').value;
                break;
            case "28":
                ruta_destino= document.getElementById('ruta_proyectos').value;
                break;
            default:
                console.log('default');
          }

        //console.log(ruta_destino);
        //  REDIRIGIR A LA RUTA ESTABLECIDA EN EL SWITCH
            location.href= ruta_destino;

    });
    // \.change #id_opcion
});
