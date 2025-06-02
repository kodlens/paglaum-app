import axios from 'axios'
import React, { useEffect } from 'react'

export default function LoanPendingApplication() {

  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const loadData = () => {
    setLoading(true)
    axios.get('/open-dashboard/pending-loan-application').then(res => {
      setLoading(true)
      setData(res.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (

    <div className='bg-white shadow-sm flex-1 p-4'>
      <div className=''>
        <div className='text-[2rem] font-bold'>
          {loading ? 0 : data}
        </div>
        <div className=''>Pending Application</div>
      </div>
    </div>
  )
}
