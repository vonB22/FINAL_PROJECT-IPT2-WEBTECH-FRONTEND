<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\BookController;

Route::get('/index', function () {
    return view('index');
});



//--------------EXAMPLES---------------

// Route::get('/website', function () {
//     return view('website');
// })->name('website');

// Route::get('/layout', function () {
//     return view('CRUD.create');
// });

// Route::get('/index', function () {
//     return view('CRUD.index');
// });

// Route::get('/profile', function () {
//     return view('CRUD.profile');
// });

// Route::get('/sidebar', function () {
//     return view('sidebar');
// });