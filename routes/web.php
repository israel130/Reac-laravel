<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/Inicio', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('Inicio');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/Compras', function () {
    return Inertia::render('Compras');
})->middleware(['auth', 'verified'])->name('Compras');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
});

Route::get('/comprar', function (Request $request) {
    return Inertia::render('Dashboard', [
        'prenda' => $request->query('prenda'),
        'Precio' => $request->query('Precio'),
        'Talla'  => $request->query('Talla'),
        'Color'  => $request->query('Color'),
        'Tela'   => $request->query('Tela'),
    ]);
})->middleware(['auth'])->name('comprar');

Route::post('/make/purchase', function (Request $request) {
    DB::table('shope')->insert([
        'id_user' => auth()->id(),          
        'name_user' => auth()->user()->name,  
        'prenda'    => $request->input('prenda'),
        'Precio'    => $request->input('Precio'),
        'Talla'     => $request->input('Talla'),
        'Color'     => $request->input('Color'),
        'Tela'      => $request->input('Tela'),
    ]);
    return response()->json(['success' => true]);
})->middleware('auth');

Route::get('/shopping', function (Request $request) {
    
    $userId = Auth::id(); 
    $userName = Auth::user()->name; 

    $items = DB::table('shope')
        ->where('id_user', $userId)
        ->where('name_user', $userName)
        ->get();
    return response()->json($items);
    
})->middleware('auth'); 


require __DIR__.'/auth.php';
