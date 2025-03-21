import AdminAuthLayout from '@/Layouts/AdminAuthLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import { User } from 'lucide-react'
import React from 'react'

import dayjs from 'dayjs';
import axios from 'axios'
const dateFormat = (item:Date, customFormat:string):string=> {
	return dayjs(item).format(customFormat)
}


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  

export default function Dashboard( { auth } : PageProps) {

    const [data, setData] = React.useState<any>(null)

    const loadDashboardReport = () => {
        axios.get('/admin/load-dashboard-report').then(res=>{
            
        })
    }


    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const dataSets = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => [10, 20, 30, 40, 50, 60, 70][Math.floor(Math.random() * 7)]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => [20, 30, 40, 50, 60, 70, 80][Math.floor(Math.random() * 7)]),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Income Report',
          },
        },
      };

    return (
        <AdminAuthLayout user={ auth.user }>

            <Head title="Dashboard"/>

            
            <div className='bg-white shadow-sm p-5'>
                <div className='font-bold'>DASHBOARD</div>
            </div>

            <div className='bg-white shadow-sm p-5 mt-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <User size={30}/>
                    <div className='flex flex-col'>
                        <div className='text-2xl'>
                            WELCOME <span className='font-bold'>{auth.user.lname}, {auth.user.fname}</span>
                        </div>
                        <div className=''>
                            Your last login was on {dateFormat(auth.user.updated_at ?? new Date(), 'MMMM DD, YYYY HH:mm A')}
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-4 flex gap-4 flex-wrap'>
                <div className='bg-white shadow-sm flex-1 p-4'>
                    <div className=''>
                        <div className='text-[2rem] font-bold'>125</div>
                        <div className=''>Pending Application</div>
                    </div>
                </div>
                <div className='bg-white shadow-sm flex-1 p-4'>
                    <div className=''>
                        <div className='text-[2rem] font-bold'>54</div>
                        <div className=''>Pending Payment</div>
                    </div>  
                </div>
                <div className='bg-white shadow-sm flex-1 p-4'>
                    <div className=''>
                        <div className='text-[2rem] font-bold'>10</div>
                        <div className=''>Pending Accounts</div>
                    </div>  
                </div>

                <div className='bg-white shadow-sm flex-1 p-4'>
                    <div className=''>
                        <div className='text-[2rem] font-bold'>&#x20B1; 10,500</div>
                        <div className=''>Income Today</div>
                    </div>  
                </div>
            </div>


            <div className='flex gap-2'>
                <div className='flex-1 bg-white shadow-sm p-5 mt-4'>
                    <Line options={options} data={dataSets} />
                </div>
                <div className='flex-1 bg-white shadow-sm p-5 mt-4'>
                    <Bar options={options} data={dataSets} />
                </div>
            </div>
            


        </AdminAuthLayout>
    )
}
