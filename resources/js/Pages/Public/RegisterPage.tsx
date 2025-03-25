import React, { useEffect, useState } from 'react'
import { App, Button, Divider, Form, Input, Layout, Modal, Select, Steps } from 'antd'
import { ArrowLeftOutlined, FileAddOutlined, UserOutlined } from '@ant-design/icons'
import { User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { EducationLevel } from '@/types/educationLevel';
import { Captions, Divide } from 'lucide-react';

export default function RegisterPage({ educationLevels }: { educationLevels: EducationLevel[] }) {

    const { message, modal, notification } = App.useApp();
    const [loading, setLoading] = useState<boolean>(false);
    const [provinces, setProvinces] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [barangays, setBarangays] = useState<any[]>([]);



    const [form] = Form.useForm();
    const [errors, setErrors] = useState<any>({});
   
    const { data, setData } = useForm({
        username: '',
        password: '',
        password_confirmation: '',
        lname: '',
        fname: '',
        mname: '',
        sex: '',
        suffix: '',
        email: '',
        contact_no: '',
        education_level: '',

        province: null,
        city: null,
        barangay: null,
        street: '',
    });

    const submit = () => {
        
        console.log('data', data);
  
        //return;
        setLoading(true);

        axios.post('/register', data).then(res => {
            setLoading(false);

            if (res.data.status === 'registered') {

                modal.info({
                    title: 'Registration Success!',
                    content: 'Your account information has been successfully submitted and will be reviewed by PAGLAUM. You will be notified via email once your account is activated.',
                    onOk: () => {
                        router.visit('/');
                    }
                });
            }
        }).catch((error: any) => {
            setLoading(false);
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        })

    }


    const loadProvinces = () => {
        axios.get('/load-provinces').then(res=>{
            setProvinces(res.data);
        })
    }

    const handleChangeProvince = (value:any) => {
        setData('province', value)
        setData('city', null)
        setData('barangay', null)
        // form.setFields([
        //     { name: 'city', value: null },
        //     { name: 'barangay', value: null }
        // ]);
        axios.get('/load-cities?provcode=' + value).then(res=>{
            setCities(res.data);
        })
    }
    const handleChangeCity = (value:any) => {
        setData('city', value)
        setData('barangay', null)

        // form.setFields([
        //     { name: 'barangay', value: null }
        // ]);

        axios.get(`/load-barangays?citycode=${value}`).then(res=>{
            setBarangays(res.data);
        })
    }

    useEffect(()=>{
        loadProvinces()
    }, [])


    const [current, setCurrent] = useState(0);
        
    const accountInformation = () => {
        return (
            <>
                <div className='my-6 font-bold text-md text-center'>ACCOUNT INFORMATION</div>
                <Form.Item label="Username"
                    validateStatus={errors?.username ? 'error' : ''}
                    help={errors?.username ? errors?.username[0] : ''}
                >
                    <Input placeholder="ex. juan1234" 
                        value={data.username}
                        onChange={(e)=>setData('username', e.target.value)} 
                        size="large" />
                </Form.Item>


                <Form.Item label="Password"
                    validateStatus={errors?.password ? 'error' : ''}
                    help={errors?.password ? errors?.password[0] : ''}
                >
                    <Input.Password placeholder="*****"
                        value={data.password} 
                        onChange={(e)=>setData('password', e.target.value)} 
                        size="large" />
                </Form.Item>

                <Form.Item label="Confirm Password"
                    validateStatus={errors?.password_confirmation ? 'error' : ''}
                    help={errors?.password_confirmation ? errors?.password_confirmation[0] : ''}
                >
                    <Input.Password placeholder="*****"
                        value={data.password_confirmation}
                        onChange={(e)=>setData('password_confirmation', e.target.value)} 
                        size="large" />
                </Form.Item>
            </>
        )
    };

    const personalInformation = () => {
        return (
            <>
                <div className='my-4 font-bold text-md text-center'>PERSONAL INFORMATION</div>
                <div className='flex flex-col gap-x-4 sm:flex-row'>
                    <Form.Item label="Last Name"
                        className="w-full"
                        validateStatus={errors?.lname ? 'error' : ''}
                        help={errors?.lname ? errors?.lname[0] : ''}
                    >
                        <Input placeholder="ex. Dela Cruz" 
                            value={data.lname}
                            onChange={(e)=>setData('lname', e.target.value)} 
                            size="large" autoComplete='off' />
                    </Form.Item>

                    <Form.Item label="First Name"
                        name="fname"
                        className="w-full"
                        validateStatus={errors?.fname ? 'error' : ''}
                        help={errors?.fname ? errors?.fname[0] : ''}
                    >
                        <Input placeholder="ex. Juan" size="large" 
                            onChange={(e)=>setData('fname', e.target.value)} 
                            value={data.fname}
                            autoComplete='off' />
                    </Form.Item>
                </div>

                <div className='flex flex-col gap-x-4 sm:flex-row'>

                    <Form.Item label="Middle Name"
                        className="w-full"
                        validateStatus={errors?.mname ? 'error' : ''}
                        help={errors?.mname ? errors?.mname[0] : ''}
                    >
                        <Input placeholder="ex. Dela Cruz"
                        onChange={(e)=>setData('mname', e.target.value)} 
                        value={data.mname} 
                        size="large" />
                    </Form.Item>

                    <Form.Item label="Suffix"
                        className="w-full"
                        name="suffix"
                        validateStatus={errors?.suffix ? 'error' : ''}
                        help={errors?.suffix ? errors?.suffix[0] : ''}
                    >
                        <Input placeholder="ex. Jr, II, III"
                            onChange={(e)=>setData('suffix', e.target.value)} 
                            value={data.suffix} 
                            size="large" />
                    </Form.Item>
                </div>

                <div className='flex flex-col gap-x-4 sm:flex-row'>
                    <Form.Item label="Email"
                        className='w-full'
                        validateStatus={errors?.email ? 'error' : ''}
                        help={errors?.email ? errors?.email[0] : ''}
                    >
                        <Input placeholder="ex. juan@mail.com"
                            onChange={(e)=>setData('email', e.target.value)} 
                            value={data.email} 
                            size="large" />
                    </Form.Item>

                    <Form.Item label="Contact No."
                        className='w-full'
                        validateStatus={errors?.contact_no ? 'error' : ''}
                        help={errors?.contact_no ? errors?.contact_no[0] : ''}
                    >
                        <Input placeholder="ex. 09361122334"
                            onChange={(e)=>setData('contact_no', e.target.value)} 
                            value={data.contact_no} 
                            size="large" />
                    </Form.Item>

                    
                </div>
                
                <div className='flex flex-col gap-x-4 sm:flex-row'>
                    <Form.Item
                        label="Sex"
                        className="w-full"
                        validateStatus={errors.sex ? "error" : ""}
                        help={errors.sex ? errors.sex[0] : ""}
                    >
                        <Select
                            onChange={(value)=>setData('sex', value)} 
                            value={data.sex} 
                            className='h-10'
                            options={[
                                { value: "MALE", label: "MALE" },
                                { value: "FEMALE", label: "FEMALE" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Education Level"
                        className="w-full"
                        validateStatus={errors.education_level ? "error" : ""}
                        help={errors.education_level ? errors.education_level[0] : ""}
                    >
                        <Select
                            className="w-full h-10"
                            onChange={(value)=> setData('education_level', value) } 
                            value={data.education_level} 
                            options={educationLevels.map((level: EducationLevel) => ({ 
                                value: level.education_level, 
                                label: level.education_level 
                            }))}
                        />
                    </Form.Item>
                </div>
            </>
        );
    }

    const addressInformation = () => {
        return (
            <>
                <div className='my-4 font-bold text-md text-center'>ADDRESS INFORMATION</div>
                            
                <Form.Item
                    label="Province"
                    className="w-full"
                    validateStatus={errors.province ? "error" : ""}
                    help={errors.province ? errors.province[0] : ""}
                >
                    <Select
                        className="w-full h-10"
                        onChange={handleChangeProvince}
                        value={data.province}
                        options={provinces.map((item: any) => ({ 
                            value: item.provCode, 
                            label: item.provDesc 
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label="City"
                    className="w-full"
                    validateStatus={errors.city ? "error" : ""}
                    help={errors.city ? errors.city[0] : ""}
                >
                    <Select
                        className="w-full h-10"
                        onChange={handleChangeCity}
                        value={data.city}
                        options={cities.map((item: any) => ({ 
                            value: item.citymunCode, 
                            label: item.citymunDesc 
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Barangay"
                    className="w-full"
                    validateStatus={errors.barangay ? "error" : ""}
                    help={errors.barangay ? errors.barangay[0] : ""}
                >
                    <Select
                        className="w-full h-10"
                        onChange={(value) => setData('barangay', value)}
                        value={data.barangay}
                        options={barangays.map((item: any) => ({ 
                            value: item.brgyCode, 
                            label: item.brgyDesc 
                        }))}
                    />
                </Form.Item>

                <Form.Item label="Street"
                    className='w-full'
                    validateStatus={errors?.street ? 'error' : ''}
                    help={errors?.street ? errors?.street[0] : ''}
                >
                    <Input placeholder="ex. Juan Dela Cruz St."
                        onChange={(e) => setData('street', e.target.value)}
                        value={data.street}
                        size="large" />
                </Form.Item>

            </>
        )
    }


    const steps = [
        {
          title: 'Account',
          content: accountInformation(),
        },
        {
          title: 'Personal',
          content: personalInformation(),
        },
        {
          title: 'Address',
          content: addressInformation(),
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };
    
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">

                <div className="w-full sm:max-w-xl mt-6 px-6 py-4 bg-white border border-1 overflow-hidden sm:rounded-lg shadow-sm my-5">

                    <div className="font-bold mb-4 text-lg flex gap-x-2">
                        <Button icon={<ArrowLeftOutlined/>}
                        onClick={()=>{window.history.back()}}></Button>
                        REGISTER
                    </div>

                    <Divider />

                    {/* <Form layout="vertical"
                        autoComplete='off'
                        form={form}
                        onFinish={submit}
                        initialValues={{
                            username: '',
                            password: '',
                            password_confirmation: '',

                            lname: '',
                            fname: '',
                            mname: '',
                            suffix: '',
                            email: '',
                            sex: '',
                            birthdate: null,
                            birthplace: '',

                            province: '',
                            city: '',
                            barangay: '',
                            street: '',
                            zipcode: '',
                        }}
                    >
                        
                    </Form> */}
                    <Form layout='vertical'>
                        <Steps current={current} items={items} />
                        <div>{steps[current].content}</div>
                        <div style={{ marginTop: 24 }} className='flex gap-2'>
                            {current > 0 && (
                                <Button danger onClick={() => prev()}>
                                    Previous
                                </Button>
                            )}

                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    Next
                                </Button>
                            )}

                            {current === steps.length - 1 && (

                                <Button className='ml-auto font-bold'
                                    onClick={submit}
                                    icon={<UserOutlined />}
                                    type="primary">
                                    SUBMIT APPLICATION
                                </Button>
                            )}
                        </div>

                    </Form>
                    
                </div>
            </div>


          

        </>



    )
}
