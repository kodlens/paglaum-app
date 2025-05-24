import MemberAuthLayout from '@/Layouts/MemberAuthLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { Button } from 'antd';
import axios from 'axios';
import { LoanDetail } from '@/types/loanDetail';
import { Loan } from '@/types/loan';
import { WalletMinimal } from 'lucide-react';


const dateFormat =(date:string|Date, customFormat:string) => {
  return dayjs(date).format(customFormat);
}
export default function MyLoanDetailsPage({ auth, loan }: PageProps<{ loan: Loan }>) {

  const [loading, setLoading] = useState<boolean>(false);
  
  const handleMakePayment = (loandetail:any) => {
    setLoading(true)
    const fields = {
      amount: loandetail.total_amount,
      interest_amount: loandetail.interest_amount,
      principal: loandetail.amount,
      savings: loandetail.savings,
      insurance_payment: loandetail.insurance_payment,
      name: '',
      due_date: loandetail.due_date,
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

        <div className='w-full mx-2 lg:max-w-4xl md:mx-auto sm:px-6 pb-10'>
          
          <div className='bg-white p-6 mt-5'>
            <div className='text-2xl font-bold text-center my-4'>Amortization Schedule</div>
            <div className='flex flex-col sm:flex-row gap-10'>
              <div className='flex-1'>
                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Borrower</div>
                  <div>{ loan.user.lname },  {loan.user.fname }</div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Granted</div>
                  <div>{ loan.principal ? loan.principal.toLocaleString() : 0 } </div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Loan Type</div>
                  <div>{ loan.loan_type ? loan.loan_type.loan_type : '' } </div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Mode of Payment</div>
                  <div>{ loan.mode_payment } </div> 
                </div>
                
              </div>

              <div className='flex-1'>
                <div className='mb-2 min-w-[60px]'>
                  <div className='font-bold text-gray-500'>Loan Sub Type</div>
                  <div>{ loan.loan_subtype ? loan.loan_subtype.loan_subtype: 0 } Month (s)</div> 
                </div>
                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Terms</div>
                  <div>{ loan.terms_month } Month (s)</div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>Rate</div>
                  <div>{ loan.interest ? (loan.interest * (loan.terms_month ? loan.terms_month : 0)) : 0 }% </div> 
                </div>

                <div className='mb-2'>
                  <div className='font-bold text-gray-500'>No. Terms</div>
                  <div>{ loan.no_terms ? loan.no_terms : 0 }</div> 
                </div>

              </div>
            </div>
          </div>

          <div className=''>
            {loan.loan_details && loan.loan_details.length > 0 ? (
              loan.loan_details.map((item:LoanDetail, index:number) => (
                <div key={index} className='bg-white shadow-sm mt-2 p-6'>
                  <div className=''>

                    <div className='flex gap-2'>
                      {item.is_paid > 0 ? (
                        <div className='w-full md:w-[70px] text-center py-1 px-1 bg-green-600 rounded-2xl text-[10px] mb-2 text-white font-bold'>PAID</div>
                      ) : (
                        <div className='w-full md:w-[70px] text-center py-1 px-1 bg-red-400 rounded-2xl text-[10px] mb-2 text-white font-bold'>NOT PAID</div>
                      )}

                      {item.is_penalty ? (
                        <div className='w-full md:w-[70px] text-center py-1 px-1 bg-red-400 rounded-2xl text-[10px] mb-2 text-white font-bold'>PENALTY</div>
                      ) : null}
                    </div>
                  
                    <div className='flex flex-col sm:flex-row sm:justify-between'>
                      <div>
                        <div className='font-bold text-gray-500'>Due Date</div>
                        <div>{dateFormat(item.due_date, 'MMMM DD, YYYY')}</div>
                      </div>

                      <div>
                        <div className='font-bold text-gray-500'>Principal</div>
                        <div>&#8369; {item.amount}</div>
                      </div>

                       <div>
                        <div className='font-bold text-gray-500'>Interest</div>
                        <div>&#8369; {item.interest_amount}</div>
                      </div>

                      <div>
                        <div className='font-bold text-gray-500'>Savings</div>
                        <div>&#8369; {item.savings}</div>
                      </div>

                      <div>
                        <div className='font-bold text-gray-500'>Share</div>
                        <div>&#8369; {item.insurance_payment}</div>
                      </div>

                     

                      <div>
                        <div className='font-bold text-gray-500'>Total Amount</div>
                        <div>&#8369; {item.total_amount ? item.total_amount.toLocaleString() : 0}</div>

                          { !item.is_paid ? (
                            <div>
                              <Button 
                                className='print:hidden mt-4'
                                type='primary'
                                icon={<WalletMinimal size={16} />}
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
