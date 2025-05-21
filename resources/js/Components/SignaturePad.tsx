import { App, Button } from 'antd';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
    onSave: (dataUrl: string) => void;
}

const SignaturePadComponent: React.FC<SignaturePadProps> = ({ onSave }) => {

    const { notification } = App.useApp();
    
    const canvasRef = useRef<SignatureCanvas | null>(null);

    const handleSave = () => {
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL();
            onSave(dataUrl);
            notification.success({
                message: 'Signature uploaded!',
            })
        }
    };

    const handleClear = (e:any) => {
        if (canvasRef.current) {
            canvasRef.current.clear();
            onSave('')
             notification.warning({
                message: 'Signature cleared!',
            })
        }
    };

    return (
        <div>
            <div className='bg-gray-100 my-2'>
                <SignatureCanvas
                    ref={canvasRef}
                    penColor="black"
                    canvasProps={{ width: 500, height: 200, className: 'signatureCanvas' }}
                />
            </div>
            <div className='flex gap-2'>
                <Button 
                    htmlType='button' 
                    size='small'
                    type='primary'
                    onClick={handleSave}>
                        Upload
                </Button>
                <Button htmlType='button'
                    size='small'
                    danger
                    onClick={handleClear}>
                        Clear
                </Button>
            </div>
        </div>
    );
};

export default SignaturePadComponent;