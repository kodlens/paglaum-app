import { SavingsAccount } from "@/types/savingsAccount";
import { router } from "@inertiajs/react";
import { Button } from "antd";
import axios from "axios";
import { BookUp, List } from "lucide-react";
import { useEffect, useState } from "react";

const SavingsTable = () => {


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
        <>
            <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between ">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">My Savings</h3>
                            <p className="text-slate-500">Your savings account details.</p>
                        </div>
                        {/* <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                            <button
                                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                View All
                            </button>
                            <button
                                className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                    stroke-width="2" className="w-4 h-4">
                                    <path
                                        d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                                    </path>
                                </svg>
                                Add member
                            </button>
                        </div> */}
                    </div>

                </div>
                <div className="p-6 overflow-auto">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                    <p
                                        className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                        Member
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                            stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                        </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                    <p
                                        className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                        Account Name
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                            stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                        </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                    <p
                                        className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                        Status
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                            stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                        </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                    <p
                                        className="flex items-center gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                        Available Balance
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                            stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                        </svg>
                                    </p>
                                </th>
                                <th
                                    className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                    <p
                                        className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                             {data.map((item: SavingsAccount) => (
                                <tr>
                                    <td className="p-4 border-b border-slate-200">
                                        <div className="flex items-center gap-3">
                                            {/* <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                                alt="John Michael" className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" /> */}
                                            <div className="flex flex-col">
                                                <p className="text-sm font-semibold text-slate-700">
                                                    SAVINGS ACCOUNT
                                                </p>
                                                <p
                                                    className="text-sm text-slate-500">
                                                        {item.account_no}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4 border-b border-slate-200">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold text-slate-700">
                                                ACCOUNT NAME
                                            </p>
                                            <p
                                                className="text-sm text-slate-500">
                                                    {item.account_name}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="p-4 border-b border-slate-200">
                                        <div className="w-max">
                                            <div
                                                className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                                <span className="">ACTIVE</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm text-slate-500">
                                            &#8369; {item.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <div className="flex gap-2">
                                            <Button className='font-semibold text-gray-500 text-right md:ml-auto'
                                                onClick={()=> router.visit(`/member/my-savings-transactions/${item.id}`)}
                                                icon={<List size={16}/>}>
                                            </Button>

                                            <Button type="primary"
                                                onClick={()=> router.visit(`/member/deposit-online/${item.id}`)}
                                                icon={<BookUp size={16}/>}>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                             ))}

                        </tbody>
                    </table>
                </div>
                
            </div>
        </>
    )
}

export default SavingsTable