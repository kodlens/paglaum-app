import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import { App, Button, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


interface Fields {
    otp: string;
}
export default function OtpForm( {otpSender}:PageProps<{otpSender:string}>) {

    const [fields, setFields] = useState<Fields>({
        otp: ''
    })
    
    const [loading, setLoading] = useState<boolean>(false)
    const { notification } = App.useApp();

    const handleLogout = () => {
        setLoading(true)
        axios.post('/logout').then(()=>{
            router.visit('/')
        })
    }

    const handleConfirm = () => {
        setLoading(true)
        axios.post('/check-otp', fields).then(res=>{
            if(res.data.status === 'approved'){
                router.visit('/login')
            }
        }).catch(err => {
            setLoading(false)
            if(err.response.status === 422){
                if(err.response.data.errors.otp){
                    notification.error({
                        message: 'Invalid OTP!',
                        description: err.response.data.message
                    })
                }
            }
        })
    }

    const handleRequestOTP = () => {
        setLoading(true)
        axios.post('/request-otp', fields).then(res=>{
            setLoading(false)

             notification.success({
                message: 'Sent!',
                description: 'An OTP was sent successfully to your ' + otpSender + '.'
            })
        }).catch(err => {
            setLoading(false)
        })
    }

    useEffect(()=>{
        handleRequestOTP()
    }, [])

    return (
        <>
            <Head title="OTP" />
            <div className="min-h-screen flex justify-center items-center bg-gray-200">

                <div className="p-6 bg-white rounded-md">
                    <div>
                        <div>
                            An otp was sent to your {otpSender}.
                        </div>
                        <div className="flex flex-col gap-2 my-4 sm:w-[300px] w-full">
                            <label htmlFor="code">One-Time Password</label>
                            <Input.OTP id="code"
                                onChange={(value)=>{
                                    console.log(value);
                                    setFields({...fields, otp:value})
                                }}
                                formatter={(str) => str.toUpperCase()}  
                                length={6} />
                        </div>
                        

                        <div className="flex gap-2">
                            <Button loading={loading} onClick={handleLogout} danger>Logout</Button>
                            <Button className="mb-2 text-blue-600" loading={loading} onClick={handleRequestOTP}>Request</Button>
                            <Button loading={loading} onClick={handleConfirm} type="primary">Confirm</Button>
                        </div>
                    </div>



                </div>

            </div>
        </>
    )
}