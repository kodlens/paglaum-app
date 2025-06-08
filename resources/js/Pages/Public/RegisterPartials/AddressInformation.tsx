import { User } from "@/types";
import { App, Button, Form, Input, Select } from "antd";
import axios from "axios";
import { UserOutlined } from '@ant-design/icons'



import { useEffect, useState } from "react";

const addressInformation = ( { handleNext } : { handleNext:any }) => {
  
  const { message, modal, notification } = App.useApp();
  const [loading, setLoading] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [barangays, setBarangays] = useState<any[]>([]);

  const [data, setData] = useState<User>({
    province: '',
    city: '',
    barangay: '',
    street: '',
    zip_code: ''
  })
  const [errors, setErrors] = useState<any>({})

  const loadProvinces = () => {
    axios.get('/load-provinces').then(res => {
      setProvinces(res.data);
    })
  }

  const handleChangeProvince = (value: any) => {
    setData({...data, province: value })
  }

  useEffect(()=>{
    setData({...data, city:null})
    axios.get('/load-cities?provcode=' + data.province).then(res => {
      setCities(res.data);
    })
  }, [data.province])

  useEffect(()=>{
    setData({...data, barangay: null})
    axios.get(`/load-barangays?citycode=${data.city}`).then(res => {
      setBarangays(res.data);
    })
  }, [data.city])

  useEffect(()=>{
    console.log(data);
    
  }, [data.barangay])

  const handleChangeCity = (value: any) => {
    setData({...data, city:value})
  }


  useEffect(() => {
    loadProvinces()
  }, [])


  const handleSubmit = () => {

  }

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
          value={data?.province}
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
          value={data?.city}
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
          onChange={(value) => setData({...data, barangay: value})}
          value={data?.barangay}
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
          onChange={(e) => setData({...data, street: e.target.value })}
          value={data?.street ? data?.street : ''}
          size="large" />
      </Form.Item>


      <Button className='ml-auto font-bold'
        onClick={()=>{
          axios.post('/check-address-information', data).then(res => {
            if (res.data.status === 'valid') {
              handleNext(data)
            }
          }).catch(err => {
            setErrors(err.response.data.errors)
            if (err.response.status === 422) {
              if (err.response.data.errors.username) {
                notification.error({
                  description: err.response.data.message,
                  message: 'Invalid!'
                })
              }
            }
            if (err.response.status === 500) {
              notification.error({
                description: 'Unknown error. Please contact system administrator.',
                message: 'Error!'
              })
            }
          })
        }}

        icon={<UserOutlined />}
        type="primary">
        SUBMIT APPLICATION
      </Button>
    </>
  )
}

export default addressInformation