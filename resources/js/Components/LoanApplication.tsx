import { App, Button, Form, Input, InputNumber, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { error } from 'console';
import React, { useEffect } from 'react'

const LoanApplication = () => {

    const [form] = Form.useForm();
    const [errors, setErrors] = React.useState<any>({});
    const [loanTypes, setLoanTypes] = React.useState<any>([]);
    const [loanSubtypes, setLoanSubtypes] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const { notification } = App.useApp();
    
    const loadLoanTypes = () => {
        axios.get('/load-loan-types').then(res=>{
            setLoanTypes(res.data);
        });
    }

    useEffect(() => { 
        loadLoanTypes();
    }, []);

    const handleChangeLoanType = (value:any) => { 
        const selectedLoanType = loanTypes.find((item:any) => item.id === Number(value));
        form.setFields([{ name: 'loan_subtype_id', value: null }]);
        console.log(selectedLoanType.loan_subtypes);
        
        if (selectedLoanType) {
            setLoanSubtypes(selectedLoanType.loan_subtypes || []); // Fallback to an empty array if no subtypes exist
        } else {
            setLoanSubtypes([]); // Reset subtypes if no loan type is selected
        }
    }

    const handleChangeLoanSubtype = (value: any) => {
        const selectedLoanSubtypes = loanSubtypes.find((item:any) => item.id === Number(value));
        console.log('handle change loan subtype', selectedLoanSubtypes);

        form.setFields([
            { name: 'terms_month', value: selectedLoanSubtypes.terms_month },
            { name: 'interest', value: selectedLoanSubtypes.percent }
        ]);
    } 


    const onFinish = (values:any) => {
        //axios.post('/apply-loan', values).then(res=>{  });
        //console.log('submitted values ', values);

        setErrors({})
        setLoading(true)

        axios.post('/member/my-loans', values).then(res=>{
            if(res.data.status === 'saved'){
                setLoading(false)
                notification.success({
                    placement: 'topRight',
                    message : 'Saved!',
                    description: 'Loan application successfully submitted.'
                })
                setErrors({})
                form.resetFields()
            }
        }).catch(err => {
            setLoading(false)

            if(err.response.status === 422){
                setErrors(err.response.data.errors)

                if(errors.principal){
                    notification.error({
                        placement: 'bottomRight',
                        description: 'Error: ' + err.response.data.message,
                        message: 'Invalid!'
                    });
                }
            }
            if(err.response.status === 500){
                //console.log(err.response.data);
                
                notification.error({
                    placement: 'bottomRight',
                    description: 'Error: ' + err.response.data.message,
                    message: 'Unknown error occured!'
                });
            }
        })
        
    }

 
    
  return (
    <div className="bg-white p-6 shadow-sm">
        <Form 
            initialValues={{ 
                principal: 0,
                interest: 0,
                terms: 0,
                terms_month: 0,
                loan_type_id: null,
                loan_subtype_id: null,
                guarantor: '',
                mode_payment: '',
                purpose: '',
            }}
            onFinish={onFinish}
            layout='vertical'
            form={form}
            autoComplete='off'>
            

            <Form.Item
                label="Principal"
                name="principal"
                className='w-full'
                validateStatus={errors.principal ? 'error' : ''}
                help={errors.principal ? errors.principal[0] : ''}>
                    <InputNumber type='number' 
                        placeholder="Principal" 
                        className='p-1 w-full' />
            </Form.Item>

            
            <Form.Item
                label="Guarantor"
                name="guarantor"
                validateStatus={errors.guarantor ? 'error' : ''}
                help={errors.guarantor ? errors.guarantor[0] : ''}>
                    <Input placeholder="Guarantor..." 
                        className='p-2' />
            </Form.Item>

             
            <Form.Item
                label="Purpose"
                name="purpose"
                validateStatus={errors.purpose ? 'error' : ''}
                help={errors.purpose ? errors.purpose[0] : ''}>
                    <TextArea rows={3} 
                        placeholder="Purpose..." 
                        className='' />
            </Form.Item>

            <div className='flex flex-col md:flex-row md:gap-4'>
                <Form.Item
                    label="Loan Type"
                    name="loan_type_id"
                    className='w-full'
                    validateStatus={errors.loan_type_id ? 'error' : ''}
                    help={errors.loan_type_id ? errors.loan_type_id[0] : ''}>
                    <Select 
                        placeholder="Select Loan Type"
                        className='w-full h-10'
                        onChange={handleChangeLoanType}>
                        {loanTypes.map((item:any) => (
                            <Select.Option 
                                key={item.id} 
                                value={item.id}>
                                {item.loan_type}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Loan Sub Type"
                    name="loan_subtype_id"
                    className='w-full'
                    validateStatus={errors.loan_subtype_id ? 'error' : ''}
                    help={errors.loan_subtype_id ? errors.loan_subtype_id[0] : ''}>
                    <Select 
                        placeholder="Select Loan Sub Type"
                        onChange={handleChangeLoanSubtype}
                        className='w-full h-10'>
                        {loanSubtypes.map((item:any) => (
                            <Select.Option 
                                key={item.id} 
                                value={item.id}>
                                {item.loan_subtype}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>

            <div className='flex flex-col md:flex-row md:gap-4'>
                <Form.Item
                    label="Terms (Months)"
                    name="terms_month"
                    className='w-full'
                    validateStatus={errors.terms_month ? 'error' : ''}
                    help={errors.terms_month ? errors.terms_month[0] : ''}>

                    <InputNumber type='number' 
                        placeholder="ex 5..." 
                        className='p-1 w-full' />

                </Form.Item>

                <Form.Item
                    label="Mode of Payment"
                    name="mode_payment"
                    className='w-full'
                    validateStatus={errors.mode_payment ? 'error' : ''}
                    help={errors.mode_payment ? errors.mode_payment[0] : ''}>
                    <Select 
                        placeholder="Mode of Payment"
                        className='w-full h-10'
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
                    hidden
                    name="interest">
                    <Input />
                </Form.Item>


            </div>
            


            <div>
                <Button type="primary" 
                    htmlType="submit">
                    Submit 
                </Button>
            </div>
        </Form>
    </div>
  )
}

export default LoanApplication