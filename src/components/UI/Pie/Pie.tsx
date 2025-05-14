'use client'
// import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
// import { IReviewResponse } from '../../../services/reviewsService';
import styles from './pie.module.css'
import { useMemo } from 'react';


type DatasetType = {
  label: string,
  data: number[],
}

type LineProps = {
  labels?: string[];
  datasets: DatasetType[];
}

const Pie = (props: LineProps) => {
  const { datasets, labels } = props;

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Steps taken per day',
      },
    },
  };
  const data = { labels, datasets }


  return (
    <div className={styles.pie}>
      <Chart type="pie" data={data} options={options} />
    </div>
  );
};

export default Pie;