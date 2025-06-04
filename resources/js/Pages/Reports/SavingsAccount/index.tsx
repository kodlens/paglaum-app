import ReportLogo from '@/Components/ReportLogo'
import { Head } from '@inertiajs/react'
import { Button, DatePicker } from 'antd'
import axios from 'axios'
import { ArrowLeft, PrinterCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Fields {
  user_lname?: string;
  user_fname?: string;
  user_mname?: string;
  user_sex?: string;
  total_accounts?: number;
  total_deposits?: number;
  total_withdrawals?: number;
  total_balance?: number;
}
export default function ReportSavingsAccount() {
  const [data, setData] = useState<Fields[]>([])
  const [search, setSearch] = useState<any>({
    dateFrom: '',
    dateTo: ''
  })

  const loadLoanTransaction = () => {
    console.log(search);
    const params = [
      `from=${search.dateFrom}`,
      `to=${search.dateTo}`
    ].join('&')

    axios.get(`/reports/get-savings-accounts?${params}`).then(res=>{
      //console.log(res.data);
      setData(res.data)
    })
  }

  useEffect(()=>{
    loadLoanTransaction()
  }, [])



  return (
    <>
      <Head title="Savigns Transaction Report"/>
      <div className='min-h-screen p-6'>
        <div className='max-w-2xl mx-auto'>

          <div className='flex gap-2 print:hidden'>
            <Button icon={<ArrowLeft size={16}/>} className='mb-2 print:hidden'
              onClick={()=>{
                window.history.back()
              }}>Back</Button>

            <Button icon={<PrinterCheck size={16} />} className='mb-2 print:hidden'
              onClick={()=>{
                window.print()
              }}>Print</Button>
          </div>
          
    
          <ReportLogo />

          <div className='font-bold text-center mb-4'>SUMMARY OF SAVINGS ACCOUNTS</div>
          <table className='border w-full'>
            <thead className='bg-gray-100 font-bold text-left'>
              <tr>
                <th className='py-2 px-6'>NAME</th>
                <th className='py-2 px-6'>TOTAL ACCOUNTS</th>
                <th className='py-2 px-6'>TOTAL DEPOSITS</th>
                <th className='py-2 px-6'>TOTAL WITHDRAWALS</th>
                <th className='py-2 px-6'>TOTAL BALANCE</th>
              </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                data.map((item: Fields, ix: number) => (
                  <tr key={ix} className="border">
                    <td className="px-6 py-2">{item?.user_lname}, {item.user_fname} {item.user_mname}</td>
                    <td className="px-6 py-2">{item?.total_accounts}</td>
                    <td className="px-6 py-2">&#8369; {item?.total_deposits?.toLocaleString()}</td>
                    <td className="px-6 py-2">&#8369; {item?.total_withdrawals?.toLocaleString()}</td>
                    <td className="text-right px-6 py-2">&#8369; {item?.total_balance?.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center px-6 py-2 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
