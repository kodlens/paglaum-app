import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

import { FileAddOutlined,
	EyeInvisibleOutlined,EyeTwoTone } from '@ant-design/icons';

import { Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
	App, 
    Popconfirm,
    Dropdown,
    InputNumber} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Captions, FileLock2, MessageSquareMore, MonitorCheck, Pencil, ShieldOff, ThumbsUp, Trash2 } from 'lucide-react';
import { Area } from '@/types/area';
import { Loan } from '@/types/loan';
import BmLAuthLayout from '@/Layouts/BmAuthLayout';

const { Column } = Table;

interface SearchFields {
    is_do_approved?: number|string;
    is_bm_approved?: number|string;
}

const BmLoansIndex = ({ auth }: PageProps)  => {
	
	const [form] = Form.useForm();

	const  { notification, modal } = App.useApp();

    const [data, setData] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal
    const [search, setSearch] = useState<SearchFields>({
        is_do_approved: '',
        is_bm_approved: ''
    });

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [errors, setErrors] = useState<any>({});

    const [id, setId] = useState(0);
	
	
    interface PaginateResponse {
        data: any[],
        total: number;
    }

	const loadDataAsync = async () => {

        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `do=${search.is_do_approved}`,
            `bm=${search.is_bm_approved}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/bm/get-loans?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
			setLoading(false)
		}catch(err){
			console.log(err)
		}
    }

    useEffect(()=>{
        loadDataAsync()
    },[perPage, page])


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
		setId(id);
        setOpen(true);
        getData(id);
        //router.visit('/admin/users/' + id + '/edit');
	}

    const getData = (id:number) => {

        axios.get('/bm/get-loans/' + id).then(res=>{
            form.setFieldsValue({
                education_level: res.data.education_level,
                description: res.data.description,
                order_no: res.data.order_no,
                active: res.data.active > 0 ? true : false,
            })

            //console.log(res.data.active);
            
        });
    }


    const handleClickApprove = (loan:Loan) => {
        modal.confirm({title: 'Approve?', content: 'Are you sure you want to approve this borrower?', 
            onOk: ()=>{
                axios.post('/bm/approve-loan', loan).then(res=>{
                    if(res.data.status === 'approved'){
                        notification.success({ placement: 'bottomRight', message: 'Loan Approved!', description: 'Loan approved successfully.'})
                        loadDataAsync()
                    }
                }).catch(err=>{
                    if(err.response.data.errors.loan){
                        notification.error({
                            placement: 'bottomRight',
                            description: 'Error: ' + err.response.data.message,
                            message: 'Approved Already!'
                        });
                    }
                })

                // if(loan.is_bm_approve){
                //     axios.post('/bm/disapprove-loan', loan).then(res=>{
                //         if(res.data.status === 'approved'){
                //             notification.success({ placement: 'bottomRight', message: 'Deleted!', description: 'Item deleted successfully.'})
                //             loadDataAsync()
                //         }
                //     })
                // }else{
                //     axios.post('/bm/approve-loan', loan).then(res=>{
                //         if(res.data.status === 'approved'){
                //             notification.success({ placement: 'bottomRight', message: 'Deleted!', description: 'Item deleted successfully.'})
                //             loadDataAsync()
                //         }
                //     })
                // }
            
        }})
    }



	return (
		<BmLAuthLayout user={auth.user}>
			<Head title="Branch Manager"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1120px] overflow-auto'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF LOAN</div>
					{/* card body */}
					<div className='z-0'>

                       

                        <div className='my-4 flex gap-2'>
                            <div className='w-full'>
                                <Select
                                    value={search.is_do_approved}
                                    onChange={(value:number|string)=>setSearch({...search, is_do_approved: value})}
                                    className='w-full'
                                    options={[
                                        {
                                            label: 'ALL',
                                            value: ''
                                        },
                                        {
                                            label: 'DO APPROVED',
                                            value: '1'
                                        },
                                        {
                                            label: 'DO PENDING',
                                            value: '0'
                                        },
                                    ]}/>
                            </div>

                            <div className='w-full'>
                                <Select 
                                    value={search.is_bm_approved}
                                    onChange={(value:number|string)=>setSearch({...search, is_bm_approved: value})}
                                    className='w-full'
                                    options={[
                                        {
                                            label: 'ALL',
                                            value: ''
                                        },
                                        {
                                            label: 'BM APPROVED',
                                            value: '1'
                                        },
                                        {
                                            label: 'BM PENDING',
                                            value: '0'
                                        },
                                    ]} />
                            </div>
                           
                        </div>

                        <div className='my-4'>
                            <Button type='primary' onClick={ ()=> loadDataAsync() }>Refresh</Button>
                        </div>

                        <Table dataSource={data}
                            loading={loading}
                            rowKey={(data) => data.id ?? 0}
                            pagination={false}>

							<Column title="Id" dataIndex="id" key="id"/>

                            <Column title="Name" render={(_, data:any)=>(
                                <span>{data.user.lname}, {data.user.fname }</span>
                            )}/>

							<Column title="Loan Type" render={(_, data:any)=>(
                                <span>{data.loan_type.loan_type}</span>
                            )}/>

							<Column title="Loan Amount" dataIndex='principal' render={(principal:number)=>(
                                <span className='font-bold'>{principal.toLocaleString()}</span>
                            )}/>

							<Column title="Terms (Mos)" dataIndex="terms_month" key="terms_month"/>
							
                            <Column title="Interest(%)" dataIndex="interest" key="interest"/>

                            <Column title="Mode" dataIndex="mode_payment" key="mode_payment"/>

							<Column title="Approve(DO)" dataIndex="is_do_approve" render={(is_do_approve:number)=>(
								is_do_approve > 0 ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)} />

                            <Column title="Approve(BM)" dataIndex="is_bm_approve" render={(is_bm_approve:number)=>(
								is_bm_approve > 0 ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)} />
							<Column title="Action" key="action" 
								render={(_, data:Loan) => (
									<div className='flex gap-2'>

                                        <Dropdown.Button type="primary"
                                            placement="bottomRight"
                                            menu={{
                                                items: [
                                                    {
                                                        key: '1',
                                                        label: 'Approve',
                                                        icon: <ThumbsUp  size={16} />,
                                                        onClick: ()=>{
                                                            handleClickApprove(data)
                                                        }
                                                    },
                                                    {
                                                        key: '2',
                                                        label: 'Details',
                                                        icon: <MessageSquareMore size={16} />,
                                                        onClick: ()=>{
                                                            router.visit('/bm/member-loan-details/' + data.id)
                                                        }
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
                        
                        <div className='my-2'>No of Row(s): {total}</div>
                        
						<Pagination className='mt-4' 
							onChange={onPageChange}
							defaultCurrent={1} 
							total={total} />

						{/* <div className='flex flex-end mt-2'>
							<Button className='ml-auto' 
								icon={<FileAddOutlined />} 
								type="primary" onClick={handClickNew}>
								New
							</Button>     
						</div> */}
					</div>
				</div>
				{/* card */}
			</div>


		</BmLAuthLayout>
	)
}

export default BmLoansIndex;