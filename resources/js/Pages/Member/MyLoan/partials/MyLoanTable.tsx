import { Loan } from '@/types/loan';
import { Link } from '@inertiajs/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../style.css'

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


            <div className='relative overflow-x-auto'>

                <table className='table-loan w-full text-sm text-left rtl:text-right text-gray-500 overflow-auto'>
                    <tbody>
                        {loans.map((item: any, index: number) => (
                            <tr key={index} className='bg-white border-bborder-gray-200 border-b'>

                                <td className='py-2'>
                                    <div className='mb-2'>
                                        <div className='font-bold text-gray-500 text-[.7rem]'>LOAN TYPE</div>
                                        <div>{item.loan_type.loan_type}</div>
                                    </div>

                                    <div>
                                        <div className='font-bold text-gray-500 text-[.7rem]'>LOAN SUBTYPE</div>
                                        <div>{item.loan_subtype.loan_subtype}</div>
                                    </div>

                                    <div className='mt-2'>
                                        <div className='font-bold text-gray-500 text-[.7rem]'>MODE OF PAYMENT</div>
                                        <div>{item.mode_payment}</div>
                                    </div>

                                </td>


                                <td className=''>
                                    <div className='mb-2'>
                                        <div className='font-bold text-gray-500 text-[.7rem]'>TERMS</div>
                                        <div>{item.terms_month} Month(s)</div>
                                    </div>

                                    <div>
                                        <div className='font-bold text-gray-500 text-[.7rem]'>INTEREST(%)</div>
                                        <div>{item.interest}</div>
                                    </div>
                                </td>


                                <td className=''>
                                    <div className='mb-2'>
                                        <div className='font-bold text-gray-500 text-[.7rem]'>STATUS</div>
                                        <div className=''>{
                                            item.is_approve > 0 ? (
                                                <div className='bg-green-600 text-white text-[10px] w-[60px] text-center rounded-lg'>
                                                    APPROVED
                                                </div>
                                            ) : (
                                                <div className='bg-red-400 text-white text-[10px] w-[60px] text-center rounded-lg'>
                                                    PENDING
                                                </div>
                                            )
                                        }
                                        </div>
                                    </div>

                                    <div className='mb-2'>
                                        <div className='font-bold text-gray-500 text-[.7rem]'>PRINCIPAL</div>
                                        <div className='text-lg'> &#8369; {item.principal.toLocaleString()}</div>
                                    </div>
                                </td>

                                <td>
                                    <Link
                                        href={`/member/my-loans-details/${item.id}`}
                                        className='bg-blue-700 text-white p-1 inline-flex rounded-md hover:bg-blue-600
                                        focus:outline-none focus:ring-4 focus:ring-blue-300 px-4 items-center text-center justify-center'
                                    >
                                        <span className='mr-2 text-sm'>Summary</span>
                                        <svg className="h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                        </svg>
                                        
                                    </Link>
                                </td>

                            </tr>
                        
                        ))}
                    </tbody>
                </table>

                
            </div>


        </>

    )
}
