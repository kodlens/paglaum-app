import React, { useState } from 'react'
import Register from '../Auth/Register'
import { Button, Form, Input, Select } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { User } from '@/types';
import { Head } from '@inertiajs/react';

export default function RegistrationPage() {

    const [data, setData] = useState<User>({
        username: '',
        lname: '',
        fname: '',
        mname: '',
        suffix: '',
        sex: '',
        education_level: '',
        birthdate: null,
        birthplace: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState<any>({});



    const submit = async (values: User) => {
        try {
            
        } catch (error:any) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    }


    const handClickNew = () =>  {
        throw new Error('Function not implemented.');
    }

    return (
        <>
            <Head title="Register"/>
           
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border border-1 overflow-hidden sm:rounded-lg">
                    
                    <div className="font-bold mb-4 text-2xl">REGISTER</div>

                    <Form layout="vertical" 
                        autoComplete='off' 
                        onFinish={submit} 
                        initialValues={{
                            username: '',
                            password: '',
                            password_confirmation: '',
                            lname: '',
                            fname: '',
                            mname: '',
                            suffix: '',
                            birthdate: null,
                            birthplace: '',
                        }}>

                        <Form.Item label="Username"
                            name="username"
                            validateStatus={errors?.username ? 'error' : ''}
                            help={errors?.username ? errors?.username[0] : ''}
                        >
                            <Input placeholder="ex. juan1234" size="large" />
                        </Form.Item>

                        
                        <Form.Item label="Password"
                            name="password"
                            validateStatus={errors?.password ? 'error' : ''}
                            help={errors?.password ? errors?.password[0] : ''}
                        >
                            <Input.Password placeholder="*****" size="large" />
                        </Form.Item>

                        <Form.Item label="Confirm Password"
                            name="password_confirmation"
                            validateStatus={errors?.password_confirmation ? 'error' : ''}
                            help={errors?.password_confirmation ? errors?.password_confirmation[0] : ''}
                        >
                            <Input.Password placeholder="*****" size="large" />
                        </Form.Item>


                        <div className='flex flex-col gap-x-4 sm:flex-row'>


                            <Form.Item label="Last Name"
                                name="lname"
                                validateStatus={errors?.lname ? 'error' : ''}
                                help={errors?.lname ? errors?.lname[0] : ''}
                            >
                                <Input placeholder="ex. Dela Cruz"  size="large" autoComplete='off' />
                            </Form.Item>

                            <Form.Item label="First Name"
                                name="fname"
                                validateStatus={errors?.fname ? 'error' : ''}
                                help={errors?.fname ? errors?.fname[0] : ''}
                            >
                                <Input placeholder="ex. Juan" size="large" autoComplete='off' />
                            </Form.Item>
                        </div>

                        <div className='flex flex-col gap-x-4 sm:flex-row'>

                            <Form.Item label="Middle Name"
                                name="mname"
                                validateStatus={errors?.mname ? 'error' : ''}
                                help={errors?.mname ? errors?.mname[0] : ''}
                            >
                                <Input placeholder="ex. Dela Cruz" size="large" />
                            </Form.Item>

                            <Form.Item label="Suffix"
                                name="suffix"
                                validateStatus={errors?.suffix ? 'error' : ''}
                                help={errors?.suffix ? errors?.suffix[0] : ''}
                            >
                                <Input placeholder="ex. Jr, II, III" size="large" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="sex"
                            label="Sex"
                            className="w-full"
                            validateStatus={errors.sex ? "error" : ""}
                            help={errors.sex ? errors.sex[0] : ""}
                        >
                            <Select
                                options={[
                                    { value: "MALE", label: "MALE" },
                                    { value: "FEMALE", label: "FEMALE" },
                                
                                ]}
                            />
                        </Form.Item>

                        <div className='flex flex-end mt-2'>
                            <Button className='ml-auto' 
                                icon={<FileAddOutlined />} 
                                type="primary" onClick={handClickNew}>
                                New
                            </Button>     
                        </div>
                        
                    </Form>
                </div>
            </div>
        </>

     
       
    )
}
