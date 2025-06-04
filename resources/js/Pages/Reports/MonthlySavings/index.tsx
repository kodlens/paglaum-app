import ReportLogo from '@/Components/ReportLogo'
import { Head } from '@inertiajs/react'
import { Button, DatePicker } from 'antd'
import axios from 'axios'
import { ArrowLeft, PrinterCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Fields {
  full_name?: string;
  sex?: string;
  account_no?: string;
  month_year?: string;
  total_deposit?: number;
  total_withdrawal?: number;
  net_savings?: number;
}
export default function ReportMonthlySavings() {
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

    axios.get(`/reports/get-monthly-savings?${params}`).then(res=>{
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
        <div className='max-w-6xl mx-auto'>

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

          <div className='font-bold text-center mb-4'>MONTHLY SAVINGS</div>
          <table className='border w-full'>
            <thead className='bg-gray-100 font-bold text-left'>
              <tr>
                <th className='py-2 px-6'>NAME</th>
                <th className='py-2 px-6'>SEX</th>
                <th className='py-2 px-6'>ACCOUNT NO.</th>
                <th className='py-2 px-6'>MONTH & YEAR</th>
                <th className='py-2 px-6'>TOTAL DEPOSIT</th>
                <th className='py-2 px-6'>TOTAL WITHDRAWAL</th>
                <th className='py-2 px-6'>NET SAVINGS</th>
              </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                data.map((item: Fields, ix: number) => (
                  <tr key={ix} className="border">
                    <td className="px-6 py-2">{item?.full_name}</td>
                    <td className="px-6 py-2">{item?.sex}</td>
                    <td className="px-6 py-2">{item?.account_no}</td>
                    <td className="px-6 py-2">{item?.month_year}</td>
                    <td className="px-6 py-2">&#8369; {item?.total_deposit?.toLocaleString()}</td>
                    <td className="px-6 py-2">&#8369; {item?.total_withdrawal?.toLocaleString()}</td>
                    <td className="text-right px-6 py-2">&#8369; {item?.net_savings?.toLocaleString()}</td>
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
