import { Head } from '@inertiajs/react'
import { Button, DatePicker } from 'antd'
import axios from 'axios'
import { ArrowLeft, PrinterCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Fields {
  full_name?: string;
  sex?: string;
  loan_id?:number;
  insurance_type_name?: string;
  title?: string;
  benefits?: string;
  claimable_amount?: number;
  insurance_expected?: number;
  insurance_paid?: number;
  insurance_payment_count?: number;
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

    axios.get(`/reports/get-insurances?${params}`).then(res=>{
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
          
    

          <div className='font-bold text-center mb-4'>SUMMARY OF INSURANCE</div>
          <table className='border w-full'>
            <thead className='bg-gray-100 font-bold text-left'>
              <tr>
                <th className='py-2 px-6'>NAME</th>
                <th className='py-2 px-6'>SEX</th>
                <th className='py-2 px-6'>LOAN REFERENCE</th>
                <th className='py-2 px-6'>INSURANCE TYPE</th>
                <th className='py-2 px-6'>TITLE / BENIFITS</th>
                <th className='py-2 px-6'>INSURANCE EXPECTED</th>
                <th className='py-2 px-6'>INSURANCE PAID</th>
                <th className='py-2 px-6'>INSURANCE PAYMENT COUNT</th>
              </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                data.map((item: Fields, ix: number) => (
                  <tr key={ix} className="border">
                    <td className="px-6 py-2">{item?.full_name}</td>
                    <td className="px-6 py-2">{item?.sex}</td>
                    <td className="px-6 py-2">REF: {item?.loan_id}</td>
                    <td className="px-6 py-2">{ item?.insurance_type_name }</td>
                    <td className="px-6 py-2">
                        <span className='font-bold'>{item.title} <br></br></span>
                        <span className='text-sm'>
                            {item.benefits}
                        </span>

                    </td>
                    <td className="px-6 py-2">&#8369; {item?.insurance_expected?.toLocaleString() }</td>
                    <td className="px-6 py-2">&#8369; {item?.insurance_paid?.toLocaleString() }</td>
                    <td className="px-6 py-2">{item?.insurance_payment_count?.toLocaleString() }</td>
                    
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
