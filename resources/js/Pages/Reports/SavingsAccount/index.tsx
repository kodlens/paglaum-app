import ReportLogo from '@/Components/ReportLogo'
import { Head } from '@inertiajs/react'
import { Button, DatePicker } from 'antd'
import axios from 'axios'
import { ArrowLeft, PrinterCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

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

           <div className='flex gap-2 mb-2 print:hidden'>
            <DatePicker onChange={(value)=> setSearch({...search, dateFrom: value ? dayjs(value).format('YYYY-MM-DD') : ''})}/>
            <DatePicker onChange={(value)=> setSearch({...search, dateTo: value ? dayjs(value).format('YYYY-MM-DD') : ''})}/>
            <Button
              onClick={loadLoanTransaction}>Search</Button>
            <hr />
          </div>
          
    
          <ReportLogo />

          <div className='font-bold text-center text-md mt-4'>SUMMARY OF SAVINGS ACCOUNTS</div>

          { search.dateFrom && search.dateTo ? (
            <div className='font-bold text-center'>
              As of &nbsp;
              { dayjs(search.dateFrom).format('MMM DD, YYYY') } 
              &nbsp;to&nbsp; 
              { dayjs(search.dateTo).format('MMM DD, YYYY') }
            </div>
          ): null }


          <table className='border w-full mt-4'>
            <thead className='bg-gray-100 font-bold text-left'>
              <tr>
                <th className='py-2 px-6 text-[.8rem]'>NAME</th>
                <th className='py-2 px-6 text-[.8rem]'>TOTAL ACCOUNTS</th>
                <th className='py-2 px-6 text-[.8rem]'>TOTAL DEPOSITS</th>
                <th className='py-2 px-6 text-[.8rem]'>TOTAL WITHDRAWALS</th>
                <th className='py-2 px-6 text-[.8rem]'>TOTAL BALANCE</th>
              </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                data.map((item: Fields, ix: number) => (
                  <tr key={ix} className="border">
                    <td className="px-6 text-[.8rem] py-2">{item?.user_lname}, {item.user_fname} {item.user_mname}</td>
                    <td className="px-6 text-[.8rem] py-2">{item?.total_accounts}</td>
                    <td className="px-6 text-[.8rem] py-2">&#8369; {item?.total_deposits?.toLocaleString()}</td>
                    <td className="px-6 text-[.8rem] py-2">&#8369; {item?.total_withdrawals?.toLocaleString()}</td>
                    <td className="text-right px-6 text-[.8rem] py-2">&#8369; {item?.total_balance?.toLocaleString()}</td>
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
