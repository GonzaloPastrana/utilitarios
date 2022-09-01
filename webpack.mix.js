let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');


//  COMPILACION: CSS y JS
mix.styles([
   'resources/assets/plugins/bootstrap/bootstrap.min.css',
   'resources/assets/plugins/fontawesome/css/all.min.css',
   /*'resources/css/fontawesome.releases.v5.0.1.css.all.css',        */
   'resources/assets/plugins/animate-css/animate.css',
   'resources/assets/plugins/slick/slick.css',
   'resources/assets/plugins/slick/slick-theme.css',
   'resources/assets/plugins/colorbox/colorbox.css',
   'resources/assets/css/style.css',
   'resources/assets/css/gap_style.css',
   'resources/assets/css/callouts_style.css',
   'resources/assets/plugins/datatables/datatables.min.css',
   'resources/assets/plugins/datatables/DataTables-1.12.1/css/datatables.bootstrap4.min.css',
   'resources/assets/plugins/sweetalert2/sweetalert2.min.css',
], 'public/css/all.css')
.scripts([
   'resources/assets/plugins/bootstrap/bootstrap.min.js',
   'resources/assets/plugins/slick/slick.min.js',        
   'resources/assets/plugins/slick/slick-animation.min.js',        
   'resources/assets/plugins/colorbox/jquery.colorbox.js',
   'resources/assets/plugins/shuffle/shuffle.min.js',
   'resources/assets/plugins/google-map/map.js',
   'resources/assets/js/script.js',
   'resources/assets/plugins/datatables/datatables.min.js',
   'resources/assets/plugins/popper/popper.js',
   'resources/assets/plugins/sweetalert2/sweetalert2.all.min.js',
   'resources/assets/js/login/show_login_messages.js'

], 'public/js/all.js');