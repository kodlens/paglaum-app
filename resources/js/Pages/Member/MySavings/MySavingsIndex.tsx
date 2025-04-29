import MemberAuthLayout from "@/Layouts/MemberAuthLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {SavingsAccount} from "@/types/savingsAccount";

const MySavings = ( {auth}:PageProps) => {

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
      <Head title={"My Loan"} />

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
              { data.map((item:SavingsAccount) => (
                <div key={item.id} className='flex gap-4'>

                  <div className='w-[200px] my-4'>
                    <div className='font-semibold text-gray-500'>SAVINGS ACCOUNT</div>
                    <div className='ml-2'>{item.account_no}</div>
                  </div>

                  <div className='w-[200px]'>
                    <div className='font-semibold text-gray-500'>ACCOUNT NAME</div>
                    <div className='ml-2'>{item.account_name}</div>
                  </div>

                  <div className='w-[200px]'>{item.balance}</div>

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
