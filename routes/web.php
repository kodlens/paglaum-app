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


require __DIR__.'/admin.php';
require __DIR__.'/member.php';
require __DIR__.'/bm.php';


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