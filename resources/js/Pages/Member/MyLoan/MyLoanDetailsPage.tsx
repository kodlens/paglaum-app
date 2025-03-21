import MemberAuthLayout from '@/Layouts/MemberAuthLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react'
import dayjs from 'dayjs';


const dateFormat =(date:string, customFormat:string) => {
  return dayjs(date).format(customFormat);
}
export default function MyLoanDetailsPage({ auth, loanDetails }: PageProps<{ loanDetails: any[] }>) {

  return (
    <>
      <MemberAuthLayout user={auth.user}>

        <Head title={"My Loan Details"} />

        <div className='w-full mx-2 md:max-w-2xl md:mx-auto sm:px-6'>
          {loanDetails.map((item, index) => (
            <div key={index} className='bg-white shadow-sm mt-2 p-6 flex flex-col md:flex-row md:justify-between'>
              <div>
                <div>Due Date</div>
                <div>{dateFormat(item.due_date, 'MMMM DD, YYYY')}</div>
              </div>

              <div>
                <div>Amount Due</div>
                <div>{item.amount.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
        
       


        </MemberAuthLayout>
      <div>MyLoanDetailsPage</div>
    </>


  )
}
