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
import { PaginateResponse } from '@/types/apiResponse';
import { Captions, FileLock2, MonitorCheck, Pencil, ShieldOff, Trash2 } from 'lucide-react';
import BmLAuthLayout from '@/Layouts/BmAuthLayout';
import ChangePassword from './partials/ChangePassword';
import InputAutocompleteMember from '@/Components/InputAutocompleteMember';

const { Column } = Table;

interface SearchFields {
    lname?: string;
    role?: string;
}


const BmMemberIndex = ({ auth }: PageProps)=> {

	const [form] = Form.useForm();

	const  { notification, modal } = App.useApp();

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal

	const [passwordVisible, setPasswordVisible] = useState(false);

    const [search, setSearch] = useState<SearchFields>({
        lname: '',
        role: '',
    });

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [errors, setErrors] = useState<any>({});

    const [id, setId] = useState(0);

	const loadDataAsync = async () => {

        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `lname=${search.lname}`,
            `role=${search.role}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/bm/get-members?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
			setLoading(false)
		}catch(err){
			console.log(err)
		}
    }

    useEffect(()=>{
        loadDataAsync()
    },[perPage, search.role, page])


    const onPageChange = (index:number, perPage:number) => {
        setPage(index)
        setPerPage(perPage)
    }

	const handClickNew = () => {
        //router.visit('/');
		setId(0)
        setOpen(true)
    }

	const handleEditClick = (id:any) => {
		//setId(id);
        //setOpen(true);
        //getUser(id);
        router.visit('/bm/members/' + id + '/edit');
	}

	const handleDeleteClick = async (id:number) => {

		const res = await axios.delete(`/bm/members/${id}`);
		if(res.data.status === 'deleted'){
			loadDataAsync()
		}
	}


	const onFinish = async (values:User) =>{

		if(id > 0){
			try{
				const res = await axios.put('/bm/users/' + id, values)
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
				const res = await axios.post('/bm/users', values)
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
        axios.post('/bm/user-set-active/' + id).then(res=>{
            notification.success({ placement: 'bottomRight', message: 'Active!', description: 'User successfully set to active.'})
        })
        loadDataAsync()
    }

    const handleClickInactive = (id:any) => {
        axios.post('/bm/user-set-inactive/' + id).then(res=>{
            notification.success({ placement: 'bottomRight', message: 'Deactivated!', description: 'User successfully set to inactive.'})
        })
        loadDataAsync()
    }

    const handleClickAllowDisallow = (user:any) => {

        if(user.is_loan_allowed > 0){
            modal.confirm({title: 'Disallow?', content: 'Are you sure you want to disallow this member to loan?', 
                onOk: ()=>{
                axios.post('/bm/member-disallow-loan/' + user.id).then(res=>{
                    notification.success({ placement: 'bottomRight', message: 'Updated!', description: 'Member set to disallow.'})
                    loadDataAsync()
                })
            }})
        }else{
            modal.confirm({title: 'Allow?', content: 'Are you sure you want to allow this member to loan?', 
                onOk: ()=>{
                axios.post('/bm/member-allow-loan/' + user.id).then(res=>{
                    notification.success({ placement: 'bottomRight', message: 'Updated!', description: 'Member set to allow.'})
                    loadDataAsync()
                })
            }})
        }
    }

    useEffect(()=>{
        loadDataAsync()
    },[search])

	return (
		<BmLAuthLayout user={auth.user}>
			<Head title="User Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1220px] overflow-auto'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF MEMBERS / BORROWERS</div>
					{/* card body */}
					<div className='z-0'>
                        <div>
                            <div className='flex flex-col w-full mb-4'>
                                <label htmlFor="" className='mb-2'>Last Name</label>
                                <InputAutocompleteMember handleSelect={(value:string)=>{
                                    setSearch({...search, lname:value})
                                }}/>
                            </div>
                            <div className='flex flex-col gap-2 w-full'>
                                <label>Select Role</label>
                                <Select
                                    value={search.role}
                                    onChange={(value:string)=>setSearch({...search, role: value})}
                                    className='w-full'
                                    options={[
                                        { value: "", label: "ALL" },
                                        { value: "YBS", label: "YOUTH BEE" },
                                        { value: "MEMBER", label: "MEMBER" },
                                    ]}/>
                            </div>
                        </div>

                        <div className='my-4'>
                            <Button type='primary' 
                                onClick={()=> loadDataAsync()}>Refresh</Button>
                        </div>
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

                            <Column title="Allow Loan" dataIndex="is_loan_allowed" render={(is_loan_allowed:number)=>(
								is_loan_allowed > 0 ? (
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
                                                            handleEditClick(data.id)
                                                        }
                                                    },
                                                    {
                                                        key: '2',
                                                        label: data.active ? 'Inactive' : 'Acitve',
                                                        icon: <MonitorCheck  size={16} />,
                                                        onClick: ()=>{
                                                            data.active ? handleClickInactive(data.id) : handleClickActive(data.id)
                                                            
                                                        }

                                                    },
                                                    {
                                                        key: '3',
                                                        label: data.is_loan_allowed ? 'Disallow Loan' : 'Allow Loan',
                                                        icon: <MonitorCheck  size={16} />,
                                                        onClick: ()=>{
                                                            handleClickAllowDisallow(data)
                                                        }

                                                    },
                                                    {
                                                        key: '5',
                                                        label: (<ChangePassword data={data} onSuccess={loadDataAsync}/>),
                                                    },
                                                ],
                                            }}
                                            trigger={['click']}
                                        >
                                            <Captions size={16} />
                                        </Dropdown.Button>

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
                            username: '',
                            password: '',
                            email: '',
                            lname: '',
                            fname: '',
                            mname: '',
                            sex: "MALE",
                            role: '',
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
                                { value: "YBS", label: "YOUTH BEE" },
                                { value: "MEMBER", label: "MEMBER" },
                                { value: "BM", label: "BRANCH MANAGER" },
                                { value: "ADMIN", label: "ADMINISTRATOR" },
                            ]}
                        />
                    </Form.Item>
                </div>

            </Modal>

		</BmLAuthLayout>
	)
};


export default BmMemberIndex;
