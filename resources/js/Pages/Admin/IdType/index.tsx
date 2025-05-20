import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

import { FileAddOutlined } from '@ant-design/icons';

import { Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
	App, 
    Popconfirm,
    Dropdown,
    InputNumber} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminAuthLayout from '@/Layouts/AdminAuthLayout';
import { PaginateResponse } from '@/types/apiResponse';
import { Captions, FileLock2, MonitorCheck, Pencil, ShieldOff, Trash2 } from 'lucide-react';
import { IdType } from '@/types/idType';

const { Column } = Table;


const IdTypeIndex = ({ auth }: PageProps)  => {
	
	const [form] = Form.useForm();

	const  { notification, modal } = App.useApp();

    const [data, setData] = useState<IdType[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [id, setId] = useState(0);
	
	
	const loadDataAsync = async () => {

        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/admin/get-id-types?${params}`);
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

	const handleEditClick = (id:any) => {
		setId(id);
        setOpen(true);
        getData(id);
        //router.visit('/admin/users/' + id + '/edit');
	}

    const getData = (id:number) => {

        axios.get('/admin/id-types/' + id).then(res=>{
            form.setFieldsValue({
                id_type: res.data.id_type,
                order_no: res.data.order_no,
                active: res.data.active > 0 ? true : false,
            })

            console.log(res.data.active);
            
        });
    }

	const handleDeleteClick = async (id:number) => {
        
		const res = await axios.delete(`/admin/areas/${id}`);
		if(res.data.status === 'deleted'){
			loadDataAsync()
		}
	}
	

	const onFinish = async (values:IdType) =>{

		if(id > 0){
			try{
				const res = await axios.put('/admin/id-types/' + id, values)
				if(res.data.status === 'updated'){
					notification.success({ placement: 'bottomRight', message: 'Updated!', description: 'Id successfully updated.'})
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
				const res = await axios.post('/admin/id-types', values)
				if(res.data.status === 'saved'){
					notification.success({ placement: 'bottomRight', message: 'Saved!', description: 'Id successfully saved.'})
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

    const handleClickTrash = (id:any) => {
        modal.confirm({title: 'Delete?', content: 'Are you sure you want to delete this item?', 
            onOk: ()=>{
            axios.delete('/admin/id-types/' + id).then(res=>{
                notification.success({ placement: 'bottomRight', message: 'Deleted!', description: 'Id deleted successfully.'})
                loadDataAsync()
            })
        }})
    }

	return (
		<AdminAuthLayout user={auth.user}>
			<Head title="Id Type Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[720px] overflow-auto'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF ID TYPE</div>
					{/* card body */}
					<div className='z-0'>
                        <Table dataSource={data}
                            loading={loading}
                            rowKey={(data) => data.id ?? 0}
                            pagination={false}>

							<Column title="Id" dataIndex="id" key="id"/>
							<Column title="Id Type" dataIndex="id_type" key="id_type"/>
							<Column title="Order No." dataIndex="order_no" key="order_no"/>
							<Column title="Active" key="active" render={(data:User)=>(
								data.active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES </span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
							<Column title="Action" key="action" 
								render={(_, data:IdType) => (
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
                                                        label: 'Delete',
                                                        icon: <Trash2 size={16} />,
                                                        onClick: ()=>{
                                                            handleClickTrash(data.id)
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
                title="ID TYPE INFORMATION"
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
                            area: "",
                            description: "",
                            order_no: 0,
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
                    name="id_type"
                    label="Id Type"
                    validateStatus={errors.id_type ? "error" : ""}
                    help={errors.id_type ? errors.id_type[0] : ""}
                >
                    <Input placeholder="Id Type" />
                </Form.Item>

                <Form.Item
                    className='w-full'
                    name="order_no"
                    label="Order No"
                    validateStatus={errors.order_no ? "error" : ""}
                    help={errors.order_no ? errors.order_no[0] : ""}
                >
                    <InputNumber type='number' className='w-full' placeholder="Order No." />
                </Form.Item>

                <Form.Item
                    valuePropName='checked'
                    name="active">
                    <Checkbox>Active</Checkbox>
                </Form.Item>

            </Modal>


		</AdminAuthLayout>
	)
}

export default IdTypeIndex;