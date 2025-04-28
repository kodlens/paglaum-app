import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

import { Space, Table, 
    Pagination, Button,
    Form, Input, Select, Checkbox,
	App, 
    Popconfirm,
    Dropdown,
    InputNumber,
    Modal} from 'antd';


import  { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios';
import { Captions,  Wallet } from 'lucide-react';

import dayjs from 'dayjs';

const { Column } = Table;

const customDateFormat = (item:string, format:string) => {
    return dayjs(item).format(format)
}

interface FormData {
    id?: number;
    amount_paid?: number;
}

const MakePayment = ({ loanId }: { loanId:number })  => {
    
	
	const [fields, setFields] = useState<FormData>({
        amount_paid: 0
    })

	const  { notification, modal } = App.useApp();

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [modalOpen, setModalOpen] = useState(false); //for modal

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});


    const [id, setId] = useState(0);
    
	const loadDataAsync = async () => {
        const params = [
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');
		try{
			const res = await axios.get(`/get-member-loans/${loanId}?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
			setLoading(false)
            
		}catch(err){
			//console.log(err)
		}
    }

    

    useEffect(()=>{
        loadDataAsync()
    },[perPage, page])


    const onPageChange = (index:number, perPage:number) => {
        setPage(index)
        setPerPage(perPage)
    }


	const onFinish = async (values:any) =>{

        console.log(values);
        
        return;
		if(id > 0){
			try{
				const res = await axios.put('/do/loans/' + id, values)
				if(res.data.status === 'updated'){
					notification.info({ placement: 'bottomRight', message: 'Updated!', description: 'Education Level successfully updated.'})
					setModalOpen(false)
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
					setModalOpen(false)
					loadDataAsync()
				}
			}catch(err:any){
				if(err.response.status === 422){
                    setErrors(err.response.data.errors)
				}
			}
		}
	}

    const handleModalPaymentOpen = (id:number) => {
        console.log(id);
        
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }


    const handleModalPaymentSubmit = () => {
        console.log(fields);
    }

	return (
        <>
            <div className='flex mt-10 justify-center items-center'>
                {/* card */}
                <div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
                    md:w-[1120px] overflow-auto'>
                    {/* card header */}
                    <div className="font-bold mb-4 text-lg">LOAN BREAKDOWN OF JUAN DELA CRUZ</div>
                    {/* card body */}
                    <div className='z-0'>

                        <div className='my-4'>
                            <Button type='primary' onClick={ ()=> loadDataAsync() }>Refresh</Button>
                        </div>
                        <Table dataSource={data}
                            loading={loading}
                            rowKey={(data) => data.id ?? 0}
                            pagination={false}>

                            <Column title="Id" dataIndex="id" key="id"/>

                            <Column title="Due Date" dataIndex='due_date' render={due_date=>(
                                <span>{customDateFormat(due_date, 'MMM-DD-YYYY')}</span>
                            )}/>

                            <Column title="(&#8369;) Amount" dataIndex='amount' render={(amount:number)=>(
                                <span className='font-bold'>&#8369; {amount.toLocaleString()}</span>
                            )}/>

                            <Column title="Payment Method" dataIndex="payment_method" key="payment_method"/>

                            {/* <Column title="Payment Session" dataIndex="payment_session" key="payment_session"/> */}

                            <Column title="Paid" dataIndex="is_paid" render={is_paid => (
                                is_paid === 1 ? (
                                    <span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
                                ) : (
                                    <span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
                                )
                            )}/>
                        
                            <Column title="Action" key="action" 
                                render={(_, data:any) => (
                                    <div className='flex gap-2'>

                                        <Dropdown.Button type="primary"
                                            placement="bottomRight"
                                            menu={{
                                                items: [
                                                    {
                                                        key: '1',
                                                        label: 'PAY NOW',
                                                        icon: <Wallet  size={16} />,
                                                        onClick: ()=>{handleModalPaymentOpen(data.id)}
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
                    </div>
                </div>
                {/* card */}
            </div>



            {/* Modal */}
            <Modal title="PAYMENT" open={modalOpen} 
                onOk={()=> handleModalPaymentSubmit} 
                onCancel={()=>{setModalOpen(false)}}>

                <div>
                    <Form.Item
                        layout='vertical'
                        label="Amount to be pay"
                        validateStatus={errors.amount_paid ? "error" : ""}
                        help={errors.amount_paid ? errors.amount_paid[0] : ""}
                    >
                        <InputNumber 
                            name='amount_paid'
                            value={fields.amount_paid} 
                            className='w-full'
                            onChange={(value:number|null) => 
                                setFields(prev => ({
                                    ...prev,
                                    amount_paid: value ?? 0
                                }))
                            }
                            placeholder="Amount to be pay"  />
                    </Form.Item>
                </div>
            </Modal>

           
        </>
	)
}

export default MakePayment;