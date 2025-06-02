import { PageProps } from '@/types'
import { Head, router } from '@inertiajs/react'

import {
    Space, Table,
    Pagination, Button, Form, Input,
    App,
    Dropdown,
} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BookUp, Captions, RefreshCcwIcon, ShieldCheck, ThumbsUp } from 'lucide-react';
import { SavingsAccount } from "@/types/savingsAccount";
import BmAuthLayout from '@/Layouts/BmAuthLayout';
import dayjs from 'dayjs'
import DoAuthLayout from '@/Layouts/DoAuthLayout';


const { Column } = Table;
const formatDate = (ndate:Date, format:string) => {
    return dayjs(ndate).format(format);
}
interface Fields {
    name: string;
    sa: string;
}
const DoSavingsAccountDetails = ({ auth, savingAccount }: PageProps<{savingAccount:SavingsAccount}>) => {

    const [form] = Form.useForm();
    //const { form } = useForm();
    const { notification, modal } = App.useApp();

    const [data, setData] = useState<SavingsAccount[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [fields, setFields] = useState<Fields>({
        sa: '',
        name: ''
    }); //for modal

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});
  
    interface PaginateResponse {
        data: any[],
        total: number;
    }

    const loadDataAsync = async () => {

        setLoading(true)
        const params = [
            `id=${savingAccount.id}`,
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');

        try {
            const res = await axios.get<PaginateResponse>(`/do/get-savings-account-details?${params}`);
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
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value })
    }


    return (
        <DoAuthLayout user={auth.user}>
            <Head title="Savings Account Detail"></Head>

            <div className='flex mt-10 justify-center items-center'>
                {/* card */}
                <div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1120px] overflow-auto'>
                    {/* card header */}
                    <div className="font-bold mb-4 text-lg">SAVING ACCOUNT DETAILS</div>
                    {/* card body */}

                    <div className='z-0'>

                        <Table dataSource={data}
                               loading={loading}
                               rowKey={(data) => data.id ?? 0}
                               pagination={false}>

                            <Column title="Id" dataIndex="id" key="id" />

                            <Column title="Transaction Type" dataIndex="transaction_type" key="transaction_type"/>

                            <Column title="Date & Time" dataIndex='created_at' render={(created_at: Date) => (
                                <span>{formatDate(created_at, 'MMM DD, YYYY')}</span>
                            )} />

                            <Column title="Amount Paid" dataIndex='amount' render={(amount: number) => (
                                <span className='font-bold'>&#8369; { amount ? amount.toFixed(2).toLocaleString() : 0}</span>
                            )} />

                            <Column title="Balance" dataIndex='balance' render={(balance: number) => (
                                <span className='font-bold'>&#8369; { balance ? balance.toFixed(2).toLocaleString() : 0}</span>
                            )} />
                            
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

export default DoSavingsAccountDetails;
