import { Button, Form, Input, InputNumber } from "antd";
import { WalletCards } from "lucide-react";

export default function DepositOnlineIndex() {

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white rounded-md p-6">
                <div className="font-bold">How much would you like to deposit?</div>
                <div>
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                </div>
                <div>
                    <Button type="primary"
                        icon={<WalletCards size={16}/>}>
                        Pay
                    </Button>
                </div>
            </div>
        </div>
    )
}