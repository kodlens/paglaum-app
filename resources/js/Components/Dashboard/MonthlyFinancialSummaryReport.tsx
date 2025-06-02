import axios from 'axios'
import React, { useEffect } from 'react'

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
import { Line } from 'react-chartjs-2';

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

export default function MonthlyFinancialSummaryReport() {

  const [data, setData] = React.useState<any>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const loadData = () => {
    setLoading(true)
    axios.get('/open-dashboard/chart-monthly-financial-report').then(res => {
      setLoading(true)
      setData(res.data)
      console.log(res.data);

    })
  }
  //const labels = data ? data.month : ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const labelMonths = data ? data.map((i:any)=>i.month) : [];
  console.log('labels months', labelMonths);

  //console.log('labels', labels.map(() => [20, 30, 40, 50, 60, 70, 80][Math.floor(Math.random() * 7)]));

  
  const dataSets = {
  
    datasets: [
      {
        label: 'Dataset 1',
        data: data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => [20, 30, 40, 50, 60, 70, 80][Math.floor(Math.random() * 7)]),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
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


  useEffect(() => {
    loadData()
  }, [])

  return (

    <div className='flex-1 bg-white shadow-sm p-5 mt-4'>
      <Line options={options} data={dataSets} />
    </div>
  )
}
