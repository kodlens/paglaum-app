import { Head } from '@inertiajs/react'
import { Button, DatePicker } from 'antd'
import axios from 'axios'
import { ArrowLeft, PrinterCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Fields {
  full_name?: string;
  sex?: string;
  loan_id?:number;
  loan_type?: string;
  loan_typ_description?: string;
  loan_subtype?: string;

  terms_month?: number;
  interest_percent?: number;
  interest?: number;
  principal?: number;
  loan_expected?: number;
  loan_paid?: number;
  payment_count?: number;
}
export default function ReportInsurance() {
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

    axios.get(`/reports/get-loans?${params}`).then(res=>{
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
        <div className='mx-auto'>

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
          
    

          <div className='font-bold text-center mb-4'>SUMMARY OF LOAN</div>
          <table className='border w-full'>
            <thead className='bg-gray-100 font-bold text-left'>
              <tr>
                <th className='py-2 px-6'>NAME</th>
                <th className='py-2 px-6'>SEX</th>
                <th className='py-2 px-6'>LOAN REF</th>
                <th className='py-2 px-6'>LOAN TYPE</th>
                <th className='py-2 px-6'>TERMS/INTEREST</th>
                <th className='py-2 px-6'>PRINCIPAL</th>
                <th className='py-2 px-6'>LOAN EXPECTED</th>
                <th className='py-2 px-6'>LOAN PAID</th>
                <th className='py-2 px-6'>COUNT</th>
              </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                data.map((item: Fields, ix: number) => (
                  <tr key={ix} className="border">
                    <td className="px-6 py-2">{item?.full_name}</td>
                    <td className="px-6 py-2">{item?.sex}</td>
                    <td className="px-6 py-2">REF: {item?.loan_id}</td>
                    <td className="px-6 py-2">
                        <div className='font-bold'>{item.loan_type}</div>
                        <div className='text-sm'>{item.loan_subtype}</div>
                        <div className='text-sm'>{item.loan_typ_description}</div>
                    </td>
                    <td className="px-6 py-2 text-center">{item?.terms_month} / {item?.interest}%</td>
                   
                    <td className="px-6 py-2">&#8369; {item?.principal?.toLocaleString() }</td>
                    <td className="px-6 py-2">&#8369; {item?.loan_expected?.toLocaleString() }</td>
                    <td className="px-6 py-2">&#8369; {item?.loan_paid?.toLocaleString() }</td>
                    <td className="px-6 py-2 text-center">{item?.payment_count}</td>
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
