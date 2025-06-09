import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect } from 'react'

export default function LoanPendingApplication() {

  const props:any = usePage().props;

  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  //console.log(props.auth.user.role)

  const loadData = () => {
    setLoading(true)
    axios.get('/open-dashboard/pending-loan-application').then(res => {
      setLoading(false)
      setData(res.data)
    }).catch(err=>{
      setLoading(false)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleRedirect = () => {
    const role:string = props.auth ? props.auth.user.role : '';
    router.visit('/' + role.toLocaleLowerCase() + '/pending-loans')
  }

  return (

    <div className='bg-white shadow-sm flex-1 p-4 hover:bg-blue-400 ease-in-out duration-150 hover:cursor-pointer'
      onClick={handleRedirect}>
      <div className=''>
        <div className='text-[2rem] font-bold'>
          {loading ? 0 : data}
        </div>
        <div className=''>Pending Application</div>
      </div>
    </div>
  )
}
