<?php


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
Route::get('load-insurance-types', [App\Http\Controllers\OpenController::class , 'loadInsuranceTypes']);
Route::get('load-insurance-type-agebracket/{id}', [App\Http\Controllers\OpenController::class , 'loadInsuranceTypeAgeBracket']);

Route::get('load-provinces', [App\Http\Controllers\AddressController::class , 'loadProvinces']);
Route::get('load-cities', [App\Http\Controllers\AddressController::class , 'loadCities']);
Route::get('load-barangays', [App\Http\Controllers\AddressController::class , 'loadBarangays']);



Route::middleware(['auth', 'verified','active'])->group(function () {
    //avoid loop,, dapat sa gawas sa member middleware
    Route::get('/otp-form', [App\Http\Controllers\OtpAuthenticationController::class, 'index'])->name('otp-form');
    Route::post('/check-otp', [App\Http\Controllers\OtpAuthenticationController::class, 'checkOTP'])->name('verify-otp');
    Route::post('/request-otp', [App\Http\Controllers\OtpAuthenticationController::class, 'requestOTP'])->name('request-otp');     
    
});


require __DIR__.'/admin.php';
require __DIR__.'/member.php';
require __DIR__.'/ybs.php';
require __DIR__.'/bm.php';
require __DIR__.'/do.php';
require __DIR__.'/ipp.php';


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

 
    Route::get('/get-loans', [App\Http\Controllers\LoanController::class, 'getData']);


    Route::post('/paymongo/pay', [App\Http\Controllers\PaymongoController::class , 'pay'])->name('paymongo.pay')  ;
    Route::get('/paymongo/cancel', [App\Http\Controllers\PaymongoController::class , 'cancel'])->name('paymongo.cancel');
    Route::get('/paymongo/success', [App\Http\Controllers\PaymongoController::class , 'success'])->name('paymongo.success');

    Route::get('/paymongo/payment-method/{id}', [App\Http\Controllers\PaymongoController::class , 'paymentMethod'])->name('paymongo.payment-method');


    // Route::post('/paymongo/deposit', [App\Http\Controllers\PaymongoDepositController::class , 'deposit'])->name('paymongo.deposit');

    Route::get('/get-member-loans/{id}', [App\Http\Controllers\MakeAPaymentController::class, 'getMemberLoans']);
    Route::post('/make-a-payment/{id}', [App\Http\Controllers\MakeAPaymentController::class, 'makePayment']); //this route for making a payment
    

});
/* ============ PAYMONGO ====================== */



//upload id
Route::post('/temp-upload', [App\Http\Controllers\UploadController::class, 'tempUpload']);
Route::post('/temp-remove/{filename}', [App\Http\Controllers\UploadController::class, 'removeUpload']);


/* ============ AUTH ====================== */
Route::middleware(['auth'])->group(function () {

   Route::patch('/update-profile', [App\Http\Controllers\ProfileController::class, 'updateProfile'])->name('update-profile');

});
/* ============ AUTH ====================== */



/* ============ DASHBOARDS REPORT, COMPUTATION, CONSOLIDATION, COUNTS ====================== */

Route::middleware(['auth'])->group(function () {

    Route::get('/loan-request-count', [App\Http\Controllers\OpenDashboardController::class, 'loanRequestCount']);
    Route::get('/open-dashboard/pending-loan-application', [App\Http\Controllers\OpenDashboardController::class, 'pendingLoanApplication']);
    Route::get('/open-dashboard/pending-savings-application', [App\Http\Controllers\OpenDashboardController::class, 'pendingSavingsApplication']);
    Route::get('/open-dashboard/load-pending-accounts', [App\Http\Controllers\OpenDashboardController::class, 'loadPendingAccounts']);
    Route::get('/open-dashboard/load-loan-payment-today', [App\Http\Controllers\OpenDashboardController::class, 'loadLoanPaymentToday']);
    Route::get('/open-dashboard/load-total-deposit-today', [App\Http\Controllers\OpenDashboardController::class, 'loadLoanDepositToday']);

    //chart
    Route::get('/open-dashboard/chart-monthly-financial-report', [App\Http\Controllers\ChartReport\MonthlyFinancialSummaryReportController::class, 'report']);
    
    Route::get('/get-members-autocomplete', [App\Http\Controllers\AutoCompleteController::class, 'memberAutocomplete']);
    Route::get('/get-not-approve-members-autocomplete', [App\Http\Controllers\AutoCompleteController::class, 'memberNotApproveAutocomplete']);
    Route::get('/get-savings-autocomplete', [App\Http\Controllers\AutoCompleteController::class, 'savingsAutoComplete']);
    
});

/* ============ DASHBOARDS REPORT, COMPUTATION, CONSOLIDATION, COUNTS ====================== */




/* ============ REPORTS ====================== */

/**
 * Group of authenticated routes for generating various transaction reports.
 * 
 * Contains routes for:
 * - Loan transaction reports (index and data retrieval)
 * - Savings transaction reports (index and data retrieval)
 * 
 * All routes within this group require user authentication.
 */
Route::middleware(['auth'])->group(function () {

    Route::get('/reports/loan-transaction', [App\Http\Controllers\Reports\ReportLoanTransactionController::class, 'index'])->name('reports.loan-transaction.index');
    Route::get('/reports/get-loan-transaction', [App\Http\Controllers\Reports\ReportLoanTransactionController::class, 'getLoanTransaction']);
    
    Route::get('/reports/savings-transaction', [App\Http\Controllers\Reports\ReportSavingTransactionController::class, 'index'])->name('reports.savings-transaction.index');
    Route::get('/reports/get-savings-transaction', [App\Http\Controllers\Reports\ReportSavingTransactionController::class, 'getSavingsTransaction']);
    
    Route::get('/reports/loan', [App\Http\Controllers\Reports\ReportLoanController::class, 'index'])
        ->name('reports.loan.index');
    Route::get('/reports/get-loans', [App\Http\Controllers\Reports\ReportLoanController::class, 'report']);
    
    Route::get('/reports/savings-account', [App\Http\Controllers\Reports\ReportSavingsAccountController::class, 'index'])
        ->name('reports.savings-account.index');
    Route::get('/reports/get-savings-accounts', [App\Http\Controllers\Reports\ReportSavingsAccountController::class, 'reportSavingsAccount']);
    

    Route::get('/reports/insurance', [App\Http\Controllers\Reports\ReportInsuranceController::class, 'index'])
        ->name('reports.insurance.index');
    Route::get('/reports/get-insurances', [App\Http\Controllers\Reports\ReportInsuranceController::class, 'report']);
    
    Route::get('/reports/monthly-savings', [App\Http\Controllers\Reports\ReportMonthlySavingsController::class, 'index'])
        ->name('reports.monthly-savings.index');
    Route::get('/reports/get-monthly-savings', [App\Http\Controllers\Reports\ReportMonthlySavingsController::class, 'report']);
    

    Route::get('/reports/loan-portfolio', [App\Http\Controllers\Reports\ReportLoanPortfolioController::class, 'index'])
        ->name('reports.loan-portfolio.index');
    Route::get('/reports/get-loan-portfolio', [App\Http\Controllers\Reports\ReportLoanPortfolioController::class, 'report']);

    Route::get('/reports/income-interest', [App\Http\Controllers\Reports\ReportIncomeInterestController::class, 'index'])
        ->name('reports.income-interest.index');
    Route::get('/reports/get-income-interest', [App\Http\Controllers\Reports\ReportIncomeInterestController::class, 'report']);

    Route::get('/reports/deliquency-report', [App\Http\Controllers\Reports\ReportDeliquencyController::class, 'index'])
        ->name('reports.deliquency-report.index');
    Route::get('/reports/get-deliquency-report', [App\Http\Controllers\Reports\ReportDeliquencyController::class, 'report']);
   
 
    

});

/* ============ REPORTS ====================== */



/* ============ REGISTRATION VALIDATION REQUEST ====================== */
    Route::post('/check-username', [App\Http\Controllers\RegisterValidation::class, 'checkUsername']);
    Route::post('/check-account-information', [App\Http\Controllers\RegisterValidation::class, 'checkAccountInformation']);
    Route::post('/check-address-information', [App\Http\Controllers\RegisterValidation::class, 'checkAddressInformation']);

    



// FOR CRON JOB
Route::get('/cron/apply-savings-interest', [App\Http\Controllers\Cron\SavingsInterestController::class, 'savingsInterest']);
Route::get('/cron/check-due-date', [App\Http\Controllers\Cron\CheckDueDateController::class, 'checkDue']);


//for debugging
Route::get('/applogout', function (Request $req) {
    Auth::guard('web')->logout();
    $req->session()->invalidate();

    $req->session()->regenerateToken();

    return redirect('/login');
});


Route::get('/session', function (Request $req) {
    //$req->session()->invalidate();

    //$req->session()->regenerateToken();
    //return session('_previous');
    return Session::all();
});