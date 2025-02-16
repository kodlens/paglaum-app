import AdminAuthLayout from '@/Layouts/AdminAuthLayout'
import { Head } from '@inertiajs/react'
import React from 'react'


export default function Dashboard() {
    return (
        <AdminAuthLayout>
            <Head title="Dashboard"/>
            <div>
                this is child
            </div>
        </AdminAuthLayout>
    )
}
