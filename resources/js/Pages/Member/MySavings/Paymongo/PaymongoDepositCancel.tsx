import { Head, Link } from "@inertiajs/react";

export default function PaymongoDepositCancel() {
    return (

        <>
            <Head title="Payment Cancelled"></Head>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        
                <div className="bg-white max-w-4xl p-6 rounded-r-md">

                    <div className="font-bold text-red-700 text-2xl mb-4">
                        Payment Cancelled
                    </div>
                    <div className="font-bold text-center">
                        <Link className="border-b pb-1" href='/member/my-loans'>Back to My Loan </Link>
                    </div>
                </div>
            </div>
        
        </>
    )
  }
  