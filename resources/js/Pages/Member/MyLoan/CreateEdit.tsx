import LoanApplication from '@/Components/LoanApplication'
import MemberAuthLayout from '@/Layouts/MemberAuthLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'

function CreateEdit({auth} : PageProps) {
  return (
    <>
      <MemberAuthLayout user={auth.user}>

            <Head title={"Apply Loan"} />

            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 mt-6 ">
                <div className='bg-white my-4 p-6 font-bold text-lg'>APPLICATION FOR LOAN</div>

                <LoanApplication />
                
            </div>

    </MemberAuthLayout>
        
        
    </>
  )
}

export default CreateEdit