import MemberAuthLayout from '@/Layouts/MemberAuthLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { Button } from 'antd';
import axios from 'axios';


const dateFormat =(date:string, customFormat:string) => {
  return dayjs(date).format(customFormat);
}
export default function MyLoanDetailsPage({ auth, loan }: PageProps<{ loan: any }>) {

  const [loading, setLoading] = useState<boolean>(false);
  
  const handleMakePayment = (loandetail:any) => {
    setLoading(true)
    const fields = {
      amount: loandetail.amount,
      name: '',
      paymentmethod: 'gcash',
      refno: 'REF'+loandetail.id,
      loanid: loandetail.loan_id,
      loandetailid: loandetail.id
    }

    axios.post('/paymongo/pay', fields).then(res=>{
      setLoading(false)
      //console.log('axios responded');
      
      //console.log('response: ', res.data.data.attributes.checkout_url);
      window.location = res.data.data.attributes.checkout_url
 
    }).catch(err => {
      setLoading(false)
    })
  }

  return (
    <>
      <MemberAuthLayout user={auth.user}>

        <Head title={"My Loan Details"} />


        <div className='w-full mx-2 md:max-w-2xl md:mx-auto sm:px-6 pb-10'>
          
          <div className='bg-white p-6 mt-5'>
            <div className='flex flex-col md:flex-row gap-10'>
              <div className='flex-1'>
                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Borrower</div>
                  <div>{ loan.user.lname },  {loan.user.fname }</div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Granted</div>
                  <div>{ loan.principal.toLocaleString() } </div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Loan Type</div>
                  <div>{ loan.loan_type.loan_type } </div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Mode of Payment</div>
                  <div>{ loan.mode_payment } </div> 
                </div>
              </div>

              <div className='flex-1'>
                <div className='mb-2 min-w-[60px]'>
                  <div className='font-bold text-gray-500'>Loan Sub Type</div>
                  <div>{ loan.loan_subtype.loan_subtype } Month (s)</div> 
                </div>
                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Terms</div>
                  <div>{ loan.terms_month } Month (s)</div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Rate</div>
                  <div>{ loan.interest * loan.terms_month }% </div> 
                </div>
              </div>
            </div>
          </div>

          <div className=''>
            {loan.loan_details.length > 0 ? (
              loan.loan_details.map((item:any, index:number) => (
                <div key={index} className='bg-white shadow-sm mt-2 p-6'>
                  <div className=''>
                    {item.is_paid > 0 ? (
                      <div className='w-full md:w-[70px] text-center py-1 px-1 bg-green-600 rounded-2xl text-[10px] mb-2 text-white font-bold'>PAID</div>
                    ) : (
                      <div className='w-full md:w-[70px] text-center py-1 px-1 bg-red-400 rounded-2xl text-[10px] mb-2 text-white font-bold'>NOT PAID</div>
                    )}
                  
                    <div className='flex flex-col md:flex-row md:justify-between'>
                      <div>
                        <div className='font-bold text-gray-500'>Due Date</div>
                        <div>{dateFormat(item.due_date, 'MMMM DD, YYYY')}</div>
                      </div>

                      <div>
                        <div className='font-bold text-gray-500'>Amount Due</div>
                        <div>{item.amount.toLocaleString()}</div>

                          { !item.is_paid ? (
                            <div>
                              <Button 
                                onClick={() => handleMakePayment(item)} 
                                loading={loading}>
                                  Make a payment
                              </Button>
                            </div>
                          ) : ''}
    
                      </div>
                      
                    </div>
                  </div>

                </div>
              ))) : (
                <div className='bg-white shadow-sm mt-2 p-6 text-red-600 italic font-bold'>
                  The loan application status is still pending.
                </div>
            )}
          </div>

          
        </div>
      </MemberAuthLayout>
 
    </>


  )
}
