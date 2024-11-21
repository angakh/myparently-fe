import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import Subtitle from '../../../components/Typography/Subtitle';

ChartJS.register(ArcElement, Tooltip, Legend,
    Tooltip,
    Filler,
    Legend);

function DoughnutChart(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };
      
      const labels = ['Math In Class Support', 'Math Out of Class Support', 'Reading In Class Support', 'Reading Out of Class Support'];
      
      const data = {
        labels,
        datasets: [
            {
                label: '% of services',
                data: [40, 40, 60, 60],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              }
        ],
      };

    return(
        <TitleCard title={"Percentage of Support Services"}>
                <Doughnut options={options} data={data} />
        </TitleCard>
    )
}


export default DoughnutChart