import React, { useState } from 'react'
import { App, Button, Divider, Form, Input, Modal, Select } from 'antd'
import { FileAddOutlined, UserOutlined } from '@ant-design/icons'
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { EducationLevel } from '@/types/educationLevel';
import { Divide } from 'lucide-react';

export default function RegisterPage({ educationLevels }: { educationLevels: EducationLevel[] }) {

    const { message, modal, notification } = App.useApp();
    const [loading, setLoading] = useState<boolean>(false);
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
    const [open, setOpen] = useState<boolean>(false);


    const submit = async (values: User) => {
        console.log('fired');
        setLoading(true);

        axios.post('/register', values).then(res => {
            setLoading(false);

            if (res.data.status === 'registered') {

                // modal.info({
                //     title: 'Registration Success!',
                //     content: 'Your application was successfully submitted and will be reviewed by the PAGLAUM. You will be notified via email once your account is activated.',
                // });

                // setData(
                //     {
                //         username: '',
                //         lname: '',
                //         fname: '',
                //         mname: '',
                //         suffix: '',
                //         sex: '',
                //         education_level: '',
                //         birthdate: null,
                //         birthplace: '',
                //         email: '',
                //         password: '',
                //         password_confirmation: '',
                //     }
                // );
            }
        }).catch((error: any) => {
            setLoading(false);
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        })

    }


    const handleModalOk = () => {

    }

    const handleModalCancel = () => {
        setOpen(false);
    }

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border border-1 overflow-hidden sm:rounded-lg shadow-sm my-5">

                    <div className="font-bold mb-4 text-2xl">REGISTER</div>
                    <Divider />
                    <Form layout="vertical"
                        autoComplete='off'
                        onFinish={submit}
                        initialValues={{
                            title: '',
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
                        <Divider />
                        <Form.Item
                            name="title"
                            label="Title (Mr. / Ms. / Mrs.)"
                            className="w-full"
                            validateStatus={errors.title ? "error" : ""}
                            help={errors.title ? errors.title[0] : ""}
                        >
                            <Select
                                options={[
                                    { value: "MR", label: "MR." },
                                    { value: "MS", label: "MS." },
                                    { value: "MRS", label: "MRS." },
                                ]}
                            />
                        </Form.Item>

                        <div className='flex flex-col gap-x-4 sm:flex-row'>


                            <Form.Item label="Last Name"
                                name="lname"
                                validateStatus={errors?.lname ? 'error' : ''}
                                help={errors?.lname ? errors?.lname[0] : ''}
                            >
                                <Input placeholder="ex. Dela Cruz" size="large" autoComplete='off' />
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


                        <Form.Item label="Email"
                            name="email"
                            validateStatus={errors?.email ? 'error' : ''}
                            help={errors?.email ? errors?.email[0] : ''}
                        >
                            <Input placeholder="ex. juan@mail.com" size="large" />
                        </Form.Item>

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

                        <Form.Item
                            name="education_level"
                            label="Education Level"
                            className="w-full"
                            validateStatus={errors.education_level ? "error" : ""}
                            help={errors.education_level ? errors.education_level[0] : ""}
                        >
                            <Select
                                options={educationLevels.map((level: EducationLevel) => ({ 
                                    value: level.education_level, 
                                    label: level.education_level 
                                }))}
                            />
                        </Form.Item>

                        <Divider />

                        <div className='flex flex-end mt-2'>
                            <Button className='ml-auto font-bold'
                                htmlType='submit'
                                loading={loading}
                                icon={<UserOutlined />}
                                type="primary">
                                SUBMIT APPLICATION
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>


            <Modal title="Basic Modal" open={open} onOk={handleModalOk}
                onCancel={handleModalCancel}>
                <div>

                </div>
            </Modal>

        </>



    )
}
