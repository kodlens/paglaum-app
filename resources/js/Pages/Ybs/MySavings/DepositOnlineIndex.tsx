import { PageProps } from "@/types";
import { SavingsAccount } from "@/types/savingsAccount";
import { Head, router } from "@inertiajs/react";
import { Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import { WalletCards } from "lucide-react";
import { useState } from "react";


interface Fields { 
    deposit_amount: number|null;
}
export default function DepositOnlineIndex( { savingsAccount }: PageProps<{ savingsAccount: SavingsAccount }>) {

    const [fields, setFields] = useState<Fields>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnlinePay = () => {
       
        
        const newFields = {
            deposit_amount: fields?.deposit_amount,
            paymentmethod: 'gcash',
            refno: 'REF' + savingsAccount.id,
            savingsAccountId: savingsAccount.id,
            userId: savingsAccount.user.id
        }

        //console.log(newFields);

        setLoading(true)

        axios.post('/ybs/deposit-online/' + savingsAccount.id, newFields).then(res => {
            setLoading(false)
            //console.log('axios responded');
            //console.log('response: ', res.data.datWa.attributes.checkout_url);
            window.location = res.data.data.attributes.checkout_url
    
        }).catch(err => {
            setLoading(false)
        })
    }

    return (
        <>
            <Head title="Savings Online Payment" />
            <div className="min-h-screen flex justify-center items-center bg-gray-100">

                <div className="bg-white rounded-md p-6 mx-2 shadow-md">
                    <div className="font-bold mb-4">How much would you like to deposit?</div>
                    <div>
                        <Form.Item>
                            <InputNumber type="number"
                                onChange={ (value) => {
                                    setFields({...fields, deposit_amount: value as number | null})
                                }} className="w-full" />
                        </Form.Item>
                    </div>
                    <div>
                        <Button type="primary"
                            onClick={handleOnlinePay}
                            loading={loading}
                            icon={<WalletCards size={16}/>}>
                            Pay
                        </Button>
                    </div>
                </div>
            </div>
        </>
        
    )
}