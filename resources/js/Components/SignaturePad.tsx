import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
    onSave: (dataUrl: string) => void;
}

const SignaturePadComponent: React.FC<SignaturePadProps> = ({ onSave }) => {

    const canvasRef = useRef<SignatureCanvas | null>(null);

    const handleSave = () => {
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL();
            onSave(dataUrl);
        }
    };

    const handleClear = () => {
        if (canvasRef.current) {
            canvasRef.current.clear();
            onSave('')
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
                <button type='button' 
                    className='bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:bg-blue-700' 
                    onClick={handleSave}>
                        Upload
                </button>
                <button type='button'
                    className='bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600' 
                    onClick={handleClear}>
                        Clear
                </button>
            </div>
        </div>
    );
};

export default SignaturePadComponent;