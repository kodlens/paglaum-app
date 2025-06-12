import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

import {
    FileAddOutlined
} from '@ant-design/icons';

import {
    Table,
    Pagination, Button, Modal,
    Form,
    App,
    Dropdown
} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PaginateResponse } from '@/types/apiResponse';
import { Captions, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import DoAuthLayout from '@/Layouts/DoAuthLayout';
import InputAutocompleteMember from '@/Components/InputAutocompleteMember';
import InputAutocompleteNotApproveMember from '@/Components/InputAutocompleteNotApproveMember';
import { SavingsAccount } from '@/types/savingsAccount';
import BmAuthLayout from '@/Layouts/BmAuthLayout';
import AutoCompleteUser from '@/Components/AutoCompleteUser';

const { Column } = Table;


interface SearchFields {
    lname?: string;
    role?: string;
}

const BmPendingSavingsAccountIndex = ({ auth }: PageProps) => {

    const [form] = Form.useForm();

    const { notification, modal } = App.useApp();

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

        try {
            const res = await axios.get<PaginateResponse>(`/bm/get-pending-savings-account?${params}`);
            setData(res.data.data)
            setTotal(res.data.total)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadDataAsync()
    }, [perPage, page])


    const onPageChange = (index: number, perPage: number) => {
        setPage(index)
        setPerPage(perPage)
    }


    const handleClickApprove = (savingsAccount: SavingsAccount) => {
        modal.confirm({
            title: savingsAccount.is_bm_approved ? 'Disapprove?' : 'Approve?', content: `Are you sure you want to ${savingsAccount.is_bm_approved ? 'disapprove' : 'approve'} this SA?`,
            onOk: () => {
                if (!!savingsAccount.is_bm_approved) {
                    axios.post('/bm/disapprove-savings-account/' + savingsAccount.id).then(res => {
                        if (res.data.status === 'disapproved') {
                            notification.success({ placement: 'topRight', message: 'Disapproved!', description: 'SA disapproved successfully.' })
                            loadDataAsync()
                        }
                    }).catch(err => {

                        if (err.response.status === 422) {
                            notification.error({
                                placement: 'topRight',
                                description: 'Error: ' + err.response.data.message,
                                message: 'Invalid!'
                            });
                        }

                        if (err.response.data.status === 500) {
                            if (err.response.data.errors.loan) {
                                notification.error({
                                    placement: 'topRight',
                                    description: 'Error: Unknown',
                                    message: 'Contact System Administrator'
                                });
                            }
                        }
                    })
                } else {
                    axios.post('/bm/approve-savings-account/' + savingsAccount.id).then(res => {
                        if (res.data.status === 'approved') {
                            notification.success({ placement: 'topRight', message: 'Approved!', description: 'SA approved successfully.' })
                            loadDataAsync()
                        }
                    }).catch(err => {
                        if (err.response.status === 422) {
                            notification.error({
                                placement: 'topRight',
                                description: 'Error: ' + err.response.data.message,
                                message: 'Invalid!'
                            });
                        }
                        if (err.response.data.status === 500) {
                            if (err.response.data.errors.loan) {
                                notification.error({
                                    placement: 'topRight',
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
    


return (
    <BmAuthLayout user={auth.user}>
        <Head title="Member Management"></Head>

        <div className='flex mt-10 justify-center items-center'>
            {/* card */}
            <div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1220px] overflow-auto'>
                {/* card header */}
                <div className="font-bold mb-4 text-lg">LIST OF PEINDG SAVINGS ACCOUNT</div>
                {/* card body */}
                <div className='z-0'>
                    <div>
                        <div className='mb-4 flex flex-col w-full'>
                            <label htmlFor="" className='mb-2'>Last Name</label>
                            <AutoCompleteUser
                                onChange={(value: string) => {
                                    setSearch({ ...search, lname: value })
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        loadDataAsync()
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className='my-4'>
                        <Button type='primary'
                            onClick={() => loadDataAsync()}>Refresh</Button>
                    </div>
                    <Table dataSource={data}
                        loading={loading}

                        rowKey={(data) => data.id ?? 0}
                        pagination={false}>

                        <Column title="Id" dataIndex="id" key="id" />
                        <Column title="Account No." key="account_no" dataIndex="account_no" />
                        <Column title="Account Name" key="account_name" dataIndex="account_name" />

                        <Column title="DO Approve" key="is_do_approved" render={(data: SavingsAccount) => (
                            data.is_do_approved ? (
                                <span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
                            ) : (
                                <span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
                            )
                        )} />

                        <Column title="BM Approve" key="is_bm_approved" render={(data: SavingsAccount) => (
                            data.is_bm_approved ? (
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
                                                    label: data.is_bm_approved ? 'BM Disapprove' : 'BM Approve',
                                                    icon: data.is_bm_approved ? <ThumbsDown size={16} /> : <ThumbsUp size={16} />,
                                                    onClick: () => {
                                                        handleClickApprove(data)
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

                    <Pagination className='mt-4'
                        onChange={onPageChange}
                        defaultCurrent={1}
                        total={total} />

                </div>
            </div>
            {/* card */}
        </div>

    </BmAuthLayout>
)
};


export default BmPendingSavingsAccountIndex;
