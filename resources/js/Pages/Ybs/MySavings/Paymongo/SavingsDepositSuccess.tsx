import { Head, Link } from "@inertiajs/react";

export default function SavingsDepositSuccess() {
    return (

        <>
            <Head title="Payment Successfull"></Head>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        
                <div className="bg-white max-w-4xl p-6 rounded-r-md">

                    <div className="font-bold text-green-700 text-2xl mb-4">
                        Payment Successfull
                    </div>
                    <div className="font-bold text-center">
                        <Link className="border-b pb-1" href='/ybs/my-savings' >Back to My Savings </Link>
                    </div>
                </div>
            </div>
        
        </>
    )
  }
  