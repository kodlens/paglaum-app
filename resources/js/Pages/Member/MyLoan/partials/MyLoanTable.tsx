import { Loan } from '@/types/loan';
import { Link } from '@inertiajs/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MyLoanTable() {

    const [loans, setLoans] = useState([]);

    const loadLoanList = () => {
        axios.get('/member/get-my-loans').then(res => {
            setLoans(res.data)
        })
    }

    useEffect(() => {
        loadLoanList()
    }, [])

    return (
        <>

            <div className="font-bold mb-4">
                LOAN LIST
            </div>


            <div>

                {loans.map((item: any, index: number) => (

                    <div key={index} className='shadow-sm my-2 py-2 px-2 flex flex-col gap-2 md:flex-row justify-between'>

                        <div className=''>
                            <div className='mb-2'>
                                <div className='font-bold text-gray-500 text-[.7rem]'>LOAN TYPE</div>
                                <div>{item.loan_type.loan_type}</div>
                            </div>

                            <div>
                                <div className='font-bold text-gray-500 text-[.7rem]'>LOAN SUBTYPE</div>
                                <div>{item.loan_subtype.loan_subtype}</div>
                            </div>

                        </div>


                        <div className=''>
                            <div className='mb-2'>
                                <div className='font-bold text-gray-500 text-[.7rem]'>TERMS</div>
                                <div>{item.terms_month} Month(s)</div>
                            </div>

                            <div>
                                <div className='font-bold text-gray-500 text-[.7rem]'>INTEREST IN %</div>
                                <div>{item.interest}</div>
                            </div>
                        </div>


                        <div className=''>
                            <div className='mb-2'>
                                <div className='font-bold text-gray-500 text-[.7rem]'>PRINCIPAL</div>
                                <div className='text-lg'> &#8369; {item.principal.toLocaleString()}</div>
                            </div>
                        </div>

                        <div>
                            <Link
                                href={`/member/my-loans-details/${item.id}`}
                                className='bg-blue-700 text-white p-2.5 inline-flex rounded-md hover:bg-blue-600
                                focus:outline-none focus:ring-4 focus:ring-blue-300 w-full items-center text-center justify-center'
                            >
                                <span className='mr-2 text-sm'>See More</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                                
                            </Link>
                        </div>

                    </div>

                ))}
            </div>


        </>

    )
}
