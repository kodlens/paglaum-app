import React from 'react'
import ApplicationLogo from './ApplicationLogo'

export default function ReportLogo() {
    return (
        <div className='flex gap-2 items-center'>
            <ApplicationLogo h={60} w={60} className={undefined} />
            <div>
                <div className='font-bold text-2xl'>PAGLAUM</div>
                <div className='font-semibold'>Multi-Purpose Cooperative</div>
            </div>
        </div>
    )
}
