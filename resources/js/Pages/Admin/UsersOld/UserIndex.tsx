import AdminAuthLayout from '@/Layouts/AdminAuthLayout'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserTable } from './UserTable'
import SearchUserTable from './SearchUserTable'
import { PageProps } from '@/types'


export default function UserIndex( {auth} : PageProps ) {

    return (
        <AdminAuthLayout user={auth.user}>
            <Head title="User"/>

            <div>
                <SearchUserTable />
                <UserTable />

                
            </div>
        </AdminAuthLayout>
    )
}
