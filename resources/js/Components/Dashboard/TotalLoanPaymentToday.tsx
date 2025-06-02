import axios from 'axios'
import React, { useEffect } from 'react'

export default function TotalLoanPaymentToday() {

	const [data, setData] = React.useState<number>(0)
	const [loading, setLoading] = React.useState<boolean>(false)

	const loadData = () => {
		setLoading(true)
		axios.get('/open-dashboard/load-loan-payment-today').then(res => {
			setLoading(false)
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
					&#8369; {loading ? 0 : data.toLocaleString()}
				</div>
				<div className=''>Total Loan Payment Today</div>
			</div>
		</div>
	)
}
