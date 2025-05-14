'use client'
import React, { useEffect, useState } from 'react';
import { TOrder } from '@/services/api/orders/orderType';
import Line from '@/components/UI/Line/Line';
import { getLast12Monts, getLast30DaysDates, monthsDictionary2, monthsDictionaryDays } from '@/lib/helpers/parseDate';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
import TimeInput from '@/components/UI/TimeInput/TimeInput';
import styles from './productsStatistics.module.css'
import { TOrderProduct } from '@/services/api/orderProducts/orderProductType';
import Pie from '@/components/UI/Pie/Pie';
import Bar from '@/components/UI/Bar/Bar';

const datesOptions = [
  { value: 'products', text: 'Товары' },
  { value: 'categories', text: 'Категории' },
]

type DatasetType = {
  label: string,
  data: number[],
}

type GeneralStatisticsProps = {
  orderProducts?: TOrderProduct[];
  productKeys?: any;
}

const ProductsStatistics = (props: GeneralStatisticsProps) => {
  const { orderProducts = [], productKeys = {} } = props;

  const [interval, setInterval] = useState('days'); // days, months, yearss
  const [startDate, setStartDate] = useState('2025-04-14');
  const [endDate, setEndDate] = useState('2025-05-14');
  const [data, setData] = useState<DatasetType[]>([]);
  const [labels, setLabels] = useState([''])

  getLast30DaysDates();

  useEffect(() => {
    const labelKeys: string[] = Object.keys(productKeys);
    setLabels(labelKeys);
    const filteredOrderProducts = orderProducts.filter(product => {
      const productDate = new Date(product.createdAt);
      console.log((new Date(startDate)).getTime() - (new Date(endDate)).getTime());
      if (productDate.getTime() - (new Date(startDate)).getTime() < 0) {
        return false
      }
      if (productDate.getTime() - (new Date(endDate)).getTime() > 0) {
        return false
      }
      return true
    })
    const resultDataset: any = { ...productKeys };
    for (const orderProduct of filteredOrderProducts) {
      resultDataset[orderProduct.product.name] += orderProduct.count;
    }
    setData([{
      label: 'Проданные товары',
      data: Object.values(resultDataset)
    }]);
  }, [endDate, startDate]);

  return (
    <div >
      <p className={styles.title}>Статистика по товарам</p>
      <div className={styles.buttons}>
        <SelectInput
          selectProps={{
            defaultValue: 'products'
          }}
          label={'Товары'}
          sizeInput='small'
          options={datesOptions}
          onChange={(e) => setInterval(String(e?.target.value))}
        />
        <TimeInput
          inputProps={{
            value: startDate,
            onChange: (e) => setStartDate(e.target.value)
          }} label={'Старт'}
          sizeInput='small'
        />
        <TimeInput
          inputProps={{
            value: endDate,
            onChange: (e) => setEndDate(e.target.value)
          }}
          label={'Конец'}
          sizeInput='small'
        />
      </div>
      {/* <Bar /> */}
      <div className={styles.graphics}>
        <Bar datasets={data} labels={labels} />
        <Pie datasets={data} labels={labels} />
      </div>

    </div>
  );
};

export default ProductsStatistics;