import { Head } from "@inertiajs/react";
import { Button, Form, Input, InputNumber } from "antd";
import { WalletCards } from "lucide-react";

export default function DepositOnlineIndex() {

    const handleOnlinePay = () => {

    }

    
    return (
        <>
            <Head title="Savings Online Payment" />
            <div className="min-h-screen flex justify-center items-center bg-gray-100">

                <div className="bg-white rounded-md p-6 mx-2 shadow-md">
                    <div className="font-bold mb-4">How much would you like to deposit?</div>
                    <div>
                        <Form.Item>
                            <InputNumber type="number" className="w-full" />
                        </Form.Item>
                    </div>
                    <div>
                        <Button type="primary"
                            onClick={handleOnlinePay}
                            icon={<WalletCards size={16}/>}>
                            Pay
                        </Button>
                    </div>
                </div>
            </div>
        </>
        
    )
}