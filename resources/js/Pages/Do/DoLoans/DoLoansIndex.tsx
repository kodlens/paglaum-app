import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

import { Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
	App, 
    Popconfirm,
    Dropdown,
    InputNumber} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Captions, FileLock2, MessageSquareMore, MonitorCheck, Pencil, RefreshCcwIcon, ShieldOff, ThumbsUp, Trash2, Wallet } from 'lucide-react';
import { Loan } from '@/types/loan';
import DoAuthLayout from '@/Layouts/DoAuthLayout';
import { LoanType } from '@/types/loanType';

const { Column } = Table;


const DoLoansIndex = ({ auth }: PageProps)  => {
	
	const [form] = Form.useForm();
    //const { form } = useForm();
	const  { notification, modal } = App.useApp();

    const [data, setData] = useState<Loan[]>([]);
    const [loan, setLoan] = useState<Loan>();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [loanTypes, setLoanTypes] = useState<any[]>([])
    const [loanSubtypes, setLoanSubtypes] = useState<any[]>([])


    const [id, setId] = useState(0);
	
    interface PaginateResponse {
        data: any[],
        total: number;
    }
       
  

	const loadDataAsync = async () => {

        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/do/get-loans?${params}`);
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


	const onFinish = async (values:Loan) =>{

		if(id > 0){
			try{
				const res = await axios.put('/do/loans/' + id, values)
				if(res.data.status === 'updated'){
					notification.info({ placement: 'bottomRight', message: 'Updated!', description: 'Education Level successfully updated.'})
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
				const res = await axios.post('/do/education-levels', values)
				if(res.data.status === 'saved'){
					notification.info({ placement: 'bottomRight', message: 'Saved!', description: 'Education Level successfully saved.'})
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

    const handleClickApprove = (loan:Loan) => {

        modal.confirm({title: loan.is_do_approve ? 'Disapprove?' : 'Approve?', content: `Are you sure you want to ${loan.is_do_approve ? 'dispprove' : 'approve'} this borrower?`, 
            onOk: ()=>{
                if(!!loan.is_do_approve){
                    axios.post('/do/disapprove-loan', loan).then(res=>{
                        if(res.data.status === 'disapproved'){
                            notification.success({ placement: 'bottomRight', message: 'Disapproved!', description: 'Disapproved successfully.'})
                            loadDataAsync()
                        }
                    }).catch(err => {
                        
                        if(err.response.status === 422){
                            notification.error({
                                placement: 'bottomRight',
                                description: 'Error: ' + err.response.data.message,
                                message: 'Approved Already!'
                            });
                        }

                        if(err.response.data.status === 500){
                            if(err.response.data.errors.loan){
                                notification.error({
                                    placement: 'bottomRight',
                                    description: 'Error: Unknown',
                                    message: 'Contact System Administrator'
                                });
                            }
                        }
                    })
                }else{
                    axios.post('/do/approve-loan', loan).then(res=>{
                        if(res.data.status === 'approved'){
                            notification.success({ placement: 'bottomRight', message: 'Approved!', description: 'Borrower approved successfully.'})
                            loadDataAsync()
                        }
                    }).catch(err => {
                        if(err.response.data.errors.loan){
                            notification.error({
                                placement: 'bottomRight',
                                description: 'Error: ' + err.response.data.message,
                                message: 'Approved Already!'
                            });
                        }
                    })
                }

        }})
    }

    const showLoanInformation = (loan:Loan) => {
       router.visit(`/do/do-member-loan-details/${loan.id}`)
    }

	return (
		<DoAuthLayout user={auth.user}>
			<Head title="Loan Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1120px] overflow-auto'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF LOAN</div>
					{/* card body */}
					<div className='z-0'>

                        <div className='my-4'>
                            <Button type='primary' 
                                icon={<RefreshCcwIcon size={16} />}
                                iconPosition='start' 
                                onClick={ ()=> loadDataAsync() }>Refresh</Button>
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
                                <span className='font-bold'>&#8369; {principal.toLocaleString()}</span>
                            )}/>

							<Column title="Terms (Mos)" dataIndex="terms_month" key="terms_month"/>
							
                            <Column title="Interest(%)" dataIndex="interest" key="interest"/>

							<Column title="Approve(DO)" dataIndex="is_do_approve" render={(is_do_approve:number)=>(
								is_do_approve > 0 ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
                            <Column title="Approve(BM)" dataIndex="is_bm_approve" render={(is_bm_approve:number)=>(
								is_bm_approve > 0 ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
							<Column title="Action" key="action" 
								render={(_, data:Loan) => (
									<div className='flex gap-2'>

                                        <Dropdown.Button type="primary"
                                            placement="bottomRight"
                                            menu={{
                                                items: [
                                                    // {
                                                    //     key: '1',
                                                    //     label: 'Edit',
                                                    //     icon: <Pencil size={16} />,
                                                    //     onClick: ()=>{
                                                    //         handleEditClick(data.id)
                                                    //     }
                                                    // },
                                                    {
                                                        key: '2',
                                                        label: data.is_do_approve ? 'Disapprove' : 'Approve',
                                                        icon: <ThumbsUp  size={16} />,
                                                        onClick: ()=>{
                                                            handleClickApprove(data)
                                                        }
                                                    },
                                                    {
                                                        key: '3',
                                                        label: 'Details',
                                                        icon: <MessageSquareMore size={16} />,
                                                        onClick: ()=>{
                                                            showLoanInformation(data)
                                                        }
                                                    },
                                                    {
                                                        key: '4',
                                                        label: 'Make A Payment',
                                                        icon: <Wallet  size={16} />,
                                                        onClick: ()=>{
                                                            router.visit('/do/make-a-payment/' + data.id)
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


			


		</DoAuthLayout>
	)
}

export default DoLoansIndex;