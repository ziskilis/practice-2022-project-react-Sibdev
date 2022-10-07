import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import LegendItem from './LegendItem';
import styles from './PieChart.module.scss';

const PieChart = () => {
  const categories = useSelector((state) => state.categories.list);
  let chart = categories.filter((el) => Number(el.transactions_sum) > 0);
  if (chart.length > 4) {
    chart = chart
      .slice(0, 3)
      .concat([
        { name: 'Другое', transactions_sum: chart.slice(3).reduce((a, b) => a + Number(b.transactions_sum), 0) },
      ]);
  }
  const colors = ['rgba(255, 99, 132)', 'rgba(54, 162, 235)', 'rgba(255, 206, 86)', 'rgba(255, 0, 255)'];
  const total = chart.reduce((a, b) => a + Number(b.transactions_sum), 0);
  const percents = chart.map((el) => Math.floor((el.transactions_sum / total) * 100));
  let data = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            return ` ${context[0].label} ${percents[context[0].dataIndex]}%`;
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
  for (let el of chart) {
    data.labels.push(el.name.length > 10 ? el.name.slice(0, 7) + '...' : el.name);
    data.datasets[0].data.push(el.transactions_sum);
    data.datasets[0].backgroundColor.push(colors.pop());
  }

  return (
    !!data.labels.length && (
      <div className={styles.chartWrapper}>
        <div className={styles.pieWrapper}>
          <Pie options={options} data={data} />
        </div>

        <div className={styles.legendWrapper}>
          {data.labels.map((el, index) => (
            <LegendItem key={el} color={data.datasets[0].backgroundColor[index]} label={el} />
          ))}
        </div>
      </div>
    )
  );
};

export default PieChart;
