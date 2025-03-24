import { Button, Form, Input, InputNumber, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { error } from 'console';
import React, { useEffect } from 'react'

const LoanApplication = () => {

    const [form] = Form.useForm();
    const [errors, setErrors] = React.useState<any>({});
    const [loanTypes, setLoanTypes] = React.useState<any>([]);
    const [loanSubtypes, setLoanSubtypes] = React.useState<any>([]);

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

        console.log(selectedLoanType);
        if (selectedLoanType) {
            setLoanSubtypes(selectedLoanType.loan_subtypes || []); // Fallback to an empty array if no subtypes exist
        } else {
            setLoanSubtypes([]); // Reset subtypes if no loan type is selected
        }

        console.log(form);
        
    }


    const onFinish = (values:any) => {
        //axios.post('/apply-loan', values).then(res=>{  });
        console.log(values);
        
    }

 
    
  return (
    <div className="bg-white p-6 shadow-sm">
        <Form 
            initialValues={{ 
                principal: 0,
                interest: 0,
                terms_month: 0,
                loan_type_id: null,
                loan_subtype_id: null, 
                guarantor: '',
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
                    <TextArea rows={3} placeholder="Purpose..." 
                        className='p-2' />
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
                    label="Loan Type"
                    name="loan_subtype_id"
                    className='w-full'
                    validateStatus={errors.loan_subtype_id ? 'error' : ''}
                    help={errors.loan_subtype_id ? errors.loan_subtype_id[0] : ''}>
                    <Select 
                        placeholder="Select Loan Sub Type"
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