'use client'
import React, { useEffect, useState } from 'react';
// import { TOrder } from '@/services/api/orders/orderType';
// import Line from '@/components/UI/Line/Line';
import { getLast30DaysDates } from '@/lib/helpers/parseDate';
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
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  productKeys?: any;
}

const ProductsStatistics = (props: GeneralStatisticsProps) => {
  const { orderProducts = [], productKeys = {} } = props;
  const nowDate = `${(new Date()).getFullYear()}-${(new Date()).getUTCMonth() < 11 ? '0' : ''}${(new Date()).getUTCMonth() + 1}-${(new Date()).getDate() < 10 ? '0' : ''}${(new Date()).getDate() + 1}`;
  const lastDate = `${(new Date()).getFullYear()}-${(new Date()).getUTCMonth() < 10 ? '0' : ''}${(new Date()).getMonth()}-${(new Date()).getDate() < 10 ? '0' : ''}${(new Date()).getDate()}`;
  const [startDate, setStartDate] = useState(lastDate);
  const [endDate, setEndDate] = useState(nowDate);
  const [data, setData] = useState<DatasetType[]>([]);
  const [labels, setLabels] = useState([''])



  getLast30DaysDates();

  useEffect(() => {
    const labelKeys: string[] = Object.keys(productKeys);
    setLabels(labelKeys);
    const filteredOrderProducts = orderProducts.filter(product => {
      const productDate = new Date(product.createdAt);
      if (productDate.getTime() - (new Date(startDate)).getTime() < 0) {
        return false
      }
      if (productDate.getTime() - (new Date(endDate)).getTime() > 0) {
        return false
      }
      return true
    })
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const resultDataset: any = { ...productKeys };
    for (const orderProduct of filteredOrderProducts) {
      resultDataset[orderProduct.product.name] += orderProduct.count;
    }
    setData([{
      label: 'Проданные товары',
      data: Object.values(resultDataset)
    }]);
  }, [endDate, startDate, orderProducts, productKeys]);

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
        // onChange={(e) => setInterval(String(e?.target.value))}
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