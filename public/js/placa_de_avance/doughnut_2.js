document.addEventListener('DOMContentLoaded', function() {

    const value1= document.getElementById('valor_2').value;

    //  Setup Block
    const datapoints1= [100-value1, value1];
    
    const background_colors2=   [  'rgba(135, 135, 135, 0.2)',
                                    'rgba(9, 190, 0, 0.2)'
                                ];
    
    const border_colors2=   [  'rgba(135, 135, 135, 1)',
                                'rgba(9, 190, 0, 1)'
                            ];

    // alert("HOLAAA");

    const data1= {
        labels: ['Faltantes', 'Registrados'],
        datasets: [{
            label: '# of Votes',
            data: datapoints1,
            backgroundColor: background_colors2,
            borderColor: border_colors2,
            borderWidth: 1,
            cutout: '60%', //   espesor de la DONA
            borderRadius: 1
        }]
    };
    
    
    //  Counter Plugin Block
    const counter1={
        id: 'counter',
        beforeDraw(chart, args, options) {
            const{ ctx, chartArea:{ top, right, bottom, left, width, height}} = chart;
            ctx.save();
    
            //  Ubicar el centro del grafico
            //ctx.fillStyle= 'blue';
            //ctx.fillRect( width/2, top+(height/2), 10, 10 )
                //  x0= punto de partida en el nivel horizontal izq/der
                //  y0= punto de partida en el nivel vertical arriba/abajo
                //  x1= longitud del objeto en pixeles del nivel horizontal
                //  y1= longitud del objeto en pixeles del nivel vertical
    
            //  Texto dinamico
            ctx.font= options.fontSize+'px '+options.fontFamily;
            ctx.textAlign='center';
            ctx.fillStyle= options.fontColor;  //'blue'
            ctx.fillText( datapoints1[1]+'%', width/2, (height/2)+(options.fontSize*0.34) );
    
        }
    };
    
    
    //  Config Block
    const config1={
        type: 'doughnut',
        data: data1, //data,
        options: {
            responsive: false,
            plugins:{
                legend:{
                    display: false
                },
                tooltip: {
                    //enabled:false
                },
                counter: {                          //counter ES IGUAL PARA TODOS
                    fontColor: border_colors2[1], 
                    fontSize: '50',
                    fontFamily: 'sans-serif'
                }
            }
            /*scales: {
                y: {
                    beginAtZero: true
                }
            }*/
        }, 
        plugins:[counter1]      //  counterX 
    };
    
    
    
    //  Render Init Block
    const myChart2=new Chart(document.getElementById('myChart2'), 
                            config1);
    
    /*
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    });
    */
    
    
    });//cuando se cargan los archivos .html, .css y .js