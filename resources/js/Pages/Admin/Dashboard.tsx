import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout'
import { Head } from '@inertiajs/react'
import React from 'react'


export default function Dashboard() {
    return (
        <AdminDashboardLayout>
            <Head title="Dashboard"/>
            <div>
                this is child
            </div>
        </AdminDashboardLayout>
    )
}
