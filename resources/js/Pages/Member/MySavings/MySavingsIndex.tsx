import MemberAuthLayout from "@/Layouts/MemberAuthLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SavingsAccount } from "@/types/savingsAccount";
import { Button } from "antd";
import { BookUp, List } from "lucide-react";
import SavingsTable from "./partials/SavingsTable";

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

                        <SavingsTable />
                        

                    </div>
                </div>
            </div>


            
        </MemberAuthLayout>
    )
}

export default MySavings;
