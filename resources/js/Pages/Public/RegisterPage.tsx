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
import AddressInformation from './RegisterPartials/AddressInformation';

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

  const [data, setData ] = useState<User>({
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


  const [current, setCurrent] = useState(0);



  

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
          fname: values.fname,
          mname: values.mname,
          sex: values.sex,

        })
      }} />,
    },
    {
      title: 'Address',
      content: <AddressInformation handleNext={(values:User)=>{
        setCurrent(current + 1)
        setData({...data,
          province: values.province,
          city: values.city,
          barangay: values.barangay
        })
      }} />,
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
