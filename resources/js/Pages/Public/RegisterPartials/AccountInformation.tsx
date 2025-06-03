import { App, Button, Form, Input } from "antd";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface AccountInformationFields {
  username?: string;
  password?: string;
  password_confirmation?: string;
}

const AccountInformation = ({ handleNext }: { handleNext: any }) => {

  const { notification } = App.useApp();

  const [errors, setErrors] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<AccountInformationFields>({
    username: '',
    password: '',
    password_confirmation: ''
  });

  return (
    <>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-full h-px my-8 bg-gray-200 border-0" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
          ACCOUNT INFORMATION
        </span>
      </div>
      <Form.Item label="Username"
        validateStatus={errors?.username ? 'error' : ''}
        help={errors?.username ? errors?.username[0] : ''}
      >
        <Input placeholder="ex. juan1234"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          size="large" />
      </Form.Item>


      <Form.Item label="Password"
        validateStatus={errors?.password ? 'error' : ''}
        help={errors?.password ? errors?.password[0] : ''}
      >
        <Input.Password placeholder="*****"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          size="large" />
      </Form.Item>

      <Form.Item label="Confirm Password"
        validateStatus={errors?.password_confirmation ? 'error' : ''}
        help={errors?.password_confirmation ? errors?.password_confirmation[0] : ''}
      >
        <Input.Password placeholder="*****"
          value={data.password_confirmation}
          onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
          size="large" />
      </Form.Item>

      <Button iconPosition='end'
        loading={loading}
        icon={
          <div>
            <ArrowRight size={18} />
          </div>
        }
        type="primary" onClick={() => {

          axios.post('/check-username', {
            username: data.username,
            password: data.password,
            password_confirmation: data.password_confirmation
          }).then(res => {
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
  )
};

export default AccountInformation