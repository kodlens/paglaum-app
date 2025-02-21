import AdminAuthLayout from '@/Layouts/AdminAuthLayout'
import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'
import { App, Button, Divider, Form, Input, Select } from 'antd'
import {  UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { EducationLevel } from '@/types/educationLevel'


export default function AdminUserAddEdit({ 
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


    const [form] = Form.useForm();

    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        form.setFields([
            { name: 'username', value: user.username },
            { name: 'title', value: user.title },
            { name: 'lname', value: user.lname },
            { name: 'fname', value: user.fname },
            { name: 'mname', value: user.mname },
            { name: 'suffix', value: user.suffix },
            { name: 'education_level', value: user.education_level },
            { name: 'email', value: user.email },
            { name: 'sex', value: user.sex },
            { name: 'role', value: user.role }
        ]);
    }, [user])
    const onFinish = async (values:User) =>{
        setLoading(true);
        if(user.id > 0){
			try{
				const res = await axios.put('/admin/users/' + user.id, values)
                setLoading(false);
				if(res.data.status === 'updated'){
					notification.success({ placement: 'topRight', message: 'Updated!', description: 'User successfully updated.'})
					router.visit('/admin/users');
				}
			}catch(err:any){
                setLoading(false);

				if(err.response.status === 422){
                    setErrors(err.response.data.errors)
				}
			}
		}else{
			try{
				const res = await axios.post('/admin/users', values)
                setLoading(false);

				if(res.data.status === 'saved'){
					notification.success({ placement: 'topRight', message: 'Saved!', description: 'User successfully saved.'})
                    router.visit('/admin/users');

				}
			}catch(err:any){
                setLoading(false);

				if(err.response.status === 422){
                    setErrors(err.response.data.errors)
				}
			}
		}
	}

    
    return (
        <AdminAuthLayout user={auth.user}>
            <Head title="User Management"></Head>

            <div className='flex mt-10 justify-center items-center'>
                {/* card */}
                <div className='p-6 w-full mx-2 bg-white shadow-sm rounded-md
					sm:w-[640px]'>
                    {/* card header */}
                    <div className="font-bold mb-4 text-lg">ADD / EDIT USER</div>

                    <Form layout="vertical"
                        autoComplete='off'
                        form={form}
                        onFinish={onFinish}
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
                            <Input placeholder="ex. juan1234" size="large"  readOnly/>
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
                        </div>

                        <div className='flex flex-col gap-x-4 sm:flex-row'>

                            <Form.Item label="Middle Name"
                                name="mname"
                                className='w-full'
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

                        <Form.Item
                            name="role"
                            label="Role"
                            className="w-full"
                            validateStatus={errors.role ? "error" : ""}
                            help={errors.role ? errors.role[0] : ""}
                        >
                            <Select 
                                options={[
                                    { value: "MEMBER", label: "MEMBER" },
                                    { value: "BM", label: "BRANCH MANAGER" },
                                    { value: "ADMIN", label: "ADMINISTRATOR" },
                                ]}
                            />
                        </Form.Item>

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
        </AdminAuthLayout>
    )
}
