import BmAuthLayout from '@/Layouts/BmAuthLayout'
import { PageProps } from '@/types'
import { Loan } from '@/types/loan'
import { LoanSubtype } from '@/types/loanSubtype'
import { LoanType } from '@/types/loanType'
import { Head } from '@inertiajs/react'
import { App, Button, Form, Input, InputNumber, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import { ArrowLeft, ThumbsUp } from 'lucide-react'
import React, { ReactNode, useEffect, useState } from 'react'
import dayjs from 'dayjs'


const dateFormat = (ndate:Date, format:string) =>{
    return dayjs(ndate).format(format)
}
const BmMemberLoanDetails = ({ auth, loan }: PageProps<{ loan: Loan }>) => {

    const [fields, setFields] = useState<Loan>();
    const [errors, setErrors] = useState<any>({})
    const [loanTypes, setLoanTypes] = useState<any[]>([]);
    const [loanSubtypes, setLoanSubtypes] = useState<any[]>([]);
    const { modal, notification } = App.useApp();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setFields(prev => ({
            ...prev,
            [name]: value
        }));
    }


    const loadLoanTypes = () => {
        axios.get('/load-loan-types').then(res => {
            setLoanTypes(res.data);
        });
    }

    useEffect(() => {
        loadLoanTypes();
        
    }, []);

    const handleChangeLoanType = (value: string | number | null | undefined) => {

        const selectedLoanType = loanTypes.find((item: LoanType) => item.id === Number(value));
        //form.setFieldsValue({ name: 'loan_subtype_id', value: null });
        setFields({
            ...fields,
            loan_subtype_id: null,
            loan_type_id: value,
            interest: 0,
            terms_month: 0

        });

        //console.log(selectedLoanType.loan_subtypes);

        if (selectedLoanType) {
            setLoanSubtypes(selectedLoanType.loan_subtypes || []); // Fallback to an empty array if no subtypes exist
        } else {
            setLoanSubtypes([]); // Reset subtypes if no loan type is selected
        }
    }

    const handleChangeLoanSubtype = (value: string | number | null | undefined) => {
        const selectedLoanSubtypes: LoanSubtype = loanSubtypes.find((item: any) => item.id === Number(value));
        //console.log('handle change loan subtype', selectedLoanSubtypes);
        console.log(selectedLoanSubtypes.terms_month);
        
        setFields({
            ...fields,
            loan_subtype_id: selectedLoanSubtypes.id,
            terms_month: selectedLoanSubtypes.terms_month,
            interest: selectedLoanSubtypes.percent
        });
    }

    useEffect(() => {
       //handleChangeLoanType(loan?.loan_type_id)
        setFields(prev => ({
            ...prev,
            id: loan?.id,
            purpose: loan?.purpose,
            co_maker: loan?.co_maker,
            loan_type_id: loan?.loan_type_id,
            loan_subtype_id: loan?.loan_subtype_id,
            principal: loan?.principal,
            terms_month: loan?.terms_month,
            mode_payment: loan?.mode_payment,
            interest: loan?.interest,
            user: loan?.user,
            user_id: loan.user_id,
            kyc_id: loan.kyc_id,
            co_maker_identification: loan.co_maker_identification,
            co_maker_signature: loan?.co_maker_signature,
            signature: loan?.signature,
            insurance_payment: loan.insurance_payment
        }));
    }, [])

    useEffect(()=>{
        const selectedLoanType = loanTypes.find((item: LoanType) => item.id === Number(loan?.loan_type_id));

        if (selectedLoanType) {
            setLoanSubtypes(selectedLoanType.loan_subtypes || [])// Fallback to an empty array if no subtypes exist
        } else {
            setLoanSubtypes([]); // Reset subtypes if no loan type is selected
        }
    },[loanTypes])


    const checkListDetails = ()  => {
        if(!loan?.loan_details || loan.loan_details?.length < 1){
            return (
                <div className='italic'>
                    No loan details yet.
                </div>
            )
        }
    }

    const handleApprove = () => {
        modal.confirm({title: "Approved?", content: `Are you sure you want to approve this member?`, 
            onOk: ()=>{
                axios.post('/bm/approve-loan', fields).then(res=>{
                    if(res.data.status === 'approved'){
                        notification.success({ placement: 'bottomRight', message: 'Approved!', description: 'Member loan approved successfully.'})
                    }
                }).catch(err => {
                    if(err.response.data.errors.loan){
                        notification.error({
                            placement: 'bottomRight',
                            description: 'Error: ' + err.response.data.message,
                            message: 'Approved Already!'
                        });
                    }

                    if(err.response.data.errors){
                        notification.error({
                            placement: 'bottomRight',
                            description: 'Error: ' + err.response.data.message,
                            message: 'Error!'
                        });
                    }
                })
        }})
    }
    
    return (
        <BmAuthLayout user={auth.user}>
            <Head title="Loan Detail " />

            <div className='flex mt-10 justify-center items-center'>
                {/* card */}
                <div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
                    md:w-[720px] overflow-auto'>

                    <div>
                        <Button className='mb-4'
                            icon={<ArrowLeft size={16} />}
                            iconPosition='start' 
                            onClick={ () => { window.history.back() } }>Back</Button>
                            

                        <div className='flex flex-col gap-2 md:flex-row'>
                            <Form.Item
                                layout='vertical'
                                label='Last Name'
                                className='w-full'>
                                <Input readOnly
                                    value={fields?.user.lname}
                                    placeholder="Last Name ..." />
                            </Form.Item>

                            <Form.Item
                                layout='vertical'
                                label='First Name'
                                className='w-full'>
                                <Input readOnly
                                    value={fields?.user.fname}
                                    placeholder="First Name ..." />
                            </Form.Item>

                            <Form.Item
                                layout='vertical'
                                label='First Name'
                                className='w-full'>
                                <Input readOnly
                                    value={fields?.user.mname}
                                    placeholder="Middle Name ..." />
                            </Form.Item>
                        </div>

                        <Form.Item
                            layout='vertical'
                            label='Purpose'
                            validateStatus={errors.purpose ? 'error' : ''}
                            help={errors.purpose ? errors.purpose[0] : ''}>
                            <TextArea value={fields?.purpose}
                                onChange={handleChange}
                                placeholder="Purpose..." rows={4} />
                        </Form.Item>

                        <div className='flex gap-4'>
                            <Form.Item
                                layout='vertical'
                                className='w-full'
                                label='Loan Type'
                                validateStatus={errors.loan_type_id ? 'error' : ''}
                                help={errors.loan_type_id ? errors.loan_type_id[0] : ''}>
                                <Select placeholder="Loan Type..."
                                    value={fields?.loan_type_id ?? undefined}
                                    onChange={handleChangeLoanType}
                                    options={loanTypes.map((loanType: LoanType) => (
                                        { value: loanType.id, label: loanType.loan_type }
                                    ))} />
                            </Form.Item>

                            <Form.Item
                                layout='vertical'
                                className='w-full'
                                label='Loan Subtype'
                                validateStatus={errors.loan_subtype_id ? 'error' : ''}
                                help={errors.loan_subtype_id ? errors.loan_subtype_id[0] : ''}>
                                <Select placeholder="Subtype..."
                                    value={fields?.loan_subtype_id}
                                    onChange={handleChangeLoanSubtype}
                                    options={loanSubtypes.map((subtype: LoanSubtype) => (
                                        { value: subtype.id, label: subtype.loan_subtype }
                                    ))} />
                            </Form.Item>
                        </div>

                        <div className='flex gap-4'>
                            <Form.Item
                                layout='vertical'
                                label='Terms in Month'
                                className='w-full'
                                validateStatus={errors.terms_month ? 'error' : ''}
                                help={errors.terms_month ? errors.terms_month[0] : ''}>
                                <InputNumber type='number'
                                    value={fields?.terms_month}
                                    readOnly
                                    className='w-full'
                                    placeholder="Terms in Month" />
                            </Form.Item>

                            <Form.Item
                                layout='vertical'
                                label='Interest(%)'
                                className='w-full'
                                validateStatus={errors.interest ? 'error' : ''}
                                help={errors.interest ? errors.interest[0] : ''}>
                                <InputNumber type='number'
                                    readOnly
                                    className='w-full'
                                    value={fields?.interest}
                                    onChange={(value) => setFields(prev => ({ ...prev, interest: value ?? 0 }))}
                                    placeholder="Interest" />
                            </Form.Item>
                        </div>

                        <div>
                            <Form.Item
                                layout='vertical'
                                label="Mode of Payment"
                                className='w-full'
                                validateStatus={errors.mode_payment ? 'error' : ''}
                                help={errors.mode_payment ? errors.mode_payment[0] : ''}>
                                <Select 
                                    placeholder="Mode of Payment"
                                    className='w-full h-10'
                                    onChange={ (value) => {
                                        setFields(prev => ({
                                            ...prev,
                                            mode_payment: value
                                        }));
                                    }}
                                    value={fields?.mode_payment}
                                    options={[
                                        {value: 'DAILY',  label: 'DAILY'},
                                        {value: 'WEEKLY',  label: 'WEEKLY'},
                                        // {value: 'SEMI-MONTHLY',  label: 'SEMI-MONTHLY'},
                                        {value: 'MONTHLY',  label: 'MONTHLY'},
                                        {value: 'QUARTERLY',  label: 'QUARTERLY'},
                                        {value: 'LUMP-SUM',  label: 'LUMP-SUM'},
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                layout='vertical'
                                label='Loan Amount'
                                className='w-full'
                                validateStatus={errors.principal ? 'error' : ''}
                                help={errors.principal ? errors.principal[0] : ''}>
                                <InputNumber type='number'
                                    value={fields?.principal}
                                    className='w-full'
                                    onChange={(value) => setFields(prev => ({ ...prev, principal: value ?? 0 }))}
                                    placeholder="Loan Amount" />
                            </Form.Item>
                        </div>
                        {/* <Button type={"primary"} onClick={handleApproveLoan}>Approve Loan</Button> */}
                     

                        <div className='bg-gray-100 p-4 mt-4'>
                            <label htmlFor="co_maker">Co-Maker</label>
                            <div className='mb-2'>Name: {fields?.co_maker}</div>
                            <img id='co_maker' src={`/storage/identifications/${fields?.co_maker_identification}`} alt="Co-Maker Identification"></img>
                            <img id='co_maker' src={fields?.co_maker_signature} alt="Signature"></img>
                        </div>

                        <div className='bg-gray-100 p-4 mt-4'>
                            <label htmlFor="signature">Loan Applicant</label>
                            <div className='mb-2'>{fields?.user.lname}, {fields?.user.fname} {fields?.user.mname}</div>
                            <img id='co_maker' src={`/storage/identifications/${fields?.kyc_id}`} alt="Identification"></img>
                            <img id='signature' src={fields?.signature} alt="Signature"></img>
                        </div>

                        <div className='my-4'>
                            <Button icon={<ThumbsUp size={16}/>}
                                onClick={handleApprove}
                                type='primary'>
                                Approve Loan
                            </Button>
                        </div>

                        <hr />

                        <div className='font-bold my-4'>
                            LOAN ADDTIONAL DETAILS
                        </div>

                        <div className='mb-2'>
                            { loan?.loan_details?.map(item => (
                                <div key={item.id} className='px-2'>

                                    <div className='px-4 py-3 my-2 border rounded-md'>
                                        <div className='mb-2'>

                                            {item.is_paid === 1 ? (
                                                <span className='font-bold text-[10px] text-white bg-green-500 px-2 py-1 rounded-md'>PAID</span>
                                            ) : (
                                                <span className='font-bold text-[10px] text-white bg-red-500 px-2 py-1 rounded-md'>UNPAID</span>
                                            ) }
                                        </div>

                                        <div className=' flex flex-col md:flex-row gap-6
                                            justify-between'>
                                            <div>
                                                <div className='font-semibold'>Due Date</div>
                                                <div>{dateFormat(item.due_date, 'MMM DD, YYYY')}</div>
                                                
                                            </div>
                                            <div>
                                                <div className='font-semibold'>Amount Paid</div>
                                                <div>&#8369; {item.amount_paid.toLocaleString()}</div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                            {checkListDetails()}
                        </div>
                    </div>

                </div>

            </div>

        </BmAuthLayout>
    )
}

export default BmMemberLoanDetails
