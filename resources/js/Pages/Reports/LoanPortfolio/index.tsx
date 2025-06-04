import ReportLogo from '@/Components/ReportLogo'
import { Head } from '@inertiajs/react'
import { Button, DatePicker } from 'antd'
import axios from 'axios'
import { ArrowLeft, PrinterCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Fields {
  full_name?: string;
  sex?: string;
  loan_count?:number;
  total_disbursed?: number;
  total_expected?: number;
  total_paid?: number;
  balance?: number;
  par_status?: string;

}
export default function ReportLoanPortfolio() {
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

    axios.get(`/reports/get-loan-portfolio?${params}`).then(res=>{
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
        <div className='mx-auto max-w-6xl'>

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

          <div className='font-bold text-center mb-4'>LOAN PORTFOLIO</div>
          <table className='border w-full'>
            <thead className='bg-gray-100 font-bold text-left'>
              <tr>
                <th className='py-2 px-6'>NAME</th>
                <th className='py-2 px-6'>SEX</th>
                <th className='py-2 px-6'>LOAN COUNT</th>
                <th className='py-2 px-6'>TOTAL DISBURSED</th>
                <th className='py-2 px-6'>TOTAL EXPECTED</th>
                <th className='py-2 px-6'>TOTAL PAID</th>
                <th className='py-2 px-6'>BALANCE</th>
                <th className='py-2 px-6'>PAR STATUS (30D)</th>
              </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                data.map((item: Fields, ix: number) => (
                  <tr key={ix} className="border">
                    <td className="px-6 py-2">{item?.full_name}</td>
                    <td className="px-6 py-2">{item?.sex}</td>
                    <td className="px-6 py-2 text-center">{item?.loan_count}</td>
         
                    <td className="px-6 py-2">&#8369; {item?.total_disbursed?.toLocaleString() }</td>
                    <td className="px-6 py-2">&#8369; {item?.total_expected?.toLocaleString() }</td>
                    <td className="px-6 py-2">&#8369; {item?.total_paid?.toLocaleString() }</td>
                    <td className="px-6 py-2">&#8369; {item?.balance}</td>
                    <td className="px-6 py-2 text-center">{item?.par_status}</td>
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
