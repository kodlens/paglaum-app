import AdminAuthLayout from '@/Layouts/AdminAuthLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'


export default function Dashboard( { auth } : PageProps) {
    return (
        <AdminAuthLayout user={ auth.user }>

            <Head title="Dashboard"/>

            
            <div className='bg-white shadow-sm p-5'>
                <div className='font-bold'>DASHBOARD</div>
            </div>

        </AdminAuthLayout>
    )
}
