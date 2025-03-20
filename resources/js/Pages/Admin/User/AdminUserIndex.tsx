import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

import { FileAddOutlined,
	EyeInvisibleOutlined,EyeTwoTone } from '@ant-design/icons';

import { Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
	App, 
    Popconfirm,
    Dropdown} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ChangePassword from './partials/ChangePassword';
import AdminAuthLayout from '@/Layouts/AdminAuthLayout';
import { PaginateResponse } from '@/types/apiResponse';
import { Captions, FileLock2, MonitorCheck, Pencil, ShieldOff, Trash2 } from 'lucide-react';

const { Column } = Table;


export default function AdminUserIndex({ auth }: PageProps) {
	
	const [form] = Form.useForm();

	const  { notification } = App.useApp();

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal
	const [passwordVisible, setPasswordVisible] = React.useState(false);

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({
        lname:'',
        fname:'',
        mname:'',
        email:'',
        username:'',
        password:'',
        password_confirmation:'',
    });

    const [id, setId] = useState(0);
	

	
	const loadDataAsync = async () => {

        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/admin/get-users?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
			setLoading(false)
		}catch(err){
			console.log(err)
		}
    }

    useEffect(()=>{
        loadDataAsync()
    },[perPage, search, page])


    const onPageChange = (index:number, perPage:number) => {
        setPage(index)
        setPerPage(perPage)
    }

	const handClickNew = () => {
        //router.visit('/');
		setId(0)
        setOpen(true)
    }

	const handleEditClick = (id:number) => {
		//setId(id);
        //setOpen(true);
        //getUser(id);
        router.visit('/admin/users/' + id + '/edit');
	}

	const handleDeleteClick = async (id:number) => {
        
		const res = await axios.delete(`/admin/users/${id}`);
		if(res.data.status === 'deleted'){
			loadDataAsync()
		}
	}
	

	const onFinish = async (values:User) =>{

		if(id > 0){
			try{
				const res = await axios.put('/admin/users/' + id, values)
				if(res.data.status === 'updated'){
					notification.info({ placement: 'bottomRight', message: 'Updated!', description: 'User successfully updated.'})
					setOpen(false)
					loadDataAsync()
				}
			}catch(err:any){
				if(err.response.status === 422){
                    setErrors(err.response.data.errors)
				}
			}
		}else{
			try{
				const res = await axios.post('/admin/users', values)
				if(res.data.status === 'saved'){
					notification.info({ placement: 'bottomRight', message: 'Saved!', description: 'User successfully saved.'})
					setOpen(false)
					loadDataAsync()
				}
			}catch(err:any){
				if(err.response.status === 422){
                    setErrors(err.response.data.errors)
				}
			}
		}
	}

    const handleClickActive = (id:any) => {
        axios.post('/admin/users-set-active/' + id).then(res=>{
            notification.success({ placement: 'bottomRight', message: 'Active!', description: 'User successfully set to active.'})
        })
    }

    const handleClickInactive = (id:any) => {
        axios.post('/admin/users-set-inactive/' + id).then(res=>{
            notification.success({ placement: 'bottomRight', message: 'Active!', description: 'User successfully set to active.'})
        })
    }

	return (
		<AdminAuthLayout user={auth.user}>
			<Head title="User Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1120px] overflow-auto'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF USER</div>
					{/* card body */}
					<div className='z-0'>
                        <Table dataSource={data}
                        loading={loading}
                            
                            rowKey={(data) => data.id ?? 0}
                            pagination={false}>

							<Column title="Id" dataIndex="id" key="id"/>
							<Column title="Username" dataIndex="username" key="username"/>
							<Column title="Last Name" key="lname" dataIndex="lname"/>
							<Column title="First Name" key="fname" dataIndex="fname"/>
							<Column title="Middle Name" key="mname" dataIndex="mname"/>
							<Column title="Email" dataIndex="email" key="email"/>
							<Column title="Role" dataIndex="role" key="role"/>
							<Column title="Active" key="active" render={(data:User)=>(
								data.active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
							<Column title="Action" key="action" 
								render={(_, data:User) => (
									<div className='flex gap-2'>

                                        <Dropdown.Button type="primary"
                                            placement="bottomRight"
                                            menu={{
                                                items: [
                                                    {
                                                        key: '1',
                                                        label: 'Edit',
                                                        icon: <Pencil size={16} />,
                                                        onClick: ()=>{
                                                            //handleEditClick(data.id)
                                                        }
                                                    },
                                                    {
                                                        key: '2',
                                                        label: 'Acitve',
                                                        icon: <MonitorCheck  size={16} />,
                                                        onClick: ()=>{
                                                            handleClickActive(data.id)
                                                        }
                                                    
                                                    },
                                                    {
                                                        key: '3',
                                                        label: 'Inactive',
                                                        icon: <ShieldOff size={16} />,
                                                        onClick: ()=>{
                                                            handleClickInactive(data.id)
                                                        }
                                                    
                                                    },
                                                    {
                                                        key: '4',
                                                        label: (<ChangePassword data={data} onSuccess={loadDataAsync}/>),
                                                    },
                                                ],
                                            }}
                                            trigger={['click']}
                                        >
                                            <Captions size={16} />
                                        </Dropdown.Button>

                                        <Popconfirm
                                            title="Delete this user?"
                                            description="Are you sure to delete this user?"
                                            onConfirm={() => handleDeleteClick(data.id ?? 0) }
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button 
                                                    className='red-button'
                                                    // onClick={ ()=> handleDeleteClick(data.id ?? 0) } 
                                                >
                                                    <Trash2 size={12}/>
                                                </button>
                                        </Popconfirm>

									</div>
								)}
							/>
						</Table>

						<Pagination className='mt-4' 
							onChange={onPageChange}
							defaultCurrent={1} 
							total={total} />

						<div className='flex flex-end mt-2'>
							<Button className='ml-auto' 
								icon={<FileAddOutlined />} 
								type="primary" onClick={handClickNew}>
								New
							</Button>     
						</div>
					</div>
				</div>
				{/* card */}
			</div>


			{/* Modal */}
            <Modal
                open={open}
                title="USER INFORMATION"
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: "submit",
                }}
                onCancel={() => {setOpen(false); setErrors({});}}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
                        autoComplete="off"
                        initialValues={{
                            username: "",
                            password: "",
                            email: "",
                            lname: "",
                            fname: "",
                            mname: "",
                            sex: "MALE",
                            role: "USER",
                            active: true,
                        }}
                        clearOnDestroy
                        onFinish={(values) => onFinish(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    validateStatus={errors.username ? "error" : ""}
                    help={errors.username ? errors.username[0] : ""}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                {id < 1 ? (
                    <>
                        <Form.Item
                            name="password"
                            label="Password"
                            validateStatus={errors.password ? "error" : ""}
                            help={errors.password ? errors.password[0] : ""}
                        >
                            <Input.Password
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                placeholder="Re-type Password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password_confirmation"
                            label="Re-type Password"
                            validateStatus={
                                errors.password_confirmation ? "error" : ""
                            }
                            help={
                                errors.password_confirmation
                                    ? errors.password_confirmation[0]
                                    : ""
                            }
                        >
                            <Input.Password
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                placeholder="Re-type Password"
                            />
                        </Form.Item>
                    </>
                ) : (
                    ""
                )}

                <Form.Item
                    name="lname"
                    label="Last Name"
                    validateStatus={errors.lname ? "error" : ""}
                    help={errors.lname ? errors.lname[0] : ""}
                >
                    <Input placeholder="Last Name" />
                </Form.Item>

                <Form.Item
                    name="fname"
                    label="First Name"
                    validateStatus={errors.fname ? "error" : ""}
                    help={errors.fname ? errors.fname[0] : ""}
                >
                    <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                    name="mname"
                    label="Middle Name"
                    validateStatus={errors.mname ? "error" : ""}
                    help={errors.mname ? errors.mname[0] : ""}
                >
                    <Input placeholder="FiMiddlerst Name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email ? errors.email[0] : ""}
                >
                    <Input placeholder="Email" />
                </Form.Item>
				

                <div className="flex gap-4">
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
                </div>

            </Modal>


		</AdminAuthLayout>
	)
}
