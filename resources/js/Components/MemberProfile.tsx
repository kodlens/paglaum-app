import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { DatePicker, Form, Input, Select } from 'antd'
import axios from 'axios';
import React, { useEffect } from 'react'

const MemberProfile = () => {
    const [form] = Form.useForm();
    const [errors, setErrors] = React.useState<any>({})
    const user = usePage<PageProps>().props.auth.user;
    const [educationLevels, setEducationLevels] = React.useState<any>([])


    const loadEducationLevels = () => {
        axios.get('/load-education-levels').then(res => {
            setEducationLevels(res.data);
        })
    }

    useEffect(() => {
        loadEducationLevels()
    }, [])

    const onFinish = (values: any) => {
        console.log(values)
    }


    return (
        <>
            <div className='font-bold mb-4'>Member Profile</div>

            <div>
                <Form layout='vertical'
                    autoComplete='off'
                    form={form}
                    initialValues={{
                        lname: user.lname,
                        fname: user.fname,
                        mname: user.mname,
                        sex: user.sex
                    }}
                    onFinish={onFinish}
                >
                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item
                            label='Last Name'
                            name="lname"
                            className='w-full'
                            validateStatus={errors?.lname ? 'error' : ''}
                            help={errors?.lname ? errors?.lname[0] : ''}
                        >
                            <Input type='text' className='w-full p-2' placeholder='e.g Dela Cruz' />
                        </Form.Item>

                        <Form.Item label='First Name'
                            name="fname"
                            className='w-full'
                            validateStatus={errors?.fname ? 'error' : ''}
                            help={errors?.fname ? errors?.fname[0] : ''}
                        >
                            <Input type='text' className='w-full p-2' placeholder='e.g. Juan' />
                        </Form.Item>
                    </div>

                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label='Middle Name'
                            name="mname"
                            className='w-full'
                            validateStatus={errors?.mname ? 'error' : ''}
                            help={errors?.mname ? errors?.mname[0] : ''}
                        >
                            <Input type='text' className='w-full p-2' placeholder='e.g. Juan' />
                        </Form.Item>

                        <Form.Item label='Suffix'
                            name="suffix"
                            className='w-full'
                            validateStatus={errors?.suffix ? 'error' : ''}
                            help={errors?.suffix ? errors?.suffix[0] : ''}
                        >
                            <Input type='text' className='w-full p-2' placeholder='e.g. Jr., II, III' />
                        </Form.Item>

                        <Form.Item
                            label="Sex"
                            name="sex"
                            className="w-full"
                            validateStatus={errors.sex ? "error" : ""}
                            help={errors.sex ? errors.sex[0] : ""}>
                            <Select
                                className='h-10'
                                options={[
                                    { value: "MALE", label: "MALE" },
                                    { value: "FEMALE", label: "FEMALE" }
                                ]}
                            />

                        </Form.Item>
                    </div>

                    <Form.Item label="Education Level"
                        name="education_level"
                        validateStatus={errors.education_level ? "error" : ""}
                        help={errors.education_level ? errors.education_level[0] : ""}>
                        <Select
                            className='h-10'
                            options={educationLevels.map((level: any) => ({
                                value: level.id,
                                label: level.education_level
                            }))}
                        />
                    </Form.Item>

                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label="Birthdate"
                            name="birthdate"
                            className="w-full"
                            validateStatus={errors.birthdate ? "error" : ""}
                            help={errors.birthdate ? errors.birthdate[0] : ""}>
                            
                            <DatePicker className='h-10 w-full'/>
                        </Form.Item>

                        <Form.Item label="Birth Place"
                            name="birthplace"
                            className="w-full"
                            validateStatus={errors.birthplace ? "error" : ""}
                            help={errors.birthplace ? errors.birthplace[0] : ""}>
                            
                            <Input type='text' className='w-full p-2' placeholder='e.g. Metro Manila...' />
                        </Form.Item>
                    </div>

                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label="Civil Status"
                            name="civil_status"
                            className="w-full"
                            validateStatus={errors.civil_status ? "error" : ""}
                            help={errors.civil_status ? errors.civil_status[0] : ""}>
                            
                            <Select
                                className='h-10'
                                options={[
                                    { value: "SINGLE", label: "SINGLE" },
                                    { value: "MARRIED", label: "MARRIED" },
                                    { value: "WIDOWED", label: "WIDOWED" }
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label="Religion"
                            name="religion"
                            className="w-full"
                            validateStatus={errors.religion ? "error" : ""}
                            help={errors.religion ? errors.religion[0] : ""}>
                            
                            <Input type='text' className='w-full p-2' placeholder='e.g. Roman Catholic...' />
                        </Form.Item>

                        <Form.Item label="Ethnic Group"
                            name="ethnic_group"
                            className="w-full"
                            validateStatus={errors.ethnic_group ? "error" : ""}
                            help={errors.ethnic_group ? errors.ethnic_group[0] : ""}>
                            
                            <Input type='text' className='w-full p-2' placeholder='e.g. Tagalog' />
                        </Form.Item>
                    </div>



                </Form>
            </div>
        </>
    )
}

export default MemberProfile