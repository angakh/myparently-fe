import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart(){

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  
  const labels = ['Sept.', 'Oct.', 'Nov.', 'Dec.', 'Jan.', 'Feb.', 'Mar.'];

  const data = {
  labels,
  datasets: [
    {
      fill: false,
      label: 'Math',
      data: labels.map(() => { return Math.random() * 100 }),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      fill: false,
      label: 'Services',
      data: labels.map(() => { return Math.random() * 100 }),
      borderColor: 'rgb(235, 162, 53)',
      backgroundColor: 'rgba(235, 162, 53, 0.5)',
    },    
  ],
};
  

    return(
      <TitleCard title={"Math Progress"}>
          <Line data={data} options={options}/>
      </TitleCard>
    )
}


export default LineChart