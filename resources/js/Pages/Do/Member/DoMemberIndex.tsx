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
import { Captions, CheckCheck, FileLock2, MonitorCheck, Pencil, Pocket, ShieldOff, Trash2 } from 'lucide-react';
import DoAuthLayout from '@/Layouts/DoAuthLayout';

const { Column } = Table;


interface SearchFields {
    lname?: string;
    role?: string;
}

const DoMemeberIndex = ({ auth }: PageProps)=> {

	const [form] = Form.useForm();

	const  { notification, modal } = App.useApp();

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal
	const [passwordVisible, setPasswordVisible] = React.useState(false);

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState<SearchFields>({
        lname: '',
        role: '',
    });
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
			const res = await axios.get<PaginateResponse>(`/do/get-members?${params}`);
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

	const handleEditClick = (id:any) => {
		//setId(id);
        //setOpen(true);
        //getUser(id);
        router.visit('/do/members/' + id + '/edit');
	}



    const handleClickActiveInactive = (user:User) =>{
        if(user.active){
            axios.post('/do/users-set-inactive/' + user.id).then(res=>{
                notification.success({ placement: 'bottomRight', message: 'Active!', description: 'User successfully set to inactive.'})
                loadDataAsync()
            })
        }else{
            axios.post('/do/users-set-active/' + user.id).then(res=>{
                notification.success({ placement: 'bottomRight', message: 'Active!', description: 'User successfully set to active.'})
                loadDataAsync()
            })
        }
    }

    const handleClickAllowDisallow = (user:any) => {

        if(user.is_loan_allowed > 0){
            modal.confirm({title: 'Disallow?', content: 'Are you sure you want to disallow this member to loan?', 
                onOk: ()=>{
                axios.post('/do/member-disallow-loan/' + user.id).then(res=>{
                    notification.success({ placement: 'bottomRight', message: 'Updated!', description: 'Member set to disallow.'})
                    loadDataAsync()
                })
            }})
        }else{
            modal.confirm({title: 'Allow?', content: 'Are you sure you want to allow this member to loan?', 
                onOk: ()=>{
                axios.post('/do/member-allow-loan/' + user.id).then(res=>{
                    notification.success({ placement: 'bottomRight', message: 'Updated!', description: 'Member set to allow.'})
                    loadDataAsync()
                })
            }})
        }

       
        
    }

	return (
		<DoAuthLayout user={auth.user}>
			<Head title="Member Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1220px] overflow-auto'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF MEMBERS / BORROWERS</div>
					{/* card body */}
					<div className='z-0'>
                        <div>
                            <div className='flex flex-col gap-2 w-full'>
                                <label htmlFor="search-lname">Last Name</label>
                                <Input id='search-lname'
                                    onKeyDown={ (e) =>{
                                        if(e.key === 'Enter'){
                                            loadDataAsync()
                                        }
                                    }}
                                    name='lname' onChange={(e)=>{
                                        const {name, value} = e.target
                                        setSearch({...search, [name]:value})
                                    }} 
                                    placeholder="Search Last Name"/>
                            </div>

                            <div>
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
                                                        label: data.active ? 'Inactive' : 'Active',
                                                        icon: <CheckCheck  size={16} />,
                                                        onClick: ()=>{
                                                            handleClickActiveInactive(data)
                                                        }

                                                    },
                                                    {
                                                        key: '3',
                                                        label: data.is_loan_allowed ? 'Disallow Loan' : 'Allow Loan',
                                                        icon: <Pocket  size={16} />,
                                                        onClick: ()=>{
                                                            handleClickAllowDisallow(data)
                                                        }
                                                    },
                                                    
                                                    // {
                                                    //     key: '5',
                                                    //     label: (<ChangePassword data={data} onSuccess={loadDataAsync}/>),
                                                    // },
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

					</div>
				</div>
				{/* card */}
			</div>

		</DoAuthLayout>
	)
};


export default DoMemeberIndex;
