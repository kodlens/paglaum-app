import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

import {
    Space, Table,
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
    App,
    Popconfirm,
    Dropdown,
    InputNumber
} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BookUp, Captions, FileLock2, MessageSquareMore, Pencil, RefreshCcwIcon, ShieldCheck, ShieldOff, ThumbsUp, Trash2, Wallet } from 'lucide-react';
import { Loan } from '@/types/loan';
import DoAuthLayout from '@/Layouts/DoAuthLayout';
import { LoanType } from '@/types/loanType';
import { SavingsAccount } from "@/types/savingsAccount";

const { Column } = Table;


const DoSavingsAccountsIndex = ({ auth }: PageProps) => {

    const [form] = Form.useForm();
    //const { form } = useForm();
    const { notification, modal } = App.useApp();

    const [data, setData] = useState<SavingsAccount[]>([]);
    const [loan, setLoan] = useState<SavingsAccount>();
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

        try {
            const res = await axios.get<PaginateResponse>(`/do/get-member-savings-accounts?${params}`);
            setData(res.data.data)
            setTotal(res.data.total)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadDataAsync()
    }, [perPage, search, page])

    const onPageChange = (index: number, perPage: number) => {
        setPage(index)
        setPerPage(perPage)
    }

    const handleClickApprove = (savingsAccount: SavingsAccount) => {
        modal.confirm({
            title: savingsAccount.is_approved ? 'Disapprove?' : 'Approve?', content: `Are you sure you want to ${savingsAccount.is_approved ? 'disapprove' : 'approve'} this SA?`,
            onOk: () => {
                if (!!savingsAccount.is_approved) {
                    axios.post('/do/disapprove-savings-account/' + savingsAccount.id).then(res => {
                        if (res.data.status === 'disapproved') {
                            notification.success({ placement: 'bottomRight', message: 'Disapproved!', description: 'SA Disapproved successfully.' })
                            loadDataAsync()
                        }
                    }).catch(err => {

                        if (err.response.status === 422) {
                            notification.error({
                                placement: 'bottomRight',
                                description: 'Error: ' + err.response.data.message,
                                message: 'Approved Already!'
                            });
                        }

                        if (err.response.data.status === 500) {
                            if (err.response.data.errors.loan) {
                                notification.error({
                                    placement: 'bottomRight',
                                    description: 'Error: Unknown',
                                    message: 'Contact System Administrator'
                                });
                            }
                        }
                    })
                } else {
                    axios.post('/do/approve-savings-account/' + savingsAccount.id).then(res => {
                        if (res.data.status === 'approved') {
                            notification.success({ placement: 'bottomRight', message: 'Approved!', description: 'SA approved successfully.' })
                            loadDataAsync()
                        }
                    }).catch(err => {
                        if (err.response.data.errors.loan) {
                            notification.error({
                                placement: 'bottomRight',
                                description: 'Error: ' + err.response.data.message,
                                message: 'Approved Already!'
                            });
                        }
                        if (err.response.data.status === 500) {
                            if (err.response.data.errors.loan) {
                                notification.error({
                                    placement: 'bottomRight',
                                    description: 'Error: Unknown',
                                    message: 'Contact System Administrator'
                                });
                            }
                        }

                    })
                }
            }
        })
    }


    const handleActivate = (savingsAccount: SavingsAccount) => {
        modal.confirm({
            title: savingsAccount.is_active ? 'Deactivate?' : 'Activate?', content: `Are you sure you want to ${savingsAccount.is_active ? 'deactivate' : 'activate'} this SA?`,
            onOk: () => {
                if (!!savingsAccount.is_active) {
                    axios.post('/do/deactivate-savings-account/' + savingsAccount.id).then(res => {
                        if (res.data.status === 'deactivated') {
                            notification.success({ placement: 'bottomRight', message: 'Deactivated!', description: 'SA deactivated successfully.' })
                            loadDataAsync()
                        }
                    }).catch(err => {

                        if (err.response.status === 422) {
                            notification.error({
                                placement: 'bottomRight',
                                description: 'Error: ' + err.response.data.message,
                                message: 'Approved Already!'
                            });
                        }

                        if (err.response.data.status === 500) {
                            if (err.response.data.errors.loan) {
                                notification.error({
                                    placement: 'bottomRight',
                                    description: 'Error: Unknown',
                                    message: 'Contact System Administrator'
                                });
                            }
                        }
                    })
                } else {
                    axios.post('/do/activate-savings-account/' + savingsAccount.id).then(res => {
                        if (res.data.status === 'activated') {
                            notification.success({ placement: 'bottomRight', message: 'Activated!', description: 'SA activate successfully.' })
                            loadDataAsync()
                        }
                    }).catch(err => {
                        if (err.response.data.errors.loan) {
                            notification.error({
                                placement: 'bottomRight',
                                description: 'Error: ' + err.response.data.message,
                                message: 'Approved Already!'
                            });
                        }
                        if (err.response.data.status === 500) {
                            if (err.response.data.errors.loan) {
                                notification.error({
                                    placement: 'bottomRight',
                                    description: 'Error: Unknown',
                                    message: 'Contact System Administrator'
                                });
                            }
                        }

                    })
                }
            }
        })
    }

    const showLoanInformation = (loan: Loan) => {
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
                    <div className="font-bold mb-4 text-lg">LIST OF SAVINGS ACCOUNT</div>
                    {/* card body */}
                    <div className='z-0'>
                        <div className='my-4'>
                            <Button type='primary'
                                icon={<RefreshCcwIcon size={16} />}
                                iconPosition='start'
                                onClick={() => loadDataAsync()}>Refresh</Button>
                        </div>
                        <Table dataSource={data}
                            loading={loading}
                            rowKey={(data) => data.id ?? 0}
                            pagination={false}>

                            <Column title="Id" dataIndex="id" key="id" />

                            <Column title="Name" render={(_, data: any) => (
                                <span>{data.user.lname}, {data.user.fname}</span>
                            )} />

                            {/*<Column title="Loan Type" render={(_, data:any)=>(*/}
                            {/*  <span>{data.loan_type.loan_type}</span>*/}
                            {/*)}/>*/}

                            <Column title="Account No." dataIndex='account_no' render={(account_no: string) => (
                                <span className='font-bold'>{account_no}</span>
                            )} />

                            <Column title="Account Type" dataIndex="account_type" key="account_type" />

                            <Column title="Available Balance" dataIndex='balance' render={(balance: number) => (
                                <span className='font-bold'>&#8369; {balance.toFixed(2).toLocaleString()}</span>
                            )} />

                            <Column title="Approved" dataIndex="is_approved" render={(is_approved: number) => (
                                is_approved > 0 ? (
                                    <span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
                                ) : (
                                    <span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
                                )
                            )} />

                            <Column title="Active" dataIndex="is_active" render={(is_active: number) => (
                                is_active > 0 ? (
                                    <span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
                                ) : (
                                    <span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
                                )
                            )} />
                            <Column title="Action" key="action"
                                render={(_, data: SavingsAccount) => (
                                    <div className='flex gap-2'>

                                        <Dropdown.Button type="primary"
                                            placement="bottomRight"
                                            menu={{
                                                items: [
                                                    {
                                                        key: '2',
                                                        label: data.is_approved ? 'Disapprove' : 'Approve',
                                                        icon: <ThumbsUp size={16} />,
                                                        onClick: () => {
                                                            handleClickApprove(data)
                                                        }
                                                    },
                                                    {
                                                        key: '1',
                                                        label: data.is_active ? 'Deactivate' : 'Activate',
                                                        icon: <ShieldCheck size={16} />,
                                                        onClick: () => {
                                                            handleActivate(data)
                                                        }
                                                    },

                                                    {
                                                        key: '3',
                                                        label: 'Details',
                                                        icon: <MessageSquareMore size={16} />,
                                                        onClick: () => {
                                                            showLoanInformation(data)
                                                        }
                                                    },

                                                    {
                                                        key: '3',
                                                        label: 'Deposit/Withdrawal',
                                                        icon: <BookUp size={16} />,
                                                        onClick: () => router.visit('/do/member-withdrawal-deposit/' + data.id)
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

export default DoSavingsAccountsIndex;
