import AdminAuthLayout from '@/Layouts/AdminAuthLayout'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserTable } from './UserTable'


export default function UserIndex() {

    return (
        <AdminAuthLayout>
            <Head title="User"/>

            <div>
                
                <UserTable />

                
            </div>
        </AdminAuthLayout>
    )
}
