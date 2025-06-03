import React, { useEffect, useState } from 'react'
import { App, Button, DatePicker, Divider, Form, Input, InputNumber, Layout, Modal, Select, Steps, Upload, UploadProps } from 'antd'
import { ArrowLeftOutlined, FileAddOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { PageProps, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { EducationLevel } from '@/types/educationLevel';
import { ArrowDownRight, ArrowRight, Captions, Divide } from 'lucide-react';
import AccountInformation from './RegisterPartials/AccountInformation';
import PersonalInformation from './RegisterPartials/PersonalInformation';

export default function RegisterPage({ educationLevels }: { educationLevels: EducationLevel[] }) {

  interface Province {
    province: string;
    id: number
  }

  const { message, modal, notification } = App.useApp();
  const [loading, setLoading] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [barangays, setBarangays] = useState<any[]>([]);
 
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<any>({});

  const { data, setData } = useState<User>({
    username: '',
    password: '',
    password_confirmation: '',
    lname: '',
    fname: '',
    mname: '',
    suffix: '',
    email: '',
    contact_no: '',

    sex: '',
    education_level: '',
    birthplace: '',
    birthdate: null,
    civil_status: '',

    religion: '',
    ethnic_group: '',
    nationality: '',
    height: 0,
    weight: 0,
    blood_type: '',
    sss: '',
    tin: '',
    gsis: '',
    id_type: '',
    id_no: '',
    philhealth: '',
    umid: '',
    household_size: 0,

    occupation: '',
    monthly_income: 0,
    business_name: '',
    business_address: '',
    contact_person: '',
    contact_person_no: '',

    id_image: null,

    province: null,
    city: null,
    barangay: null,
    street: '',

    role: '',
  });

  

 


  const submit = () => {

    // console.log('data', data);

    //return;
    setLoading(true);

    axios.post('/register', data).then(res => {
      setLoading(false);

      if (res.data.status === 'registered') {

        modal.info({
          title: 'Registration Success!',
          content: 'Your account information has been successfully submitted and will be reviewed by PAGLAUM. You will be notified via email once your account is activated.',
          onOk: () => {
            router.visit('/');
          }
        });
      }
    }).catch((error: any) => {
      setLoading(false);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        notification.error({
          placement: 'bottomRight',
          message: 'Invalid Input',
          description: error.response.data.message,
        })
      }
    })

  }


  const loadProvinces = () => {
    axios.get('/load-provinces').then(res => {
      setProvinces(res.data);
    })
  }

  const handleChangeProvince = (value: any) => {
    setData('province', value)
    setData('city', null)
    setData('barangay', null)
    // form.setFields([
    //     { name: 'city', value: null },
    //     { name: 'barangay', value: null }
    // ]);
    axios.get('/load-cities?provcode=' + value).then(res => {
      setCities(res.data);
    })
  }
  const handleChangeCity = (value: any) => {
    setData('city', value)
    setData('barangay', null)

    // form.setFields([
    //     { name: 'barangay', value: null }
    // ]);

    axios.get(`/load-barangays?citycode=${value}`).then(res => {
      setBarangays(res.data);
    })
  }

  const validateContactNo = (value: string) => {
    const regex = /^9\d{9}$/;
    if (!regex.test(value)) {
      setErrors((prev: any) => ({ ...prev, contact_no: ['Invalid contact number. Must start with 9 and be 10 digits.'] }));
    } else {
      setErrors((prev: any) => ({ ...prev, contact_no: null }));
    }
  };

  useEffect(() => {
    loadProvinces()
  }, [])


  const [current, setCurrent] = useState(0);



  

  const addressInformation = () => {
    return (
      <>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-8 bg-gray-200 border-0" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
            ADDRESS INFORMATION
          </span>
        </div>

        <Form.Item
          label="Province"
          className="w-full"
          validateStatus={errors.province ? "error" : ""}
          help={errors.province ? errors.province[0] : ""}
        >
          <Select
            className="w-full h-10"
            onChange={handleChangeProvince}
            value={data.province}
            options={provinces.map((item: any) => ({
              value: item.provCode,
              label: item.provDesc
            }))}
          />
        </Form.Item>

        <Form.Item
          label="City"
          className="w-full"
          validateStatus={errors.city ? "error" : ""}
          help={errors.city ? errors.city[0] : ""}
        >
          <Select
            className="w-full h-10"
            onChange={handleChangeCity}
            value={data.city}
            options={cities.map((item: any) => ({
              value: item.citymunCode,
              label: item.citymunDesc
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Barangay"
          className="w-full"
          validateStatus={errors.barangay ? "error" : ""}
          help={errors.barangay ? errors.barangay[0] : ""}
        >
          <Select
            className="w-full h-10"
            onChange={(value) => setData('barangay', value)}
            value={data.barangay}
            options={barangays.map((item: any) => ({
              value: item.brgyCode,
              label: item.brgyDesc
            }))}
          />
        </Form.Item>

        <Form.Item label="Street"
          className='w-full'
          validateStatus={errors?.street ? 'error' : ''}
          help={errors?.street ? errors?.street[0] : ''}
        >
          <Input placeholder="ex. Juan Dela Cruz St."
            onChange={(e) => setData('street', e.target.value)}
            value={data.street}
            size="large" />
        </Form.Item>
      </>
    )
  }


  // const accountType = () => {
  //     return (
  //         <>
  //             <div className="inline-flex items-center justify-center w-full">
  //                 <hr className="w-full h-px my-8 bg-gray-200 border-0" />
  //                 <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
  //                     ACCOUNT TYPE
  //                 </span>
  //             </div>

  //             <Form.Item
  //                 label="Account Type"
  //                 className="w-full"
  //                 validateStatus={errors.role ? "error" : ""}
  //                 help={errors.role ? errors.role[0] : ""}
  //             >
  //                 <Select
  //                     className="w-full h-10"
  //                     onChange={(value)=>setData('role', value)} 
  //                     value={data.role}
  //                     options={[
  //                         {
  //                             value: "YBS",
  //                             label: 'YOUTH BEE SAVER'
  //                         },
  //                         {
  //                             value: "MEMBER",
  //                             label: 'STANDARD MEMBER'
  //                         },

  //                     ]}
  //                 />
  //             </Form.Item>

  //         </>
  //     )
  // }


  const steps = [
    {
      title: 'Account',
      content: <AccountInformation handleNext={(values:any) => {
        setCurrent(current + 1)
        setData({...data,
          username: values.username,
          password: values.password,
          password_confirmation: values.password_confirmation
        })
       
      }} />,
    },
    {
      title: 'Personal',
      content: <PersonalInformation educationLevels={educationLevels} handleNext={(values:User)=>{
        setCurrent(current + 1)
        setData({...data,
          lname: values.lname,
          fname: values.fname
        })
      }} />,
    },
    {
      title: 'Address',
      content: addressInformation(),
    },
    // {
    //     title: 'Account Type',
    //     content: accountType(),
    // },
  ];

  useEffect(()=>{
    console.log(data)
  }, [data])
  const next = () => {

  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Head title="Register" />

      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">

        <div className="w-full sm:max-w-2xl mt-6 px-6 py-4 bg-white border border-1 overflow-hidden sm:rounded-lg shadow-sm my-5">

          <div className="font-bold mb-4 text-lg flex gap-x-2">
            <Button icon={<ArrowLeftOutlined />}
              onClick={() => { window.history.back() }}></Button>
            REGISTER
          </div>

          <Divider />

          <Form layout='vertical'>
            <Steps current={current} items={items} />
            <div>{steps[current].content}</div>
            <div style={{ marginTop: 24 }} className='flex gap-2'>
              {current === steps.length - 1 && (

                <Button className='ml-auto font-bold'
                  onClick={submit}
                  icon={<UserOutlined />}
                  type="primary">
                  SUBMIT APPLICATION
                </Button>
              )}
            </div>

          </Form>

        </div>
      </div>
    </>



  )
}
