import DoAuthLayout from "@/Layouts/DoAuthLayout";
import { PageProps } from "@/types";
import { SavingsAccount } from "@/types/savingsAccount";
import { Head, useForm } from "@inertiajs/react";
import { Button, Form, InputNumber, Select } from "antd";


//inherit other type
// interface SavingsAccountUser extends SavingsAccount{
//     user: User
// }


const DoWithdrawDepositIndex = ({auth, savingsAccount }:PageProps<{savingsAccount:SavingsAccount}>) => {

    const {data, setData} = useForm({
        transaction_type: '',
        amount: 0
    });

    const handleSubmit:FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);
        
    }

    return (
        <>
            <DoAuthLayout user={auth.user}>
                <Head title="Withdraw/Deposit"/>

               
            <div className='flex mt-10 justify-center items-center'>
                {/* card */}
                <div className='p-6 w-full md:mx-2 bg-white shadow-sm rounded-md
					md:w-[1120px] overflow-auto'>

                    <div className="font-semibold">
                        WITHDRAW OR DEPOSIT FOR {savingsAccount.user.lname}, {savingsAccount.user.fname} ACCOUNT
                    </div> 

                    <div className="my-6">
                        <form onSubmit={handleSubmit}>
                            <Form.Item label="Transaction Type"
                                layout="vertical"
                            >   
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
                            >
                                <InputNumber 
                                    className="w-full"
                                    placeholder="1000"
                                    onChange={(value) => setData('amount', value)}
                                />
                            </Form.Item>
                          
                          <Button type="primary" htmlType="submit">SAVE TRANSACTION</Button>
                        </form>
                    </div>

                </div>
            </div>
                
            </DoAuthLayout>
        </>
    )
}

export default  DoWithdrawDepositIndex;