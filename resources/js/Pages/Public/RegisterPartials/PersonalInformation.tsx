import { PageProps, User } from "@/types";
import { EducationLevel } from "@/types/educationLevel";
import { usePage } from "@inertiajs/react";
import { App, Button, DatePicker, Form, Input, InputNumber, Select, Upload, UploadProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined, FileAddOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { ArrowRight } from "lucide-react";


const PersonalInformation =  ( {educationLevels, handleNext }: { educationLevels:EducationLevel[] , handleNext:any }) => {

  const { notification, message } = App.useApp();

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [idTypes, setIdTypes] = useState<any>([])

  const [data, setData] = useState<User>({
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
    role: 'MEMBER'
  });


  const loadIdTypes = () => {
    axios.get('/load-id-types').then(res => {
      setIdTypes(res.data);
    })
  }
  
  useEffect(() => {
    loadIdTypes()
  }, [])


   const { props } = usePage<PageProps>();
  const csrfToken = props.csrf_token ?? ""; // Ensure csrfToken is a string

  const uploadProps: UploadProps = {
    name: "id_image",
    action: "/temp-upload",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";

      if (!isPNG && !isJPG) {
        message.error(`${file.name} is not a png/jpg file`);
      }
      return isPNG || isJPG || Upload.LIST_IGNORE;
    },

    onChange(info) {
      // if (id > 0) {
      //     //console.log(info);
      //     //form.setFieldValue('featured_image', info.file.name)
      // } else {

      // }

      //console.log(info.file);

      if (info.file.status === "done") {
        console.log(info.file.response);
        info.file.url = '/storage/temp/' + info.file.response
        setData({...data, id_image: info.file.response})
        message.success(
          `${info.file.name} file uploaded successfully`
        );
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(info) {
      axios
        .post("/temp-remove/" + info.response)
        .then((res) => {
          if (res.data.status === "temp_deleted") {
            message.success("File removed.");
          }
        });
    },
  };

  return (
    <>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-full h-px my-8 bg-gray-200 border-0" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">PERSONAL INFORMATION</span>
      </div>

      <Form.Item
        label="Account Type"
        className="w-full"
        validateStatus={errors.role ? "error" : ""}
        help={errors.role ? errors.role[0] : ""}
      >
        <Select
          className="w-full h-10"
          onChange={(value: string) => setData({ ...data, role: value })}
          value={data.role}
          options={[
            {
              value: "YBS",
              label: 'YOUTH BEE SAVER'
            },
            {
              value: "MEMBER",
              label: 'STANDARD MEMBER'
            },
          ]}
        />
      </Form.Item>

      <div className='flex flex-col gap-x-4 sm:flex-row'>
        <Form.Item label="Last Name"
          className="w-full"
          validateStatus={errors?.lname ? 'error' : ''}
          help={errors?.lname ? errors?.lname[0] : ''}
        >
          <Input placeholder="ex. Dela Cruz"
            value={data.lname}
            onChange={(e) => setData({ ...data, lname: e.target.value })}
            size="large" autoComplete='off' />
        </Form.Item>

        <Form.Item label="First Name"
          name="fname"
          className="w-full"
          validateStatus={errors?.fname ? 'error' : ''}
          help={errors?.fname ? errors?.fname[0] : ''}
        >
          <Input placeholder="ex. Juan" size="large"
            onChange={(e) => setData({ ...data, fname: e.target.value })}
            value={data.fname}
            autoComplete='off' />
        </Form.Item>
      </div>

      <div className='flex flex-col gap-x-4 sm:flex-row'>

        <Form.Item label="Middle Name"
          className="w-full"
          validateStatus={errors?.mname ? 'error' : ''}
          help={errors?.mname ? errors?.mname[0] : ''}
        >
          <Input placeholder="ex. Dela Cruz"
            onChange={(e) => setData({ ...data, mname: e.target.value })}
            value={data.mname}
            size="large" />
        </Form.Item>

        <Form.Item label="Suffix"
          className="w-full"
          name="suffix"
          validateStatus={errors?.suffix ? 'error' : ''}
          help={errors?.suffix ? errors?.suffix[0] : ''}
        >
          <Input placeholder="ex. Jr, II, III"
            onChange={(e) => setData({ ...data, suffix: e.target.value })}
            value={data.suffix}
            size="large" />
        </Form.Item>
      </div>

      <div className='flex flex-col gap-x-4 sm:flex-row'>
        <Form.Item label="Email"
          className='w-full'
          validateStatus={errors?.email ? 'error' : ''}
          help={errors?.email ? errors?.email[0] : ''}
        >
          <Input placeholder="ex. juan@mail.com"
            onChange={(e) => setData({ ...data, email: e.target.value })}

            value={data.email}
            size="large" />
        </Form.Item>

        <Form.Item label="Contact No."
          className='w-full'

          validateStatus={errors?.contact_no ? 'error' : ''}
          help={errors?.contact_no ? errors?.contact_no[0] : ''}
        >
          <Input prefix="+63" placeholder="9361122334"
            onChange={(e) => {
              setData({...data, contact_no: e.target.value});
            }}
            value={data.contact_no}
            size="large" />
        </Form.Item>
      </div>

      <div className='flex flex-col gap-x-4 sm:flex-row'>
        <Form.Item
          label="Sex"
          className="w-full"
          validateStatus={errors.sex ? "error" : ""}
          help={errors.sex ? errors.sex[0] : ""}
        >
          <Select
            onChange={(value) => setData({...data, sex: value })}
            value={data.sex}
            className='h-10'
            options={[
              { value: "MALE", label: "MALE" },
              { value: "FEMALE", label: "FEMALE" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Education Level"
          className="w-full"
          validateStatus={errors.education_level ? "error" : ""}
          help={errors.education_level ? errors.education_level[0] : ""}
        >
          <Select
            className="w-full h-10"
            onChange={(value) => setData({...data, education_level: value })}
            value={data.education_level}
            options={educationLevels.map((level: EducationLevel) => ({
              value: level.education_level,
              label: level.education_level
            }))}
          />
        </Form.Item>
      </div>

      <div className='flex flex-col gap-x-4 sm:flex-row'>
        <Form.Item
          label="Birthdate"
          className="w-full"
          validateStatus={errors.birthdate ? "error" : ""}
          help={errors.birthdate ? errors.birthdate[0] : ""}
        >
          <DatePicker className='h-10 w-full'
            onChange={(value) => setData({...data, birthdate: value })}
            value={data.birthdate} placeholder="Select date..." />
        </Form.Item>

        <Form.Item
          label="Birthplace"
          className="w-full"
          validateStatus={errors.birthplace ? "error" : ""}
          help={errors.birthplace ? errors.birthplace[0] : ""}
        >
          <Input size='large'
            value={data.birthplace}
            onChange={(e) => setData({...data, birthplace: e.target.value})}
            placeholder='Birthplace...' />
        </Form.Item>
      </div>

      <div className='flex flex-col gap-x-4 sm:flex-row'>
        <Form.Item
          label="Civil Status"
          className="w-full"
          validateStatus={errors.civil_status ? "error" : ""}
          help={errors.civil_status ? errors.civil_status[0] : ""}
        >
          <Select className='h-10 w-full'
            placeholder="CIVIL STATUS..."
            value={data.civil_status}
            onChange={(value) => setData({...data, civil_status: value})}
            options={[
              { value: 'SINGLE', label: 'SINGLE' },
              { value: 'MARRIED', label: 'MARRIED' },
              { value: 'DIVORCED', label: 'DIVORCED' },
              { value: 'WIDOWED', label: 'WIDOWED' },
            ]} />
        </Form.Item>

        <Form.Item
          label="Household Size"
          className="w-full"
          validateStatus={errors.household_size ? "error" : ""}
          help={errors.household_size ? errors.household_size[0] : ""}
        >
          <InputNumber size='large' className='w-full'
            value={data.household_size}
            onChange={(value) => setData({...data, household_size:value ? value : 0})}
            placeholder='Household Size...' />
        </Form.Item>
      </div>

      {
        data.role === 'MEMBER' ? (
          <div className='flex flex-col gap-x-4 sm:flex-row'>
            <Form.Item label="GSIS"
              className='w-full'
              validateStatus={errors?.gsis ? 'error' : ''}
              help={errors?.gsis ? errors?.gsis[0] : ''}
            >
              <Input placeholder="GSIS"
                onChange={(e) => setData({...data, gsis:e.target.value})}
                value={data.gsis}
                size="large" />
            </Form.Item>

            <Form.Item label="SSS"
              className='w-full'
              validateStatus={errors?.sss ? 'error' : ''}
              help={errors?.sss ? errors?.sss[0] : ''}
            >
              <Input placeholder="SSS"
                onChange={(e) => setData({...data, sss: e.target.value})}
                value={data.sss}
                size="large" />
            </Form.Item>
          </div>
        ) : null
      }


      <div className='flex flex-col gap-x-4 sm:flex-row'>
        <Form.Item label="TIN"
          className='w-full'
          validateStatus={errors?.tin ? 'error' : ''}
          help={errors?.tin ? errors?.tin[0] : ''}
        >
          <Input placeholder="TIN"
            onChange={(e) => setData({...data, tin: e.target.value})}
            value={data.tin}
            size="large" />
        </Form.Item>
      </div>


      <div className='flex flex-col gap-x-4 sm:flex-row'>
        <Form.Item label="ID Type"
          className="w-full"
          validateStatus={errors.id_type ? "error" : ""}
          help={errors.id_type ? errors.id_type[0] : ""}>

          <Select
            value={data.id_type}
            onChange={(value) => setData({...data, id_type: value})}
            className='h-10'
            options={idTypes.map((type: any) => ({
              value: type.id_type,
              label: type.id_type
            }))}
          />
        </Form.Item>

        <Form.Item label="ID No."
          className='w-full'
          validateStatus={errors?.id_no ? 'error' : ''}
          help={errors?.id_no ? errors?.id_no[0] : ''}
        >
          <Input placeholder="ex. 1234567"
            onChange={(e) => setData({...data, id_no: e.target.value})}
            value={data.id_no}
            size="large" />
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="id_image"
          valuePropName="fileList"
          className="w-full mt-4"
          label="Select Valid Id"
          getValueFromEvent={(e) => {
            // Normalize the value to fit what the Upload component expects
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
          validateStatus={errors.id_image ? "error" : ""}
          help={errors.id_image ? errors.id_image[0] : ""}
        >
          <Upload
            maxCount={1}
            // fileList={fileList}
            listType="picture"
            {...uploadProps}
          >
            <Button icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      </div>

      {
        data.role === 'MEMBER' ? (
          <>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-px my-8 bg-gray-200 border-0" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                WORK INFORMATION
              </span>
            </div>

            <div className='flex flex-col gap-x-4 sm:flex-row'>
              <Form.Item label="Occupation"
                className='w-full'
                validateStatus={errors?.occupation ? 'error' : ''}
                help={errors?.occupation ? errors?.occupation[0] : ''}
              >
                <Input placeholder="ex. Office Staff"
                  onChange={(e) => setData({...data, occupation: e.target.value})}
                  value={data.occupation}
                  size="large" />
              </Form.Item>

              <Form.Item label="Monthly Income"
                className='w-full'
                validateStatus={errors?.monthly_income ? 'error' : ''}
                help={errors?.monthly_income ? errors?.monthly_income[0] : ''}
              >
                <InputNumber
                  type='number'
                  className='w-full'
                  placeholder="ex. 10000"
                  onChange={(value) => setData({...data, monthly_income: value ? value : 0})}
                  value={data.monthly_income}
                  size="large" />
              </Form.Item>
            </div>

            <div className='flex flex-col gap-x-4 sm:flex-row'>
              <Form.Item label="Office/Business Name"
                className='w-full'
                validateStatus={errors?.business_name ? 'error' : ''}
                help={errors?.business_name ? errors?.business_name[0] : ''}
              >
                <Input placeholder="ex. Business Name..."
                  onChange={(e) => setData({...data, business_name: e.target.value})}
                  value={data.business_name}
                  size="large" />
              </Form.Item>

              <Form.Item label="Office/Business Address"
                className='w-full'
                validateStatus={errors?.business_address ? 'error' : ''}
                help={errors?.business_address ? errors?.business_address[0] : ''}
              >
                <Input placeholder="ex. Business Address..."
                  onChange={(e) => setData({...data, business_address: e.target.value})}
                  value={data.business_address}
                  size="large" />
              </Form.Item>


            </div>

            <div className='flex flex-col gap-x-4 sm:flex-row'>
              <Form.Item label="Contact Person"
                className='w-full'
                validateStatus={errors?.contact_person ? 'error' : ''}
                help={errors?.contact_person ? errors?.contact_person[0] : ''}
              >
                <Input placeholder="ex. Juan Cruz"
                  onChange={(e) => setData({...data, contact_person: e.target.value})}
                  value={data.contact_person}
                  size="large" />
              </Form.Item>

              <Form.Item label="Contact Person No."
                className='w-full'
                validateStatus={errors?.contact_person_no ? 'error' : ''}
                help={errors?.contact_person_no ? errors?.contact_person_no[0] : ''}
              >
                <Input placeholder="ex. 09361234123"
                  onChange={(e) => setData({...data, contact_person_no: e.target.value})}
                  value={data.contact_person_no}
                  size="large" />
              </Form.Item>
            </div>
          </>
        ) : null
      }

      <Button iconPosition='end'
        loading={loading}
        icon={
          <div>
            <ArrowRight size={18} />
          </div>
        }
        type="primary" onClick={() => {

          axios.post('/check-account-information', data).then(res => {
            if (res.data.status === 'valid') {
              handleNext(1, data)
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
        }}>
        Next
      </Button>
      
    </>
  );
}

export default PersonalInformation