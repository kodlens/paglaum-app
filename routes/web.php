<?php


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Public/LandingPage', [

    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('load-education-levels', [App\Http\Controllers\OpenController::class , 'loadEducationLevels'])->name('load-education-levels')  ;
Route::get('load-loan-types', [App\Http\Controllers\OpenController::class , 'loadLoanTypes'])->name('load-loan-types')  ;
Route::get('load-loan-subtypes', [App\Http\Controllers\OpenController::class , 'loadLoanSubtypes'])->name('load-loan-subtypes')  ;
Route::get('load-id-types', [App\Http\Controllers\OpenController::class , 'loadIdTypes'])->name('load-id-types')  ;


Route::get('load-provinces', [App\Http\Controllers\AddressController::class , 'loadProvinces']);
Route::get('load-cities', [App\Http\Controllers\AddressController::class , 'loadCities']);
Route::get('load-barangays', [App\Http\Controllers\AddressController::class , 'loadBarangays']);


require __DIR__.'/admin.php';
require __DIR__.'/member.php';
require __DIR__.'/bm.php';
require __DIR__.'/do.php';


require __DIR__.'/auth.php';



Route::get('/test', function () {

    // Example usage
    $startDate = '2025-03-24';  // Starting date (YYYY-MM-DD format)
    $numWeeks = 10;  // Number of weeks

    $weeklyDates = generateWeeklyDates($startDate, $numWeeks);

    // Output the weekly dates
    foreach ($weeklyDates as $date) {
        echo $date . "\n";
    }
});


function generateWeeklyDates($startDate, $numWeeks) {
    $dates = [];
    $currentDate = strtotime($startDate);  // Convert the start date to a timestamp

    for ($i = 0; $i < $numWeeks; $i++) {
        // Add the current date to the array in 'Y-m-d' format
        $dates[] = date('Y-m-d', $currentDate);

        // Increment the current date by 7 days (1 week)
        $currentDate = strtotime('+1 week', $currentDate);
    }

    return $dates;
}



/* ============ PAYMONGO ====================== */

Route::middleware(['auth'])->group(function () {

    Route::post('/paymongo/pay', [App\Http\Controllers\PaymongoController::class , 'pay'])->name('paymongo.pay')  ;
    Route::get('/paymongo/cancel', [App\Http\Controllers\PaymongoController::class , 'cancel'])->name('paymongo.cancel');
    Route::get('/paymongo/success', [App\Http\Controllers\PaymongoController::class , 'success'])->name('paymongo.success');

    Route::get('/paymongo/payment-method/{id}', [App\Http\Controllers\PaymongoController::class , 'paymentMethod'])->name('paymongo.payment-method');



    Route::get('/get-member-loans/{id}', [App\Http\Controllers\MakeAPaymentController::class, 'getMemberLoans']);
    Route::post('/make-a-payment/{id}', [App\Http\Controllers\MakeAPaymentController::class, 'makePayment']); //this route for making a payment


});

/* ============ PAYMONGO ====================== */




/* ============ DASHBOARDS REPORT, COMPUTATION, CONSOLIDATION, COUNTS ====================== */


Route::middleware(['auth'])->group(function () {

    Route::get('/loan-request-count', [App\Http\Controllers\OpenDashboardController::class, 'loanRequestCount']);

});


