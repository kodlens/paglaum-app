import ReportLogo from '@/Components/ReportLogo'
import { Head } from '@inertiajs/react'
import { Button, DatePicker } from 'antd'
import axios from 'axios'
import { ArrowLeft, PrinterCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'


interface Fields {
  loan_type?: string;
  count_loantype?: number;
}

interface SearchFields {
  dateFrom?: string;
  dateTo?: string;
}
export default function ReportLoanTransaction() {
  const [data, setData] = useState<Fields[]>([])
  const [search, setSearch] = useState<SearchFields>({
    dateFrom: '',
    dateTo: ''
  })

  const loadLoanTransaction = () => {
    console.log(search);
    const params = [
      `from=${search.dateFrom}`,
      `to=${search.dateTo}`
    ].join('&')

    axios.get(`/reports/get-loan-transaction?${params}`).then(res=>{
      //console.log(res.data);
      setData(res.data)
    })
  }

  useEffect(()=>{
    loadLoanTransaction()
  }, [])

  useEffect(()=>{
    console.log(search);
    
  }, [search])

  return (
    <>
      <Head title="Loan Transaction Report"/>
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
          
          
          <div className='flex gap-2 mb-2 print:hidden'>
            <DatePicker onChange={(value)=> setSearch({...search, dateFrom: value ? dayjs(value).format('YYYY-MM-DD') : ''})}/>
            <DatePicker onChange={(value)=> setSearch({...search, dateTo: value ? dayjs(value).format('YYYY-MM-DD') : ''})}/>
            <Button
              onClick={loadLoanTransaction}>Search</Button>
          </div>


          <ReportLogo />
          
          <div className='text-center my-4'>
            <div className='font-bold'>
              SUMMARY OF LOAN BY LOAN TYPE
            </div>
            <div>As of {search.dateFrom ? search.dateFrom : null } to { search.dateTo ? search.dateTo : null }</div>
          </div>
          <table className='border w-full'>
            <thead className='bg-gray-100 font-bold text-left'>
              <tr>
                <th className='py-2 px-6'>LOAN TYPE</th>
                <th className='py-2 px-6'>COUNT OF LOAN TYPE</th>
              </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                data.map((item: Fields, ix: number) => (
                  <tr key={ix} className="border">
                    <td className="px-6 py-2">{item?.loan_type}</td>
                    <td className="text-right px-6 py-2">{item?.count_loantype}</td>
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
