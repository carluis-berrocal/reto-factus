<?php

use App\Http\Controllers\BillController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\FactusController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
     return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('app');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('customers', CustomerController::class);
    Route::resource('products', ProductController::class);

    Route::get('/factus-ui', [FactusController::class, 'index'])->name('factus-ui.index');
    Route::match(['get', 'post'], 'factus/test/{endpoint?}', [FactusController::class, 'testAny'])->where('endpoint', '.*');



    Route::get('/bills', [BillController::class, 'index'])->name('bills.index');
    Route::get('/bills/create', [BillController::class, 'create'])->name('bills.create');
    Route::post('/bills/store', [BillController::class, 'store'])->name('bills.store');
    Route::get('/bills/{number}', [BillController::class, 'show'])->name('bills.show');
    Route::get('/bills/download-pdf/{number}', [BillController::class, 'downloadPdf'])->name('bills.download.pdf');
    Route::get('/bills/download-xml/{number}', [BillController::class, 'downloadXml'])->name('bills.download.xml');
    


});


require __DIR__.'/auth.php';
