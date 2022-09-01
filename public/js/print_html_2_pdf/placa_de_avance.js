document.addEventListener("DOMContentLoaded", () => {
    
    //  ------------    SEFGE   ---------------------------------------//
    // Escuchamos el click del botón
    const $boton_sefge = document.querySelector("#btnCrearPdf_sefge");
    $boton_sefge.addEventListener("click", () => {

        const $elementoParaConvertir = document.getElementById('sefge'); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 1,
                filename: 'placa_avance_sefge.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
    //  ------------    \.SEFGE   ---------------------------------------//
    //  ------------    BE   ---------------------------------------//
    // Escuchamos el click del botón
    const $boton_be = document.querySelector("#btnCrearPdf_be");
    $boton_be.addEventListener("click", () => {

        const $elementoParaConvertir = document.getElementById('be'); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 1,
                filename: 'placa_avance_be.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
    //  ------------    \.BE   ---------------------------------------//
    //  ------------    GA   ---------------------------------------//
    // Escuchamos el click del botón
    const $boton_ga = document.querySelector("#btnCrearPdf_ga");
    $boton_ga.addEventListener("click", () => {

        const $elementoParaConvertir = document.getElementById('ga'); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 1,
                filename: 'placa_avance_ga.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 1, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
    //  ------------    \.GA   ---------------------------------------//
});