import { PageProps } from '@/types'
import { SavingsAccount } from '@/types/savingsAccount'
import { SavingTransaction } from '@/types/savingTransaction'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import {Pagination} from "antd";
import YbsAuthLayout from '@/Layouts/YbsAuthLayout'


const formatDate = (ndate:Date, customFormat:string) => {
    return dayjs(ndate).format(customFormat);
}
export default function MySavingTransactions( { auth, savingsAccount } : PageProps<{savingsAccount:SavingsAccount}>) {

    const [data, setData] = useState<SavingTransaction[]>([]);
    const [errors, setErrors] = useState<any | null>({});
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const loadSavingsTransaction = () => {
        const params = [
            `page=${page}`,
            `perPage=${perPage}`,
        ].join('&')
        axios.get(`/ybs/get-my-savings-transactions/${savingsAccount.id}?${params}`).then(res=>{
            setData(res.data.data)
            setTotal(res.data.total)
        }).catch(err=>{

        })
    }

    const handlePageChange = (value:number) => {
        console.log(value)
        setPage(value)
    }

    useEffect(()=>{
        loadSavingsTransaction()
    }, [page, perPage])

    return (
        <YbsAuthLayout user={auth.user}>
            <Head title="My Savings Transaction"/>

            <div className="py-12">
                <div className="mx-2 max-w-7xl md:mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            SAVINGS TRANSACTION
                        </div>
                    </div>
                </div>

                <div className="mx-2 max-w-7xl md:mx-auto sm:px-6 lg:px-8 mt-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg py-4">

                        <div className='font-bold px-6 py-4 border-b'>
                            <div>HISTORY</div>
                            <div>BALANCE: &#8369; {savingsAccount.balance}</div>
                        </div>

                        { data.map(item =>(
                            <div key={item.id} className='p-4 '>
                                <div className='flex w-full flex-col md:flex-row gap-10 justify-between md:max-w-2xl border-b py-2 px-4 mt-4'>
                                    <div>
                                        <div className='font-semibold text-gray-500'>TRANSACTION TYPE</div>
                                        {item.transaction_type}
                                    </div>

                                    <div>
                                        <div className='font-semibold text-gray-500'>AMOUNT</div>
                                        &#8369; {item.amount}
                                    </div>

                                    <div>
                                        <div className='font-semibold text-gray-500'>BALANCE</div>
                                        &#8369; {item.balance.toLocaleString()}
                                    </div>

                                    <div>
                                        <div className='font-semibold text-gray-500'>TRANS DATE & TIME</div>
                                        { formatDate(item.created_at, 'MMM DD, YYYY hh:m A') }
                                    </div>


                                </div>

                            </div>
                        ))}

                        <Pagination
                            className="ml-4"
                            pageSize={perPage}
                            onChange={handlePageChange}
                            total={total}>
                        </Pagination>
                    </div>
                </div>

            </div>



        </YbsAuthLayout>
    )
}
