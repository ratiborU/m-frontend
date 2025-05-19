'use client'
// import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
// import { IReviewResponse } from '../../../services/reviewsService';
import styles from './line.module.css'


type DatasetType = {
  label: string,
  data: number[],
}

type LineProps = {
  labels?: string[];
  datasets: DatasetType[];
}

const Line = (props: LineProps) => {
  const { datasets, labels } = props;
  // const labelsData = data.map(x => x[0]);
  // const valuesData = data.map(x => x[1]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Steps taken per day',
      },
    },
  };

  // const data1 = {
  //   labels: labelsData,
  //   datasets: [{ label: name, data: valuesData, }]
  // };

  const data = {
    labels,
    datasets,
  }


  return (
    <div className={styles.line}>
      <Chart type="line" data={data} options={options} />
    </div>
  );
};

export default Line;