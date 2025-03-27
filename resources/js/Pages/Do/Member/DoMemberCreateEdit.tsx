import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'
import { App, Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Select } from 'antd'
import {  UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { EducationLevel } from '@/types/educationLevel'
import DoAuthLayout from '@/Layouts/DoAuthLayout'
import dayjs from 'dayjs';


const formatDate = (dateValue:Date, customFormat:string) => {
    return dayjs(dateValue).format(customFormat);
}

export default function BmMemberCreateEdit({
        auth,
        user,
        educationLevels
    }
    : PageProps<{
        user: User,
        educationLevels: EducationLevel[]
    }>) {


    const { message, modal, notification } = App.useApp();
    const [loading, setLoading] = useState<boolean>(false);
    const [provinces, setProvinces] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [barangays, setBarangays] = useState<any[]>([]);


    const [form] = Form.useForm();

    const [errors, setErrors] = useState<any>({});

    useEffect(() => {

        form.setFields([
            { name: 'username', value: user.username },
            { name: 'lname', value: user.lname },
            { name: 'fname', value: user.fname },
            { name: 'mname', value: user.mname },
            { name: 'suffix', value: user.suffix },
           
            { name: 'email', value: user.email },
            { name: 'contact_no', value: user.contact_no },
            { name: 'education_level', value: user.education_level },
            { name: 'birthdate', value: dayjs(user.birthdate ?? null) },
            { name: 'birthplace', value: user.birthplace },

            { name: 'sex', value: user.sex },
            { name: 'civil_status', value: user.civil_status },
            { name: 'sss', value: user.sss },
            { name: 'gsis', value: user.gsis },
            { name: 'tin', value: user.tin },
            { name: 'id_type', value: user.id_type },
            { name: 'id_no', value: user.id_no },
            { name: 'household_size', value: user.household_size },

            { name: 'province', value: user.province ? user.province.provCode : null },
            { name: 'city', value: user.city ? user.city.citymunCode : null },
            { name: 'barangay', value: user.barangay ? user.barangay.brgyCode : null },
            { name: 'street', value: user.street },

            { name: 'occupation', value: user.occupation },
            { name: 'monthly_income', value: user.monthly_income },

            { name: 'business_name', value: user.business_name },
            { name: 'business_address', value: user.business_address },
            { name: 'contact_person', value: user.contact_person },
            { name: 'contact_person_no', value: user.contact_person_no },

            { name: 'active', value: user.active ? user.active > 0 : false },
            { name: 'is_loan_allowed', value: user.is_loan_allowed ? user.is_loan_allowed > 0 : false },

            
        ]);
    }, [user])

    const onFinish = async (values:User) =>{
        setLoading(true);
        if(user && user.id && user.id > 0){
			try{
				const res = await axios.put('/do/members/' + user.id, values)
                setLoading(false);
				if(res.data.status === 'updated'){
					notification.success({ placement: 'topRight', message: 'Updated!', description: 'Member successfully updated.'})
					router.visit('/do/members');
				}
			}catch(err:any){
                setLoading(false);

				if(err.response.status === 422){
                    setErrors(err.response.data.errors)
				}
			}
		}else{
			try{
				const res = await axios.post('/do/members', values)
                setLoading(false);

				if(res.data.status === 'saved'){
					notification.success({ placement: 'topRight', message: 'Saved!', description: 'Member successfully saved.'})
                    router.visit('/do/members');

				}
			}catch(err:any){
                setLoading(false);

				if(err.response.status === 422){
                    setErrors(err.response.data.errors)
				}
			}
		}
	}

    const loadProvinces = () => {
        axios.get('/load-provinces').then(res=>{
            setProvinces(res.data);
        })
    }
    const loadCities = (provCode:any) => {
        axios.get('/load-cities?provcode=' + provCode).then(res=>{
            setCities(res.data);
        })
    }
    const loadBarangays = (brgy:any) => {
        axios.get(`/load-barangays?citycode=${brgy}`).then(res=>{
            setBarangays(res.data);
        })
    }

    
    const handleChangeProvince = (value:string) => {
        
        form.setFields([
            { name: 'city', value: null },
            { name: 'barangay', value: null },
            { name: 'province', value: value }
        ]);

        loadCities(value)
    }
    const handleChangeCity = (value:string) => {
        form.setFields([
            { name: 'barangay', value: null },
            { name: 'city', value: value }
        ]);
        loadBarangays(value)
    }

    useEffect(()=>{
        loadProvinces() 
    }, [])

    useEffect(()=>{
        loadCities(form.getFieldValue('province'))
    }, [form.getFieldValue('province')])

    useEffect(()=>{
        loadBarangays(form.getFieldValue('city'))
    }, [form.getFieldValue('city')])




    return (
        <DoAuthLayout user={auth.user}>
            <Head title="Member Management"></Head>

            <div className='flex mt-10 justify-center items-center'>
                {/* card */}
                <div className='p-6 w-full mx-2 bg-white shadow-sm rounded-md
					sm:max-w-screen-xl'>
                    {/* card header */}
                    <div className="font-bold mb-4 text-lg">ADD / EDIT USER</div>

                    <Form layout="vertical"
                        className='relative'
                        autoComplete='off'
                        form={form}
                        onFinish={onFinish}
                        initialValues={{
                            lname: '',
                            fname: '',
                            mname: '',
                            suffix: '',
                            contact_no: '',
                            email: '',

                            education_level: '',
                            birthdate: null,
                            birthplace: '',

                            sex: '',
                            civil_status: '',

                            sss: '',
                            gsis: '',
                            tin: '',

                            id_type: '',
                            id_no: '',
                            household_size: 0,

                            province: '',
                            city: '',
                            barangay: '',
                            street: '',

                            ocucpation: '',
                            monthly_income: '',
                            business_address: '',
                            contact_person: '',
                            contact_person_no: '',



                            is_loan_allowed: false,
                            active: true,
                        }}>

                        <Divider />

                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-full h-px my-8 bg-gray-200 border-0" />
                            <span className="absolute px-3 text-lg font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                                PERSONAL INFORMATION
                            </span>
                        </div>

                        <div className='flex flex-col gap-x-4 sm:flex-row'>

                            <Form.Item label="Last Name"
                                name="lname"
                                className='w-full'
                                validateStatus={errors?.lname ? 'error' : ''}
                                help={errors?.lname ? errors?.lname[0] : ''}
                            >
                                <Input placeholder="ex. Dela Cruz" size="large" autoComplete='off' />
                            </Form.Item>

                            <Form.Item label="First Name"
                                name="fname"
                                className='w-full'
                                validateStatus={errors?.fname ? 'error' : ''}
                                help={errors?.fname ? errors?.fname[0] : ''}
                            >
                                <Input placeholder="ex. Juan" size="large" autoComplete='off' />
                            </Form.Item>

                            <Form.Item label="Middle Name"
                                name="mname"
                                className='w-full'
                                validateStatus={errors?.mname ? 'error' : ''}
                                help={errors?.mname ? errors?.mname[0] : ''}
                            >
                                <Input placeholder="ex. Dela Cruz" size="large" />
                            </Form.Item>

                        </div>


                        <div className='flex flex-col gap-x-4 sm:flex-row'>

                            <Form.Item label="Suffix"
                                name="suffix"
                                validateStatus={errors?.suffix ? 'error' : ''}
                                help={errors?.suffix ? errors?.suffix[0] : ''}
                            >
                                <Input placeholder="ex. Jr, II, III" size="large" />
                            </Form.Item>

                            <Form.Item label="Contact No."
                                name="contact_no"
                                className='w-full'
                                validateStatus={errors?.contact_no ? 'error' : ''}
                                help={errors?.contact_no ? errors?.contact_no[0] : ''}
                            >
                                <Input placeholder="ex. 09161231234" size="large" />
                            </Form.Item>

                            <Form.Item label="Email"
                                className='w-full'
                                name="email"
                                validateStatus={errors?.email ? 'error' : ''}
                                help={errors?.email ? errors?.email[0] : ''}
                            >
                                <Input placeholder="ex. juan@mail.com" size="large" />
                            </Form.Item>
                        </div>

                        <div className="flex flex-col gap-x-4 sm:flex-row">

                            <Form.Item
                                label="Education Level"
                                 name="education_level"
                                className="w-full"
                                validateStatus={errors.education_level ? "error" : ""}
                                help={errors.education_level ? errors.education_level[0] : ""}
                            >
                                <Select
                                    className='h-10'
                                    options={educationLevels.map((level: EducationLevel) => ({
                                        value: level.education_level,
                                        label: level.education_level
                                    }))}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Birthdate"
                                name="birthdate"
                                className='w-full'
                                validateStatus={errors?.birthdate ? 'error' : ''}
                                help={errors?.birthdate ? errors?.birthdate[0] : ''}>
                                <DatePicker className='w-full h-10' />
                            </Form.Item>

                            <Form.Item
                                label='Birthplace'
                                name='birthplace'
                                className='w-full'
                                validateStatus={errors?.birthplace ? 'error' : ''}
                                help={errors?.birthplace ? errors.birthplace[0] : ''}>
                                <Input className="h-10 " placeholder="Your Birthplace" />
                            </Form.Item>
                        </div>
                        

                        <div className="flex flex-col gap-x-4 sm:flex-row">
                        <Form.Item
                                name="sex"
                                label="Sex"
                                className="w-full"
                                validateStatus={errors.sex ? "error" : ""}
                                help={errors.sex ? errors.sex[0] : ""}
                            >
                                <Select
                                    className='h-10'
                                    options={[
                                        { value: "MALE", label: "MALE" },
                                        { value: "FEMALE", label: "FEMALE" },

                                    ]}
                                />
                            </Form.Item>

                            
                            <Form.Item
                                label="Civil Status"
                                name="civil_status"
                                className="w-full"
                                validateStatus={errors.civil_status ? "error" : ""}
                                help={errors.civil_status ? errors.civil_status[0] : ""}
                            >
                                <Select
                                    className="w-full h-10"
                                    options={[
                                        { value: 'SINGLE', label: 'SINGLE' },
                                        { value: 'MARRIED', label: 'MARRIED' },
                                        { value: 'DIVORCED', label: 'DIVORCED' },
                                        { value: 'WIDOWED', label: 'WIDOWED' },
                                    ]}
                                />
                            </Form.Item>
                        </div>

                        <div className='flex flex-col gap-x-4 sm:flex-row'>

                            <Form.Item label="SSS"
                                name="sss"
                                className='w-full'
                                validateStatus={errors?.sss ? 'error' : ''}
                                help={errors?.SSS ? errors?.sss[0] : ''}
                            >
                                <Input placeholder="SSS" size="large" />
                            </Form.Item>

                            <Form.Item label="GSIS"
                                name="gsis"
                                className='w-full'
                                validateStatus={errors?.gsis ? 'error' : ''}
                                help={errors?.gsis ? errors?.gsis[0] : ''}
                            >
                                <Input placeholder="GSIS" size="large" />
                            </Form.Item>

                            <Form.Item label="TIN"
                                className='w-full'
                                name="tin"
                                validateStatus={errors?.tin ? 'error' : ''}
                                help={errors?.tin ? errors?.tin[0] : ''}
                            >
                                <Input placeholder="TIN" size="large" />
                            </Form.Item>
                        </div>


                        <div className='flex flex-col gap-x-4 sm:flex-row'>
                            <Form.Item label="Id Type"
                                name="id_type"
                                className='w-full'
                                validateStatus={errors?.id_type ? 'error' : ''}
                                help={errors?.id_type ? errors?.id_type[0] : ''}
                            >
                                <Input placeholder="Id Type" size="large" autoComplete='off' />
                            </Form.Item>

                            <Form.Item label="Id No."
                                name="id_no"
                                className='w-full'
                                validateStatus={errors?.id_no ? 'error' : ''}
                                help={errors?.id_no ? errors?.id_no[0] : ''}
                            >
                                <Input placeholder="Id No." size="large" />
                            </Form.Item>

                            <Form.Item label="Household Size"
                                name="household_size"
                                className='w-full'
                                validateStatus={errors?.household_size ? 'error' : ''}
                                help={errors?.household_size ? errors?.household_size[0] : ''}
                            >
                                <InputNumber className='w-full' placeholder="Household Size" size="large" />
                            </Form.Item>
                        </div>

                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-full h-px my-8 bg-gray-200 border-0" />
                            <span className="absolute px-3 text-lg font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                                ADDRESS INFORMATION
                            </span>
                        </div>

                        <div className="flex flex-col gap-x-4 sm:flex-row">
                            <Form.Item
                                label="Province"
                                name="province"
                                className="w-full"
                                validateStatus={errors.province ? "error" : ""}
                                help={errors.province ? errors.province[0] : ""}
                            >
                                <Select
                                    className="w-full h-10"
                                    onChange={handleChangeProvince}
                                    options={provinces.map((item: any) => ({ 
                                        value: item.provCode, 
                                        label: item.provDesc 
                                    }))}
                                />
                            </Form.Item>

                            <Form.Item
                                label="City"
                                name="city"
                                className="w-full"
                                validateStatus={errors.city ? "error" : ""}
                                help={errors.city ? errors.city[0] : ""}
                            >
                                <Select
                                    className="w-full h-10"
                                    onChange={handleChangeCity}
                                    options={cities.map((item: any) => ({ 
                                        value: item.citymunCode, 
                                        label: item.citymunDesc 
                                    }))}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Barangay"
                                name="barangay"
                                className="w-full"
                                validateStatus={errors.barangay ? "error" : ""}
                                help={errors.barangay ? errors.barangay[0] : ""}
                            >
                                <Select
                                    className="w-full h-10"
                                    options={barangays.map((item: any) => ({ 
                                        value: item.brgyCode, 
                                        label: item.brgyDesc 
                                    }))}
                                />
                            </Form.Item>
                        </div>


                        <Form.Item label="Street"
                            name="street"
                            className='w-full'
                            validateStatus={errors?.street ? 'error' : ''}
                            help={errors?.street ? errors?.street[0] : ''}
                        >
                            <Input placeholder="ex. Juan Dela Cruz St." size="large" />
                        </Form.Item>

                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-full h-px my-8 bg-gray-200 border-0" />
                            <span className="absolute px-3 text-lg font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                                WORK INFORMATION
                            </span>
                        </div>

                        <div className='flex flex-col gap-x-4 sm:flex-row'>
                            <Form.Item label="Occupation"
                                name="occupation"
                                className='w-full'
                                validateStatus={errors?.occupation ? 'error' : ''}
                                help={errors?.occupation ? errors?.occupation[0] : ''}
                            >
                                <Input placeholder="Occupation" size="large" />
                            </Form.Item>

                            <Form.Item label="Monthly Income"
                                name="monthly_income"
                                className='w-full'
                                validateStatus={errors?.monthly_income ? 'error' : ''}
                                help={errors?.monthly_income ? errors?.monthly_income[0] : ''}
                            >
                                <Input placeholder="Monthly Income" size="large" />
                            </Form.Item>
                        </div>

                        <div className='flex flex-col gap-x-4 sm:flex-row'>
                            <Form.Item label="Business Name"
                                name="business_name"
                                className='w-full'
                                validateStatus={errors?.business_name ? 'error' : ''}
                                help={errors?.business_name ? errors?.business_name[0] : ''}
                            >
                                <Input placeholder="Business Name" size="large" />
                            </Form.Item>

                            <Form.Item label="Business Address"
                                name="business_address"
                                className='w-full'
                                validateStatus={errors?.business_address ? 'error' : ''}
                                help={errors?.business_address ? errors?.business_address[0] : ''}
                            >
                                <Input placeholder="Business Address" size="large" />
                            </Form.Item>

                            
                        </div>

                        <div className='flex flex-col gap-x-4 sm:flex-row'>
                            <Form.Item label="Contact Person"
                                name="contact_person"
                                className='w-full flex-auto'
                                validateStatus={errors?.contact_person ? 'error' : ''}
                                help={errors?.contact_person ? errors?.contact_person[0] : ''}
                            >
                                <Input placeholder="Contact Person" size="large" />
                            </Form.Item>

                            <Form.Item label="Contact Person No."
                                name="contact_person_no"
                                className='w-full'
                                validateStatus={errors?.contact_person_no ? 'error' : ''}
                                help={errors?.contact_person_no ? errors?.contact_person_no[0] : ''}
                            >
                                <Input placeholder="Contact Person No." size="large" />
                            </Form.Item>
                        </div>

                            
                        
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-full h-px my-8 bg-gray-200 border-0" />
                            <span className="absolute px-3 text-lg font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                                MEMBER PRIVILEGE
                            </span>
                        </div>
                        
                        <div className="flex flex-col gap-x-4 sm:flex-row">
                            <Form.Item
                                name="active"
                                valuePropName="checked"
                                className=""
                                validateStatus={
                                    errors.active ? "error" : ""
                                }
                                help={
                                    errors.active
                                        ? errors.active[0]
                                        : ""
                                }
                            >
                                <Checkbox>Active</Checkbox>
                            </Form.Item>

                            <Form.Item
                                name="is_loan_allowed"
                                valuePropName="checked"
                                className=""
                                validateStatus={
                                    errors.is_loan_allowed ? "error" : ""
                                }
                                help={
                                    errors.is_loan_allowed
                                        ? errors.is_loan_allowed[0]
                                        : ""
                                }
                            >
                                <Checkbox>Allow Loan</Checkbox>
                            </Form.Item>

                        </div>

                        <Divider />

                        <div className='flex flex-end mt-2'>
                            <Button className='ml-auto font-bold'
                                htmlType='submit'
                                loading={loading}
                                icon={<UserOutlined />}
                                type="primary">
                                UPDATE INFORMATION
                            </Button>
                        </div>

                    </Form>




                </div>
            </div>
        </DoAuthLayout>
    )
}
