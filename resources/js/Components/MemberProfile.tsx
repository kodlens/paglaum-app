import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { App, Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import axios from 'axios';
import React, { useEffect } from 'react'
import dayjs from 'dayjs';

const dateFormat = (item:Date, customFormat:string):string=> {
	return dayjs(item).format(customFormat)
}


const MemberProfile = () => {
    const [form] = Form.useForm();
    const { notification } = App.useApp();
    const [errors, setErrors] = React.useState<any>({})
    const user = usePage<PageProps>().props.auth.user;
    const [educationLevels, setEducationLevels] = React.useState<any>([])
    const [idTypes, setIdTypes] = React.useState<any>([])
    const [loading, setLoading] = React.useState<boolean>(false)

    const loadEducationLevels = () => {
        axios.get('/load-education-levels').then(res => {
            setEducationLevels(res.data);
        })
    }

    
    const loadIdTypes = () => {
        axios.get('/load-id-types').then(res => {
            setIdTypes(res.data);
        })
    }

    useEffect(() => {
        loadEducationLevels()
        loadIdTypes()
    }, [])

    const onFinish = (values: any) => {
        setLoading(true)
        axios.patch('/member/update-member-profile', values).then(res => {
            if (res.data.status === 'updated') {
                setLoading(false)

                notification.success({
                    message: 'Profile Updated!',
                    description: 'Your profile has been updated successfully',
                    placement: 'bottomRight'
                });
            }
        }).catch(err => {
            setLoading(false)
            setErrors(err.data.errors)
        });
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
                        sex: user.sex,
                        education_level: user.education_level,
                        birthdate: dayjs(user.birthdate),
                        birthplace: user.birthplace,
                        civil_status: user.civil_status,
                        religion: user.religion,
                        ethnic_group: user.ethnic_group,
                        nationality: user.nationality,
                        height: user.height,
                        weight: user.weight,
                        blood_type: user.blood_type,
                        sss: user.sss,
                        tin: user.tin,
                        id_type: user.id_type,
                        id_no: user.id_no,
                        household_size: user.household_size,
                        contact_no: user.contact_no,
                        email: user.email,
                        occupation: user.occupation,
                        monthly_income: user.monthly_income,
                        office_address: user.office_address,
                        contact_person: user.contact_person,
                        contact_person_no: user.contact_person_no
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
                                value: level.education_level,
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


                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label="Nationality"
                            name="nationality"
                            className="w-full"
                            validateStatus={errors.nationality ? "error" : ""}
                            help={errors.nationality ? errors.nationality[0] : ""}>

                            <Input type='text' className='w-full p-2' placeholder='e.g. Filipino...' />
                            
                        </Form.Item>

                        <Form.Item label="Height (Cm)"
                            name="height"
                            className="w-full"
                            validateStatus={errors.height ? "error" : ""}
                            help={errors.height ? errors.height[0] : ""}>
                            
                            <InputNumber type='text' className='w-full p-1' placeholder='e.g. Height in Cm' />
                        </Form.Item>

                        <Form.Item label="Weight (KG)"
                            name="weight"
                            className="w-full"
                            validateStatus={errors.height ? "error" : ""}
                            help={errors.height ? errors.height[0] : ""}>
                            
                            <InputNumber type='text' className='w-full p-1' placeholder='e.g. Weight in KG' />
                        </Form.Item>
                    </div>

                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label="Blood Type"
                            name="blood_type"
                            className="w-full"
                            validateStatus={errors.blood_type ? "error" : ""}
                            help={errors.blood_type ? errors.blood_type[0] : ""}>

                            <Input type='text' className='w-full p-2' placeholder='e.g. AB, A+, A...' />
                            
                        </Form.Item>

                        <Form.Item label="SSS"
                            name="sss"
                            className="w-full"
                            validateStatus={errors.sss ? "error" : ""}
                            help={errors.sss ? errors.sss[0] : ""}>

                            <Input type='text' className='w-full p-2' placeholder='e.g. SSS No...' />
                            
                        </Form.Item>

                        <Form.Item label="TIN"
                            name="tin"
                            className="w-full"
                            validateStatus={errors.tin ? "error" : ""}
                            help={errors.tin ? errors.tin[0] : ""}>

                            <Input type='text' className='w-full p-2' placeholder='e.g. TIN...' />
                            
                        </Form.Item>
                    </div>

                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label="ID Type"
                            name="id_type"
                            className="w-full"
                            validateStatus={errors.id_type ? "error" : ""}
                            help={errors.id_type ? errors.id_type[0] : ""}>
                            
                            <Select
                                className='h-10'
                                options={idTypes.map((type: any) => ({
                                    value: type.id_type,
                                    label: type.id_type
                                }))}
                            />
                        </Form.Item>

                        <Form.Item label="Id No."
                            name="id_no"
                            className="w-full"
                            validateStatus={errors.id_no ? "error" : ""}
                            help={errors.id_no ? errors.id_no[0] : ""}>

                            <Input type='text' className='w-full p-2' placeholder='e.g. Id No...' />
                        </Form.Item>

                        <Form.Item label="Household Size"
                            name="household_size"
                            className="w-full"
                            validateStatus={errors.household_size ? "error" : ""}
                            help={errors.household_size ? errors.household_size[0] : ""}>

                            <InputNumber type='number' className='w-full p-1' placeholder='e.g. 12...' />
                            
                        </Form.Item>
   
                    </div>

                    <div className='text-center my-4 font-bold'>CONTACT INFORMATION</div>

                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label="Contact No."
                            name="contact_no"
                            className="w-full"
                            validateStatus={errors.contact_no ? "error" : ""}
                            help={errors.contact_no ? errors.contact_no[0] : ""}>
                         
                            <Input type='text' className='w-full p-2' placeholder='e.g. Contact no...' />
                        
                        </Form.Item>

                        <Form.Item label="Email"
                            name="email"
                            className="w-full"
                            validateStatus={errors.email ? "error" : ""}
                            help={errors.email ? errors.email[0] : ""}>

                            <Input type='email' className='w-full p-2' placeholder='e.g. Email' />
                        </Form.Item>
   
                    </div>
          

                    <div className='text-center my-4 font-bold'>WORK INFORMATION</div>

                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label="Occupation"
                            name="occupation"
                            className="w-full"
                            validateStatus={errors.occupation ? "error" : ""}
                            help={errors.occupation ? errors.occupation[0] : ""}>
                         
                            <Input type='text' className='w-full p-2' placeholder='e.g. Occupation' />
                        
                        </Form.Item>

                        <Form.Item label="Monthly Income"
                            name="monthly_income"
                            className="w-full"
                            validateStatus={errors.monthly_income ? "error" : ""}
                            help={errors.monthly_income ? errors.monthly_income[0] : ""}>

                            <InputNumber type='number' className='w-full p-1' placeholder='e.g. Id No...' />
                        </Form.Item>

                        <Form.Item label="Office Address"
                            name="office_address"
                            className="w-full"
                            validateStatus={errors.office_address ? "error" : ""}
                            help={errors.office_address ? errors.office_address[0] : ""}>

                            <Input type='text' className='w-full p-2' placeholder='e.g. Office Address...' />
                            
                        </Form.Item>
   
                    </div>

                    <div className='flex md:flex-row flex-col md:gap-4'>
                        <Form.Item label="Contact Person"
                            name="contact_person"
                            className="w-full"
                            validateStatus={errors.contact_person ? "error" : ""}
                            help={errors.contact_person ? errors.contact_person[0] : ""}>

                            <Input type='text' className='w-full p-2' placeholder='e.g. Contact Person' />
                            
                        </Form.Item>

                        <Form.Item label="Contact Person No."
                            name="contact_person_no"
                            className="w-full"
                            validateStatus={errors.contact_person_no ? "error" : ""}
                            help={errors.contact_person_no ? errors.contact_person_no[0] : ""}>

                            <Input type='text' className='w-full p-2' placeholder='e.g. Contact Person No...' />
                            
                        </Form.Item>
                    </div>

                    <div>
                        <Button loading={loading} type='primary' 
                            className='p-4'
                            htmlType='submit'>
                            Update My Profile
                        </Button>
                    </div>



                </Form>
            </div>
        </>
    )
}

export default MemberProfile