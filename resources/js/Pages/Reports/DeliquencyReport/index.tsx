import ReportLogo from '@/Components/ReportLogo'
import { Head } from '@inertiajs/react'
import { Button, DatePicker } from 'antd'
import axios from 'axios'
import { ArrowLeft, PrinterCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

interface Fields {
  full_name?: string;
  sex?: string;
  loan_id?:number;
  due_date?: string;
  amount_due?: number;
  amount_paid?: number;
  days_overdue?: number;
  STATUS?: string;
}
export default function DeliquencyReport() {
  const [data, setData] = useState<Fields[]>([])
  const [search, setSearch] = useState<any>({
    dateFrom: '',
    dateTo: ''
  })

  const loadReport = () => {
    console.log(search);
    const params = [
      `from=${search.dateFrom}`,
      `to=${search.dateTo}`
    ].join('&')

    axios.get(`/reports/get-deliquency-report?${params}`).then(res=>{
      //console.log(res.data);
      setData(res.data)
    })
  }

  useEffect(()=>{
    loadReport()
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

          <div className='flex gap-2 mb-2 print:hidden'>
            <DatePicker onChange={(value)=> setSearch({...search, dateFrom: value ? dayjs(value).format('YYYY-MM-DD') : ''})}/>
            {/* <DatePicker onChange={(value)=> setSearch({...search, dateTo: value ? dayjs(value).format('YYYY-MM-DD') : ''})}/> */}
            <Button
              onClick={loadReport}>Search</Button>
            <hr />
          </div>
          
    
          <ReportLogo />

          <div className='font-bold text-center'>DELIQUENCY REPORT</div>

          { search.dateFrom && search.dateTo ? (
            <div className='font-bold text-center mb-4'>
              As of &nbsp;
              { dayjs(search.dateFrom).format('MMM DD, YYYY') } 
            </div>
          ): null }

          <table className='border w-full'>
            <thead className='bg-gray-100 font-bold text-left'>
              <tr>
                <th className='py-2 px-6'>NAME</th>
                <th className='py-2 px-6'>SEX</th>
                <th className='py-2 px-6'>LOAN REF</th>
                <th className='py-2 px-6'>DUE DATE</th>
                <th className='py-2 px-6'>AMOUNT DUE</th>
                <th className='py-2 px-6'>AMOUNT PAID</th>
                <th className='py-2 px-6'>DAY OVERDUE</th>
                <th className='py-2 px-6'>STATUS</th>
              
              </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                data.map((item: Fields, ix: number) => (
                  <tr key={ix} className="border">
                    <td className="px-6 py-2">{item?.full_name}</td>
                    <td className="px-6 py-2">{item?.sex}</td>
                    <td className="px-6 py-2">REF: {item?.loan_id}</td>
                    <td className="px-6 py-2">{item?.due_date}</td>
                    <td className="px-6 py-2">&#8369; {item?.amount_due?.toLocaleString() }</td>
                    <td className="px-6 py-2">&#8369; {item?.amount_paid?.toLocaleString() }</td>
                    <td className="px-6 py-2">{item?.days_overdue}</td>
                    <td className="px-6 py-2">{item?.STATUS}</td>
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
