import MemberAuthLayout from '@/Layouts/MemberAuthLayout'
import { PageProps } from '@/types'
import React from 'react'

export default function MyLoanIndex({ auth }: PageProps) {

  return (

    <MemberAuthLayout user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          My Loan
        </h2>
      }>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">My Loan Page!</div>
          </div>
        </div>
      </div>

      
    </MemberAuthLayout>

  )
}
