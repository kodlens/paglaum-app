import { Loan } from '@/types/loan';
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
                                <div>{item.terms_month}</div>
                            </div>

                            <div>
                                <div className='font-bold text-gray-500 text-[.7rem]'>INTEREST IN %</div>
                                <div>{item.interest}</div>
                            </div>
                        </div>


                        <div className=''>
                            <div className='mb-2'>
                                <div className='font-bold text-gray-500 text-[.7rem]'>PRINCIPAL</div>
                                <div className='text-lg'>{item.principal.toLocaleString()}</div>
                            </div>
                        </div>

                    </div>

                ))}
            </div>


        </>

    )
}
