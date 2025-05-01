import MemberAuthLayout from '@/Layouts/MemberAuthLayout'
import { PageProps } from '@/types'
import { SavingsAccount } from '@/types/savingsAccount'
import { SavingTransaction } from '@/types/savingTransaction'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import dayjs from 'dayjs'


const formatDate = (ndate:Date, customFormat:string) => {
    return dayjs(ndate).format(customFormat);
}
export default function MySavingsTransactionsIndex( { auth, savingsAccount } : PageProps<{savingsAccount:SavingsAccount}>) {


    // const loadSavingsTransaction = () => {
    //     axios.get('/member/my-savings-transactions/' + savingsAccount.id).then(res=>{

    //     }).catch(err=>{
            
    //     })
    // }


    return (
        <MemberAuthLayout user={auth.user}>
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        { savingsAccount.saving_transactions.map(item =>(
                            <div key={item.id} className='p-4 flex gap-10'>
                                <div>
                                    {item.transaction_type}
                                </div>

                                <div>
                                    &#8369; {item.amount}
                                </div>

                                <div>
                                    { formatDate(item.created_at, 'MMM DD, YYYY hh:m A') }
                                </div>
                               
                            </div>
                        ))}
                    </div>
                </div>

            </div>



        </MemberAuthLayout>
    )
}
