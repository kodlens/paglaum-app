import MemberAuthLayout from '@/Layouts/MemberAuthLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { User } from 'lucide-react';

export default function Dashboard({ auth }: PageProps) {
    return (
        <MemberAuthLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Member Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-2 max-w-7xl md:mx-auto sm:px-6 lg:px-8 mb-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='mx-auto md:mx-0'>
                                <User size={54}/>
                            </div>
                            <div className='flex flex-col'>
                                <div className="text-gray-900 text-2xl">
                                    WELCOME 
                                    <span className='font-bold ml-2'>{auth.user.lname}, {auth.user.fname}</span>
                                </div>
                                <div>Your last login was on {auth.user.last_login ? auth.user.last_login.toString() : ''}</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mx-2 max-w-7xl md:mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            WELCOME 
                            <span className='font-bold ml-2'>{auth.user.lname}, {auth.user.fname}</span>
                        </div>
                    </div>
                </div>

            </div>
        </MemberAuthLayout>
    );
}
