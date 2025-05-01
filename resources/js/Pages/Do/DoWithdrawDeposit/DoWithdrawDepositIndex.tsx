import DoAuthLayout from "@/Layouts/DoAuthLayout";
import { PageProps } from "@/types";
import { SavingsAccount } from "@/types/savingsAccount";
import { Head, router, useForm } from "@inertiajs/react";
import { App, Button, Form, InputNumber, message, notification, Select } from "antd";
import { valueType } from "antd/es/statistic/utils";
import axios from "axios";
import { Save } from "lucide-react";
import { useState } from "react";


//inherit other type
// interface SavingsAccountUser extends SavingsAccount{
//     user: User
// }


const DoWithdrawDepositIndex = ({auth, savingsAccount }:PageProps<{savingsAccount:SavingsAccount}>) => {

    const {data, setData} = useForm({
        transaction_type: '',
        amount: 0
    });
    const [errors, setErrors] = useState<any>({})
    const {notification} = App.useApp();
    const [loading, setLoading] = useState<boolean>();

    const handleSubmit = (e:any) => {
        e.preventDefault();

        axios.post('/do/member-withdrawal-deposit/' + savingsAccount.id, data).then(res=>{
            if(res.data.status === 'saved'){
                notification.success({
                    message: 'Deposit Recorded!',
                    description: 'Deposit successfully recorded.',
                    placement: 'bottomRight'
                });

                // router.visit('/do/member-withdrawal-desposit' + savingsAccount.id)
                window.history.back()
            }
        }).catch(err=>{
            if(err.response.status === 422){
                setErrors(err.response.data.errors)

                if(errors.id){
                    notification.error({
                        message: 'Invalid Input!',
                        description: 'Loan Identification is required.',
                        placement: 'bottomRight'
                    })
                }
            }
        })
    }

    return (
        <>
            <DoAuthLayout user={auth.user}>
                <Head title="Withdraw/Deposit"/>

               
            <div className='flex mt-10 justify-center items-center'>
                {/* card */}
                <div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[640px] overflow-auto'>

                    <div className="font-semibold">
                        WITHDRAW OR DEPOSIT FOR {savingsAccount.user.lname}, {savingsAccount.user.fname} ACCOUNT
                    </div> 

                    <div>
                        <span className="mr-2 font-semibold">
                            ACCOUNT NO:
                        </span>
                         {savingsAccount.account_no}
                    </div>

                    <div>
                        <span className="mr-2 font-semibold">
                            AVAILABLE BALANCE:
                        </span>
                        &#8369; {savingsAccount.balance.toLocaleString()}
                    </div>

                    <div className="my-6">

                        <form onSubmit={handleSubmit}>

                            <Form.Item label="Transaction Type"
                                layout="vertical"
                                validateStatus={errors.transaction_type ? 'error' : ''}
                                help={errors.transaction_type ? errors.transaction_type[0] : ''}>
                                <Select
                                    onChange={(value:string) => setData('transaction_type', value)}
                                    options={
                                        [
                                            { value: 'DEPOSIT', label: 'DEPOSIT' },
                                            { value: 'WITHDRAW', label: 'WITHDRAW' }
                                        ]
                                    }>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Input Amount"
                                layout="vertical"
                                className="w-full"
                                validateStatus={errors.amount ? 'error' : ''}
                                help={errors.amount ? errors.amount[0] : ''}
                            >
                                <InputNumber 
                                    className="w-full"
                                    placeholder="1000"
                                    onChange={(value:any) => setData('amount', value)}
                                />
                            </Form.Item>
                          
                            <Button type="primary" 
                                icon={<Save size={16}/>}
                                loading={loading}
                                className="font-bold"
                                htmlType="submit">
                                    SAVE TRANSACTION
                            </Button>

                        </form>
                    </div>

                </div>
            </div>
                
            </DoAuthLayout>
        </>
    )
}

export default  DoWithdrawDepositIndex;