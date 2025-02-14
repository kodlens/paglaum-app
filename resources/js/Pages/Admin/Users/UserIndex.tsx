import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserTable } from './UserTable'


export default function UserIndex() {

    return (
        <AdminDashboardLayout>
            <Head title="User"/>

            <div>
                
                <UserTable />

                

            </div>
        </AdminDashboardLayout>
    )
}
