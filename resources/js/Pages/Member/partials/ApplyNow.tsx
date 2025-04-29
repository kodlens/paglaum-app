import React, { useState } from 'react'
import { FileUser, FolderOpenDot, User } from 'lucide-react';
import { Button, Modal } from 'antd';


export default function ApplyNow() {

    const [open, setOpen] = useState<boolean>(false)
    const handleApplyNowClick = () => {
        setOpen(true)
    }


  return (
    <>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='mx-auto md:mx-0'>
                    <FolderOpenDot  size={54}/>
                </div>
                <div className='flex flex-col'>
                    <div className="text-gray-900 text-2xl">
                        Applying for a Savings Account Has Never Been Easier 
                    </div>
                    <div className='my-4'>
                        <p>Opening a savings account used to mean long queues and paperwork. Not anymore.</p>

                        <p>
                            With our streamlined process, you can apply in just a few minutes — right from your phone or computer. 
                            No more branch visits, no more hassle. Just simple, secure, and smart banking at your fingertips.
                        </p>
                    </div>
                    <div>
                        <Button onClick={handleApplyNowClick} type='primary' icon={<FileUser size={16}/>} >Apply Now</Button>
                    </div>
                </div>
            </div>

        </div>


        <Modal open={open}
            closable={true}
            onCancel={()=> setOpen(false)}
            okText='Proceed'>
            <div className='p-6'>
                <div>
                    Are you sure you want to open an account?
                </div>
            </div>
        </Modal>
    </>
  )
}
