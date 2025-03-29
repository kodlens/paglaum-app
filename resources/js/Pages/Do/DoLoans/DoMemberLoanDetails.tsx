import DoAuthLayout from '@/Layouts/DoAuthLayout'
import { PageProps } from '@/types'
import { Loan } from '@/types/loan'
import { LoanSubtype } from '@/types/loanSubtype'
import { LoanType } from '@/types/loanType'
import { Head } from '@inertiajs/react'
import {Button, Form, Input, InputNumber, Select} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DoMemberLoanDetails = ({ auth, loan }: PageProps<{ loan:Loan }>) => {

  const [fields, setFields] = useState<Loan>();
  const [errors, setErrors] = useState<any>({})
  const [loanTypes, setLoanTypes] = useState<any[]>([]);
  const [loanSubtypes, setLoanSubtypes] = useState<any[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFields(prev => ({
      ...prev,
      [name]: value
    }));
  }


  const loadLoanTypes = () => {
    axios.get('/load-loan-types').then(res=>{
      setLoanTypes(res.data);
    });
  }

  useEffect(() => {
    loadLoanTypes();
  }, []);

  const handleChangeLoanType = (value: string | number | null | undefined) => {

    const selectedLoanType = loanTypes.find((item:LoanType) => item.id === Number(value));
    //form.setFieldsValue({ name: 'loan_subtype_id', value: null });
    setFields(prev => ({
      ...prev,
      loan_subtype_id: null,
    }));

    console.log(selectedLoanType.loan_subtypes);

    if (selectedLoanType) {
      setLoanSubtypes(selectedLoanType.loan_subtypes || []); // Fallback to an empty array if no subtypes exist
    } else {
      setLoanSubtypes([]); // Reset subtypes if no loan type is selected
    }
  }

  const handleChangeLoanSubtype = (value: string | number | null | undefined) => {
    const selectedLoanSubtypes:LoanSubtype = loanSubtypes.find((item:any) => item.id === Number(value));
    console.log('handle change loan subtype', selectedLoanSubtypes);

    setFields(prev => ({
      ...prev,
      loan_subtype_id: selectedLoanSubtypes.id
    }));
  }



  useEffect(()=>{
    //handleChangeLoanType(loan?.loan_type_id)
    setFields( prev =>  ({
      ...prev,
      purpose: loan?.purpose,
      guarantor: loan?.guarantor,
      loan_type_id: loan?.loan_type_id,
      loan_subtype_id: null,
      principal: loan?.principal,
      terms_month: loan?.terms_month,
      interest: loan?.interest,
      user: loan?.user,
    }));

    const selectedLoanType = loanTypes.find((item:LoanType) => item.id === Number(loan?.loan_type_id));
    if (selectedLoanType) {
      setLoanSubtypes(selectedLoanType.loan_subtypes || [])// Fallback to an empty array if no subtypes exist
    } else {
      setLoanSubtypes([]); // Reset subtypes if no loan type is selected
    }
  }, [])

  const handleApproveLoan = () :void => {
    console.log(fields)
  }

  return (
    <DoAuthLayout user={auth.user}>
      <Head title="Loan Detail " />

      <div className='flex mt-10 justify-center items-center'>
        {/* card */}
        <div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[720px] overflow-auto'>

          <div>

            <div className='flex flex-col gap-2 md:flex-row'>
              <Form.Item
                layout='vertical'
                label='Last Name'
                className='w-full'>
                <Input readOnly
                       value={fields?.user.lname }
                       placeholder="Last Name ..." />
              </Form.Item>

              <Form.Item
                layout='vertical'
                label='First Name'
                className='w-full'>
                <Input readOnly
                       value={fields?.user.fname }
                       placeholder="First Name ..." />
              </Form.Item>

              <Form.Item
                layout='vertical'
                label='First Name'
                className='w-full'>
                <Input readOnly
                       value={fields?.user.mname }
                       placeholder="Middle Name ..." />
              </Form.Item>
            </div>

            <Form.Item
              layout='vertical'
              label='Purpose'
              validateStatus={ errors.purpose ? 'error' : ''}
              help={ errors.purpose ? errors.purpose[0] : ''}>
              <TextArea value={fields?.purpose}
                        onChange={handleChange}
                        placeholder="Purpose..." rows={4} />
            </Form.Item>

            <Form.Item
              layout='vertical'
              label='Guarantor'
              validateStatus={ errors.guarantor ? 'error' : ''}
              help={ errors.guarantor ? errors.guarantor[0] : ''}>
              <Input value={fields?.guarantor}
                     onChange={handleChange}
                     placeholder="Purpose..." />
            </Form.Item>

            <div className='flex gap-4'>
              <Form.Item
                layout='vertical'
                className='w-full'
                label='Loan Type'
                validateStatus={ errors.loan_type_id ? 'error' : ''}
                help={ errors.loan_type_id ? errors.loan_type_id[0] : ''}>
                <Select placeholder="Loan Type..."
                        value={fields?.loan_type_id ?? undefined}
                        onChange={handleChangeLoanType}
                        options={loanTypes.map((loanType:LoanType) => (
                          { value: loanType.id, label: loanType.loan_type }
                        ))} />
              </Form.Item>

              <Form.Item
                layout='vertical'
                className='w-full'
                label='Loan Subtype'
                validateStatus={ errors.loan_subtype_id ? 'error' : ''}
                help={ errors.loan_subtype_id ? errors.loan_subtype_id[0] : ''}>
                <Select placeholder="Subtype..."
                        value={fields?.loan_subtype_id}
                        onChange={handleChangeLoanSubtype}
                        options={loanSubtypes.map((subtype:LoanSubtype) => (
                          { value: subtype.id, label: subtype.loan_subtype }
                        ))} />
              </Form.Item>
            </div>

            <div className='flex gap-4'>
              <Form.Item
                layout='vertical'
                label='Terms in Month'
                className='w-full'
                validateStatus={ errors.terms_month ? 'error' : ''}
                help={ errors.terms_month ? errors.terms_month[0] : ''}>
                <InputNumber type='number'
                             value={fields?.terms_month}
                             className='w-full'
                             onChange={(value) => setFields(prev => ({ ...prev, terms_month: value ?? 0 }))}
                             placeholder="Terms in Month" />
              </Form.Item>

              <Form.Item
                layout='vertical'
                label='Interest(%)'
                className='w-full'
                validateStatus={ errors.interest ? 'error' : ''}
                help={ errors.interest ? errors.interest[0] : ''}>
                <InputNumber type='number'
                             className='w-full'
                             value={fields?.interest}
                             onChange={(value) => setFields(prev => ({ ...prev, interest: value ?? 0 }))}
                             placeholder="Interest" />
              </Form.Item>


              <Form.Item
                layout='vertical'
                label='Loan Amount'
                className='w-full'
                validateStatus={ errors.principal ? 'error' : ''}
                help={ errors.principal ? errors.principal[0] : ''}>
                <InputNumber type='number'
                             value={fields?.principal}
                             className='w-full'
                             onChange={(value) => setFields(prev => ({ ...prev, principal: value ?? 0 }))}
                             placeholder="Loan Amount" />
              </Form.Item>
            </div>
            <Button type={"primary"} onClick={handleApproveLoan}>Approve Loan</Button>

          </div>

        </div>

      </div>

    </DoAuthLayout>

  )
}

export default DoMemberLoanDetails
