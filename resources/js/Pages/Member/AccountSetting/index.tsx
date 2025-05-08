import MemberAuthLayout from "@/Layouts/MemberAuthLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { App, Button, Input, Select, Switch } from "antd";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";


interface Fields {
    is_2fa:boolean;
    send_to:string;
    code_2fa:string;
}

export default function AccountSetting ( {auth}: PageProps) {

    const [fields, setFields] = useState<Fields>({
        is_2fa:false,
        send_to: 'mobile',
        code_2fa: ''
    })

    const { notification } = App.useApp();
    
    const [loading, setLoading] = useState<boolean>(false)
    const [requestCodeLoading, setRequestCodeLoading] = useState<boolean>(false)

    const onChange = (checked: boolean) => {
        setFields({...fields, is_2fa:checked})
    }


    useEffect( () => {
        let twoFA = auth.user.is_2fa ? auth.user.is_2fa : false
        setFields({...fields, is_2fa:twoFA})
    }, [])


    const handleClick = () => {
        axios.post('/member/save-two-fa-setting', fields).then(res=>{
            if(res.data.status === 'success'){
                notification.success({
                    message: 'Settings',
                    description: 'This is description'
                })
            }
        })
    }

    const handleRequestCode = () => {
        setRequestCodeLoading(true)
        axios.post('/member/request-code', fields).then(res=>{
            setRequestCodeLoading(false)
            console.log(res.data);
            
            if(res.data.status === 'success'){
                setFields({...fields, code_2fa: res.data.otp })
            }
        }).catch(err => {
            setRequestCodeLoading(false)
            if(err.response.status === 500){
                notification.error({
                    message: 'OTP REQUEST ERROR!',
                    description: 'OTP error occured.'
                })
            }
            
        })
    }

    return (
        <MemberAuthLayout user={auth.user}>
             <Head title={"My Loan"} />

            <div className="py-12">

                <div className="mx-2 max-w-7xl md:mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            ACCOUNT SETTING
                        </div>
                    </div>
                </div>

                <div className="mx-2 max-w-7xl md:mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        
                        <div className="p-6 text-gray-900">
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="enable_2fa">ENBALE 2FA</label>
                                <Switch id="enable_2fa" 
                                    value={fields.is_2fa}
                                    defaultChecked onChange={onChange} 
                                    className="w-[20px] bg-red-500 hover:bg-red-500" />
                            </div>

                            <div className="flex flex-col gap-2 my-4">
                                <label htmlFor="">SENT TO</label>
                                <Select 
                                    value={fields.send_to}
                                    onChange={(value)=>{
                                        setFields({...fields, send_to:value})
                                    }}
                                    options={[
                                        {
                                            label: 'EMAIL',
                                            value: 'email'
                                        },
                                        {
                                            label: 'MOBILE NO.',
                                            value: 'mobile'
                                        }
                                    ]}/>
                            </div>
                            <Button type="primary" 
                                loading={requestCodeLoading}
                                icon={<RefreshCw size={16}/>}
                                onClick={handleRequestCode}>Resend</Button>

                            <div className="flex flex-col gap-2 my-4 sm:w-[300px] w-full">
                                <label htmlFor="code">One-Time Password</label>
                                <Input.OTP id="code"
                                    onChange={(value)=>{
                                        console.log(value);
                                    }}
                                    formatter={(str) => str.toUpperCase()}  
                                    length={6} />
                            </div>

                            <Button type="primary" 
                                loading={loading}
                                onClick={handleClick}>SAVE SETTING</Button>
                           
                        </div>
                    </div>
                </div>

            </div>

        </MemberAuthLayout>
    )
}