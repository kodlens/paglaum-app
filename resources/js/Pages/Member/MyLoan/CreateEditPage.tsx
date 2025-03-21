import MemberAuthLayout from '@/Layouts/MemberAuthLayout'
import { PageProps } from '@/types'
import React from 'react'
import ApplyLoan from "@/Components/ApplyLoan";
import {Head} from "@inertiajs/react";

export default function MyLoanIndex({ auth }: PageProps) {

    return (

        <MemberAuthLayout user={auth.user}>

            <Head title={"My Loan"} />

            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">CREATE / EDIT LOAN INFORMATION</div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6 b">
                    <ApplyLoan />
                </div>

            </div>





        </MemberAuthLayout>

    )
}
