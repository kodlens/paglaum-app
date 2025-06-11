import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

import {
  Table,
  Pagination, Button, Form, Input,
  App,
  Dropdown,
} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BookUp, Captions, ClipboardList, RefreshCcwIcon, ShieldCheck, ThumbsDown, ThumbsUp } from 'lucide-react';
import { SavingsAccount } from "@/types/savingsAccount";
import BmAuthLayout from '@/Layouts/BmAuthLayout';

const { Column } = Table;

interface Fields {
  name: string;
  sa: string;
}
const BmSavingsAccountsIndex = ({ auth }: PageProps) => {

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

  interface PaginateResponse {
    data: any[],
    total: number;
  }

  const loadDataAsync = async () => {

    setLoading(true)
    const params = [
      `sa=${fields.sa}`,
      `name=${fields.name}`,
      `perpage=${perPage}`,
      `page=${page}`
    ].join('&');

    try {
      const res = await axios.get<PaginateResponse>(`/bm/get-savings-accounts?${params}`);
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value })
  }

  const handleActivate = (savingsAccount: SavingsAccount) => {
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
            console.log('Log error', err.response.data.errors);

            if (err.response.status === 422) {
              if (err.response.errors.approval) {
                notification.error({
                  placement: 'topRight',
                  description: 'Error: ' + err.response.data.errors.approval[0],
                  message: 'Error!'
                });
              }

            }

            if (err.response.data.status === 500) {
              notification.error({
                placement: 'topRight',
                description: 'Error: Unknown',
                message: 'Contact System Administrator'
              });
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
              notification.error({
                placement: 'topRight',
                description: 'Error: Unknown',
                message: 'Contact System Administrator'
              });
            }

          })
        }
      }
    })
  }

  return (
    <BmAuthLayout user={auth.user}>
      <Head title="Loan Management"></Head>

      <div className='flex mt-10 justify-center items-center'>
        {/* card */}
        <div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1120px] overflow-auto'>
          {/* card header */}
          <div className="font-bold mb-4 text-lg">LIST OF SAVINGS ACCOUNT</div>
          {/* card body */}

          <div className='my-4 p-4 border border-gray-200 rounded-md'>
            <div className="flex flex-wrap gap-y-2">
              <label>Savings Account</label>
              <Input
                autoComplete={'off'}
                type={"text"}
                placeholder="SA12324212..."
                name="sa"
                onChange={handleChange} />
            </div>
            <div className="flex flex-wrap gap-y-2 mt-4">
              <label>Last Name</label>
              <Input
                type={"text"}
                autoComplete={'off'}
                name="name"
                onChange={handleChange}
                placeholder="Juan Dela Cruz..." />
            </div>
            <div className='mt-4 mb-2'>
              <Button type='primary'
                icon={<RefreshCcwIcon size={16} />}
                iconPosition='start'
                onClick={() => loadDataAsync()}>Refresh</Button>
            </div>
          </div>
          <div className='z-0'>

            <Table dataSource={data}
              loading={loading}
              rowKey={(data) => data.id ?? 0}
              pagination={false}>

              <Column title="Id" dataIndex="id" key="id" />

              <Column title="Name" render={(_, data: any) => (
                <span>{data.user.lname}, {data.user.fname}</span>
              )} />

              <Column title="Account No." dataIndex='account_no' render={(account_no: string) => (
                <span className='font-bold'>{account_no}</span>
              )} />

              <Column title="Account Type" dataIndex="account_type" key="account_type" />

              <Column title="Available Balance" dataIndex='balance' render={(balance: number) => (
                <span className='font-bold'>&#8369; {balance.toFixed(2).toLocaleString()}</span>
              )} />

              <Column title="Default Acc" dataIndex="default_account" render={(default_account: number) => (
                  default_account > 0 ? (
                      <span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
                  ) : (
                      <span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
                  )
              )} />
              <Column title="DO Approved" dataIndex="is_do_approved" render={(is_do_approved: number) => (
                is_do_approved ? (
                  <span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
                ) : (
                  <span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
                )
              )} />

              <Column title="BM Approved" dataIndex="is_bm_approved" render={(is_bm_approved: number) => (
                is_bm_approved ? (
                  <span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
                ) : (
                  <span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
                )
              )} />
              <Column title="Action" key="action"
                render={(_, data: SavingsAccount) => (
                  <div className='flex gap-2'>

                    <Dropdown.Button
                      type="primary"
                      placement="topRight"
                      menu={{
                        items: [
                          {
                            key: '1',
                            label: data.is_bm_approved ? 'Disapprove' : 'Approve',
                            icon: data.is_bm_approved ? <ThumbsDown size={16} /> : <ThumbsUp size={16} />,
                            onClick: () => {
                              handleActivate(data)
                            }
                          },
                          {
                            key: '2',
                            label: 'Deposit/Withdrawal',
                            icon: <BookUp size={16} />,
                            onClick: () => router.visit('/bm/withdraw-deposit/' + data.id)
                          },
                          {
                            key: '3',
                            label: 'Details',
                            icon: <ClipboardList size={16} />,
                            onClick: () => router.visit('/bm/savings-account-details/' + data.id)
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

    </BmAuthLayout>
  )
}

export default BmSavingsAccountsIndex;
