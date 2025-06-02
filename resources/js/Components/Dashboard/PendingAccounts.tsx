import axios from 'axios'
import React, { useEffect } from 'react'

export default function PendingAccounts() {

    const [data, setData] = React.useState<any>(null)
    const [loading, setLoading] = React.useState<boolean>(false)

    const loadData = () => {
        setLoading(true)
        axios.get('/open-dashboard/load-pending-accounts').then(res=>{
            setLoading(false)
            setData(res.data)
        })
    }
    
    useEffect(()=>{
        loadData()
    },[])

  return (

    <div className='bg-white shadow-sm flex-1 p-4'>
        <div className=''>
            <div className='text-[2rem] font-bold'>
                { loading ? 0 : data}
            </div>
            <div className=''>Pending Accounts</div>
        </div>
    </div>
  )
}
