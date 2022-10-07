import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

import styles from './AimsProgress.module.scss';

const AimsProgress = ({ item }) => {
  const { amount, total_amount } = item;
  const have = (total_amount / amount) * 100;
  const need = 100 - have;
  let color = 'yellow';
  if (have > 25) {
    color = have > 75 ? '#28C76F' : '#FF9F43';
  }
  const data = {
    labels: ['Накоплено', 'Осталось'],
    datasets: [
      {
        data: [have, need],
        backgroundColor: [color, 'rgba(255, 255, 255, 0.09)'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: 22,
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            return '';
          },
          label: () => '',
        },
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };
  return (
    <>
      <Doughnut options={options} data={data} />
      <div style={{ color }} className={styles.percetWrapper}>{`${Math.floor(have)} %`}</div>
    </>
  );
};

export default AimsProgress;
