<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\EstablecimientoController;
// use App\Http\Controllers\LoginController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login',  'LoginController@login')->name('login');
Route::post('/login',  'LoginController@autenticar')->name('autenticar');
Route::get('/logout',  'LoginController@logout')->name('logout');

//  Pantalla principal
Route::get('/',  'EstablecimientoController@index')->name('index');


Route::get('/establecimientos', 'EstablecimientoController@buscar')->name('establecimientos');
Route::post('/cueanexo_selected', 'EstablecimientoController@set_cueanexo')->name('cueanexo_selected');

Route::get('/welcome',  'EstablecimientoController@index')->name('welcomepeople');


Route::get('/establecimientos/techos',   'EstablecimientoController@index_techos')->name('establecimientos.techos');
Route::get('/establecimientos/proyectos','ProyectoController@index_proyectos')->name('establecimientos.proyectos');
Route::post('/establecimientos/proyectos/historial','ProyectoController@historial_proyectos_nothing')->name('proyectos.historial');
Route::post('/establecimientos/proyectos/actualizar','ProyectoController@actualizar_proyectos')->name('proyectos.actualizar');
Route::post('/establecimientos/proyectos/crear','ProyectoController@crear_proyectos')->name('proyectos.crear');
Route::post('/establecimientos/proyectos/eliminar','ProyectoController@eliminar_proyectos')->name('proyectos.eliminar');

Route::get('/informes/proyectos_actualizados','ProyectoController@proyectos_actualizados')->name('proyectos_actualizados');


// RUTAS - AJAX
Route::post('/fetch_establecimientos_xcueanexo', 'EstablecimientoController@buscar_cue_anexo');
Route::post('/fetch_establecimientos_xnombre', 'EstablecimientoController@buscar_nombre');
Route::post('/fetch_establecimientos', 'EstablecimientoController@buscar_departamento_localidad');
Route::post('/fetch_establecimientos_filtrados_nombre', 'EstablecimientoController@buscar_departamento_localidad_nombre');

Route::post('/fetch_proyectos', 'ProyectoController@mostrar_proyectos');
Route::post('/fetch_historial', 'ProyectoController@historial_proyectos');
Route::post('/fetch_editar_proyecto', 'ProyectoController@editar_proyectos');


Route::get('/fetchstablishments', 'EstablecimientoController@fetchstablishments')->name('fetchstablishments');
Route::post('/fetch_localidades', 'EstablecimientoController@fetch_localidades')->name('fetch_localidades');
// Route::get('/welcome', 'EstablecimientoController@buscar')->name('welcome');
