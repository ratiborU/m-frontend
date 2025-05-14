'use client'
import React, { useEffect, useState } from 'react';
import { TOrder } from '@/services/api/orders/orderType';
import Line from '@/components/UI/Line/Line';
import { getLast12Monts, getLast30DaysDates, monthsDictionary2, monthsDictionaryDays } from '@/lib/helpers/parseDate';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
import TimeInput from '@/components/UI/TimeInput/TimeInput';
import styles from './generalStatistics.module.css'

const datesOptions = [
  { value: 'days', text: 'Последний месяц' },
  { value: 'months', text: 'Последний год' },
  { value: 'years', text: 'Все время' },
]

type DatasetType = {
  label: string,
  data: number[],
}

type GeneralStatisticsProps = {
  orders?: TOrder[];
}

const GeneralStatistics = (props: GeneralStatisticsProps) => {
  const { orders = [] } = props;

  const [interval, setInterval] = useState('days'); // days, months, yearss
  const [dates, setDates] = useState(['', '']); // start, end
  const [data, setData] = useState<DatasetType[]>([]);
  const [labels, setLabels] = useState([...Array(12)].map((x, i) => monthsDictionary2[String(i + 1) as keyof typeof monthsDictionary2]))

  getLast30DaysDates();

  useEffect(() => {
    const newOrders = orders;

    const daysLabels = getLast30DaysDates();
    const monthsLabels = getLast12Monts();

    if (interval == 'months') {
      setLabels([...Array(12)].map((x, i) => monthsDictionary2[String(i + 1) as keyof typeof monthsDictionary2]))
      setLabels(monthsLabels);
      const dataDays = [...Array(12)].map(() => 0);
      for (let i = 0; i < orders.length; i++) {
        dataDays[((new Date(orders[i].createdAt).getMonth()) + (new Date()).getMonth() + 3) % 12] += Number(orders[i].price);
      }
      setData([{ label: 'Общие продажи', data: dataDays }]);
    } else if (interval == 'days') {
      setLabels([...Array(daysLabels.length)].map((x, i) => String(i + 1)));
      setLabels(daysLabels);
      const dataDays = [...Array(daysLabels.length)].map(() => 0);
      for (let i = 0; i < orders.length; i++) {
        dataDays[((new Date(orders[i].createdAt).getDate()) + (new Date()).getDate() + 1) % daysLabels.length] += Number(orders[i].price);
      }
      setData([{ label: 'Общие продажи', data: dataDays }]);
    } else if (interval == 'years') {
      setLabels([...Array(6)].map((x, i) => String(2020 + i)));
      const dataDays = [...Array(6)].map(() => 0);
      for (let i = 0; i < orders.length; i++) {
        dataDays[Number((new Date(orders[i].createdAt).getFullYear())) - 2020] += Number(orders[i].price);
      }
      setData([{ label: 'Общие продажи', data: dataDays }]);
    }
  }, [interval]);

  return (
    <div >
      <p className={styles.title}>Общая статистика</p>
      <div className={styles.buttons}>
        <SelectInput
          selectProps={{}}
          label={'Интервалы'}
          sizeInput='small'
          options={datesOptions}
          onChange={(e) => setInterval(String(e?.target.value))}
        />
        {/* <TimeInput
          inputProps={{}} label={'Старт'}
          sizeInput='small'
        />
        <TimeInput
          inputProps={{ value: '14-05-2025' }}
          label={'Конец'}
          sizeInput='small'
        /> */}
      </div>
      {/* <Bar /> */}
      <Line datasets={data} labels={labels} />
    </div>
  );
};

export default GeneralStatistics;