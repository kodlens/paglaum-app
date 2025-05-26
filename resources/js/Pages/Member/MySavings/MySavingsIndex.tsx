import MemberAuthLayout from "@/Layouts/MemberAuthLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SavingsAccount } from "@/types/savingsAccount";
import { Button } from "antd";
import { BookUp, List } from "lucide-react";

const MySavings = ({ auth }: PageProps) => {

    const [data, setData] = useState<SavingsAccount[]>([]);
    const loadSavingsAccount = () => {
        axios.get('/member/get-my-savings').then((res) => {
            setData(res.data);
        })
    }

    useEffect(() => {
        loadSavingsAccount();
    }, [])

    return (
        <MemberAuthLayout user={auth.user} >
            <Head title={"My Savings"} />

            <div className="py-12">

                <div className="mx-2 max-w-7xl md:mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            MY SAVINGS ACCOUNT
                        </div>
                    </div>
                </div>


                <div className="mx-2 max-w-7xl md:mx-auto sm:px-6 lg:px-8 mt-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900 ">

                           
                            <div className="font-bold">
                                ACCOUNTS
                            </div>
                            {data.map((item: SavingsAccount) => (
                                <div key={item.id} className='flex flex-col md:flex-row gap-4'>

                                    <div className='w-[200px] my-4'>
                                        <div className='font-bold text-gray-500'>SAVINGS ACCOUNT</div>
                                        <div className='ml-2'>{item.account_no}</div>
                                    </div>

                                    <div className='w-[200px] my-4'>
                                        <div className='font-bold text-gray-500'>ACCOUNT NAME</div>
                                        <div className='ml-2'>{item.account_name}</div>
                                    </div>

                                    <div className='w-[200px] my-4'>
                                        <div className='font-bold text-gray-500 md:text-right'>AVAILABLE BALANCE</div>
                                        <div className='ml-2 md:text-right font-bold'>&#8369; {item.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    </div>

                                    <div className='sm:w-[200px] md:my-4 md:ml-10 flex flex-col gap-2'>
                                        <Button className='font-semibold text-gray-500 text-right md:ml-auto'
                                            onClick={()=> router.visit(`/member/my-savings-transactions/${item.id}`)}
                                            icon={<List size={16}/>}>
                                            View Transactions
                                        </Button>

                                        <Button type="primary"
                                            onClick={()=> router.visit(`/member/deposit-online/${item.id}`)}
                                            icon={<BookUp size={16}/>}>
                                            Make a deposit (ONLINE)
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </MemberAuthLayout>
    )
}

export default MySavings;
