import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = ['Sept.', 'Oct.', 'Nov.', 'Dec.', 'Jan.', 'Feb.', 'Mar.'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Reading',
            data: labels.map(() => { return Math.random() * 100 }),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Services',
            data: labels.map(() => { return Math.random() * 100 }),
            backgroundColor: 'rgba(53, 162, 235, 1)',
          },
        ],
      };

    return(
      <TitleCard title={"Reading Comprehension"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChart