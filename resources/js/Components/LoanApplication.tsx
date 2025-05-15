import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { App, Button, Form, Input, InputNumber, Select, Upload, UploadProps } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { error } from 'console';
import React, { useEffect } from 'react'
import {
    UploadOutlined
  } from '@ant-design/icons';
import SignaturePadComponent from './SignaturePad';
import { Save } from 'lucide-react';
import { InsuranceType } from '@/types/insuranceType';
import { InsuranceTypeAgeBracket } from '@/types/insuranceTypeAgeBracket';


const LoanApplication = () => {

   
    
    const  { props } = usePage<PageProps>();
    const csrfToken = props.csrf_token ?? ""; // Ensure csrfToken is a string

    const [form] = Form.useForm();
    const [errors, setErrors] = React.useState<any>({});
    const [loanTypes, setLoanTypes] = React.useState<any>([]);
    const [loanSubtypes, setLoanSubtypes] = React.useState<any>([]);
    const [insuranceTypes, setInsuranceTypes] = React.useState<InsuranceType[]>([]);
    const [insuranceTypeAgeBracket, setInsuranceTypeAgeBracket] = React.useState<InsuranceTypeAgeBracket[]>([]);

    const [loading, setLoading] = React.useState<boolean>(false);
    const { notification, message} = App.useApp();
    

    const initLoad = () => {
        axios.get('/load-loan-types').then(res=>{
            setLoanTypes(res.data);
        });
        axios.get('/load-insurance-types').then(res=>{
            setInsuranceTypes(res.data);
        });
    }

    useEffect(() => { 
        initLoad();
    }, []);

    const handleChangeLoanType = (value:any) => { 
        const selectedLoanType = loanTypes.find((item:any) => item.id === Number(value));
        form.setFields([{ name: 'loan_subtype_id', value: null }]);
        //console.log(selectedLoanType.loan_subtypes);
        
        if (selectedLoanType) {
            setLoanSubtypes(selectedLoanType.loan_subtypes || []); // Fallback to an empty array if no subtypes exist
        } else {
            setLoanSubtypes([]); // Reset subtypes if no loan type is selected
        }
    }

    const handleChangeLoanSubtype = (value: any) => {
        const selectedLoanSubtypes = loanSubtypes.find((item:any) => item.id === Number(value));
        //console.log('handle change loan subtype', selectedLoanSubtypes);

        form.setFields([
            { name: 'terms_month', value: selectedLoanSubtypes.terms_month },
            { name: 'interest', value: selectedLoanSubtypes.percent }
        ]);
    } 


     const handleChangeInsuranceType = (value:any) => { 
        const selectedInsuranceType = insuranceTypes.find((item:any) => item.id === Number(value));
        form.setFields([{ name: 'insurance_type_agebracket_id', value: null }]);

        if (selectedInsuranceType) {
            setInsuranceTypeAgeBracket(selectedInsuranceType.insurance_types_agebrackets || []); // Fallback to an empty array if no subtypes exist
        } else {
            setInsuranceTypeAgeBracket([]); // Reset subtypes
        }
    }
     const handleChangeInsuranceTypeAgeBrakcet = (value: any) => {
        const selectedInsuranceAgeBracket = insuranceTypeAgeBracket.find((item:any) => item.id === Number(value));
        //console.log('handle change loan subtype', selectedLoanSubtypes);

        form.setFields([
            { name: 'insurance_payment', value: selectedInsuranceAgeBracket?.amount },
            { name: 'benefits', value: selectedInsuranceAgeBracket?.benefits }
        ]);
    } 


    const onFinish = (values:any) => {
        //axios.post('/apply-loan', values).then(res=>{  });
        //console.log('submitted values ', values);

        setErrors({})
        setLoading(true)

        axios.post('/member/my-loans', values).then(res=>{
            setLoading(false)
            if(res.data.status === 'saved'){
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

  
    const uploadProps: UploadProps = {
        name: "kyc_id",
        action: "/member/temp-upload",
        headers: {
            "X-CSRF-Token": csrfToken,
        },
        beforeUpload: (file) => {
            const isPNG = file.type === "image/png";
            const isJPG = file.type === "image/jpeg";

            if (!isPNG && !isJPG) {
                message.error(`${file.name} is not a png/jpg file`);
            }
            return isPNG || isJPG || Upload.LIST_IGNORE;
        },

        onChange(info) {
            // if (id > 0) {
            //     //console.log(info);
            //     //form.setFieldValue('featured_image', info.file.name)
            // } else {
               
            // }
            info.file.url = '/storage/temp/' + info.file.response
            //console.log(info.file);
            
            if (info.file.status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully`
                );
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(info) {
            axios
                .post("/member/temp-remove/" + info.response)
                .then((res) => {
                    if (res.data.status === "temp_deleted") {
                        message.success("File removed.");
                    }
                });
        },
    };



    const uploadCoMakerProps: UploadProps = {
        name: "co_maker_identification",
        action: "/member/co-maker-temp-upload",
        headers: {
            "X-CSRF-Token": csrfToken,
        },
        beforeUpload: (file) => {
            const isPNG = file.type === "image/png";
            const isJPG = file.type === "image/jpeg";

            if (!isPNG && !isJPG) {
                message.error(`${file.name} is not a png/jpg file`);
            }
            return isPNG || isJPG || Upload.LIST_IGNORE;
        },

        onChange(info) {
            // if (id > 0) {
            //     //console.log(info);
            //     //form.setFieldValue('featured_image', info.file.name)
            // } else {
               
            // }
            info.file.url = '/storage/temp/' + info.file.response
            //console.log(info.file);
            
            if (info.file.status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully`
                );
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(info) {
            axios
                .post("/member/temp-remove/" + info.response)
                .then((res) => {
                    if (res.data.status === "temp_deleted") {
                        message.success("File removed.");
                    }
                });
        },
    };

 
    
  return (
    <div className="bg-white p-6 shadow-sm">
        <Form 
            initialValues={{ 
                principal: 0,
                shared: 0,
                interest: 0,
                terms: 0,
                terms_month: 0,
                loan_type_id: null,
                loan_subtype_id: null,
                mode_payment: '',
                purpose: '',
                upload: [],
                co_maker: '',
                co_maker_identification: [],
                co_maker_signature: '',
                signature: '',
                insurance_type_id: null,
                insurance_type: '',
                insurance_type_agebracket_id: null,
                benefits: '',
                insurance_payment: 0
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
                label="Share (Savings)"
                name="shared"
                className='w-full'
                validateStatus={errors.shared ? 'error' : ''}
                help={errors.shared ? errors.shared[0] : ''}>
                    <InputNumber type='number' 
                        placeholder="Share (Savings)" 
                        className='p-1 w-full' />
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
            </div>

            <div className='flex flex-col md:flex-row md:gap-x-4'>
                <Form.Item label="Insurance Type"
                    name="insurance_type_id"
                    className='w-full'
                    validateStatus={errors.insurance_type_id ? 'error' : ''}
                    help={errors.insurance_type_id ? errors.insurance_type_id[0] : ''}>
                        <Select 
                            placeholder="Insurance"
                            className='w-full h-10'
                            onChange={handleChangeInsuranceType}
                            options={ insuranceTypes.map((item:InsuranceType) => (
                                {
                                    label: item.insurance_type,
                                    value: item.id
                                }
                               
                            ))}
                        />
                </Form.Item>

                <Form.Item label="Insurance Sub Type"
                    name="insurance_type_agebracket_id"
                    className='w-full'
                    validateStatus={errors.insurance_type_agebracket_id ? 'error' : ''}
                    help={errors.insurance_type_agebracket_id ? errors.insurance_type_agebracket_id[0] : ''}>
                        <Select 
                            placeholder="Insurance by age bracket"
                            className='w-full h-10'
                            onChange={handleChangeInsuranceTypeAgeBrakcet}
                            options={ insuranceTypeAgeBracket.map((item:InsuranceTypeAgeBracket) => (
                                {
                                    label: item.title,
                                    value: item.id
                                }
                            ))}
                        />
                </Form.Item>
            </div>

            <div>
                <Form.Item label="Insurance Benefits"
                    name="benefits"
                    className='w-full'
                    validateStatus={errors.benefits ? 'error' : ''}
                    help={errors.benefits ? errors.benefits[0] : ''}>
                        <Input type='text'
                            placeholder="Benefits" 
                            className='p-2 w-full' />
                </Form.Item>
            </div>

            <div>
                <Form.Item label="Insurance Payment"
                    name="insurance_payment"
                    className='w-full'
                    validateStatus={errors.insurance_payment ? 'error' : ''}
                    help={errors.insurance_payment ? errors.insurance_payment[0] : ''}>
                        <Input type='text'
                            readOnly
                            placeholder="Insurance Amount" 
                            className='p-2 w-full' />
                </Form.Item>

            </div>

            <hr />

            <Form.Item
                name="upload"
                valuePropName="fileList"
                className="w-full mt-4"
                label="Select Valid Id"
                getValueFromEvent={(e) => {
                    // Normalize the value to fit what the Upload component expects
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e?.fileList;
                }}
                validateStatus={errors.upload ? "error" : ""}
                help={errors.upload ? errors.upload[0] : ""}
            >
                <Upload
                    maxCount={1}
                    // fileList={fileList}
                    listType="picture"
                    {...uploadProps}
                >
                    <Button icon={<UploadOutlined />}>
                        Click to Upload
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item
                hidden
                name="interest">
                <Input />
            </Form.Item>

            <hr />
            
            <Form.Item
                label="Co-Maker Name"
                name="co_maker"
                className='mt-4 w-full'
                validateStatus={errors.co_maker ? 'error' : ''}
                help={errors.co_maker ? errors.co_maker[0] : ''}>
                    <Input type='text'
                        placeholder="Co-Maker" 
                        className='p-2 w-full' />
            </Form.Item>
            
            <Form.Item
                name="co_maker_identification"
                valuePropName="fileList"
                className="w-full"
                label="Co-Maker Valid Id"
                getValueFromEvent={(e) => {
                    // Normalize the value to fit what the Upload component expects
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e?.fileList;
                }}
                validateStatus={errors.co_maker_identification ? "error" : ""}
                help={errors.co_maker_identification ? errors.co_maker_identification[0] : ""}
            >
                <Upload
                    maxCount={1}
                    // fileList={fileList}
                    listType="picture"
                    {...uploadCoMakerProps}
                >
                    <Button icon={<UploadOutlined />}>
                        Click to Upload
                    </Button>
                </Upload>
            </Form.Item>

            <div className='border px-4 pt-4'>
                <Form.Item name="co_maker_signature" 
                    label="Co-Maker Signature"
                    validateStatus={errors.co_maker_signature ? 'error' : ''}
                    help={errors.co_maker_signature ? errors.co_maker_signature[0] : ''}>
                    <SignaturePadComponent  onSave={(v)=>{
                        form.setFieldsValue({...form, co_maker_signature:v})
                        notification.success({
                            message: 'Signature uploaded!',
                        })
                    }} />
                </Form.Item>
            </div>
           

            <div className='border px-4 pt-4 mt-4'>
                <Form.Item name="signature" 
                    label="My Signature"
                    validateStatus={errors.signature ? 'error' : ''}
                    help={errors.signature ? errors.signature[0] : ''}>
                    <SignaturePadComponent  onSave={(v)=>{
                        form.setFieldsValue({...form, signature:v})
                        notification.success({
                            message: 'Signature uploaded!',
                        })
                    }} />
                </Form.Item>
            </div>


            <div className='mt-4'>
                <Button type="primary" 
                    htmlType="submit"
                    loading={loading}
                    icon={<Save size={16}/>}>
                    Submit 
                </Button>
            </div>
        </Form>
    </div>
  )
}

export default LoanApplication