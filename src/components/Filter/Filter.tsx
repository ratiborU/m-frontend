'use client'
import React, { useState } from 'react';
import styles from './filter.module.css'
// import ReactSlider from 'react-slider';
// import styled from 'styled-components';
import { StyledSlider, Thumb, Track } from './sltyles';
import { useCatalogFilterContext } from '@/providers/CatalogFilterProvider/hooks/useCatalogFilterContxt';
import { useCatalogFilterSetterContext } from '@/providers/CatalogFilterProvider/hooks/useCatalogFilterSetterContext';
import Input from '../UI/Input/Input';
import Category from '../Category/Category';
import { useGetCategoriesQuery } from '@/hooks/categories/useGetAllCategoriesQuery';
import { useDebouncedCallback } from 'use-debounce';
// import { ICatalogFilterContext } from '@/providers/CatalogFilterProvider/contexts/catalogFilterContext';
import { useFilterContext } from '@/providers/NewFilterProvider/hooks/useFilterContxt';
import { useFilterSetterContext } from '@/providers/NewFilterProvider/hooks/useFilterSetterContext';
import { IFilterContext } from '@/providers/NewFilterProvider/contexts/filterContext';
import Parameter from '../Category/Parameter';

// type keySetNames = 'categoryIds' | 'material' | 'size' | 'shape';

const Filter = () => {
  const filter = useFilterContext();
  const setFilter = useFilterSetterContext();
  // const [categoryId, setCategoryId] = useState<string | undefined>(filter.categoryId);
  const [parametersState, setParametersState] = useState<object>(filter.parameters);

  const { data } = useGetCategoriesQuery();
  // const material = ['Золото', 'Сталь']
  // const size = ['Маленький', 'Средний', 'Большой']
  // const size = ['S', 'M', 'L']
  // const shape = ['Завальцованные', 'Крапан', 'Без камня']

  const [filterState, setFilterState] = useState<IFilterContext>({
    startPrice: 0,
    endPrice: 8000,
    categoryId: '',
    parameters: {}
  });

  const debounce = useDebouncedCallback(() => {
    setFilter.setCategoryId(String(filterState.categoryId));
    setFilter.setStartPrice(filterState.startPrice);
    setFilter.setEndPrice(filterState.endPrice);
    setFilter.setParameters({ ...filterState.parameters });
    console.log('hola');
    console.log(filter.parameters);
  }, 500)

  const onCategoryClick = (id: string) => {
    return () => {
      const newParameters = data?.rows.find(x => x.id == id)?.parameters;
      const newEmptyParameters = Object.keys(newParameters || {}).reduce((acc, cur) => {
        acc[cur] = [];
        return acc
      }, {})
      console.log(newEmptyParameters);
      // console.log(newParameters);
      setFilterState({ ...filterState, categoryId: id, parameters: newEmptyParameters });
      setParametersState(newParameters || {})
      // console.log(newParameters);
      debounce();
    }
  }

  const onParameterClick = (name: string, parameterName: string) => {
    return () => {
      const newParameters = filterState.parameters;
      if (newParameters[name as keyof typeof newParameters].includes(parameterName)) {
        newParameters[name as keyof typeof newParameters] = newParameters[name as keyof typeof newParameters].filter(x => x != parameterName);
        // console.log(newParameters[name as keyof typeof newParameters])
        // console.log(parameterName);
      } else {
        newParameters[name as keyof typeof newParameters].push(parameterName);
      }
      setFilterState({ ...filterState, parameters: newParameters });
      debounce();
      // console.log(newParameters);
      // console.log(newParameters);
      // setFilterState({ ...filterState, categoryId: id, parameters: newParameters });
      // debounce();
    }
  }

  // const onFilterCategoryClick = (array: string[], key: keySetNames, text: string) => {
  //   return () => {
  //     if (array.includes(text)) {
  //       // setFilter[key](array.filter(x => x != text));
  //       setFilterState(previous => {
  //         const newFilter = { ...previous }
  //         newFilter[key] = array.filter(x => x != text);
  //         return newFilter;
  //       })
  //       debounce();
  //     } else {
  //       // setFilter[key]([...array, text])
  //       setFilterState(previous => {
  //         const newFilter = { ...previous }
  //         newFilter[key] = [...array, text];
  //         return newFilter;
  //       })
  //       debounce();
  //     }
  //   }
  // }

  const onChange = (values: number | readonly number[]) => {
    if (typeof values == 'number') {
      setFilterState({ ...filterState, startPrice: values, endPrice: values });
      debounce();
    } else {
      setFilterState({ ...filterState, startPrice: values[0], endPrice: values[1] });
      debounce();
    }
  }

  const onChangeInputStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(Number(e.target.value))) {
      setFilterState({ ...filterState, startPrice: Math.min(8000, Math.max(0, Number(e.target.value))) })
      debounce();
    }
  }

  const onChangeInputEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(Number(e.target.value))) {
      setFilterState({ ...filterState, endPrice: Math.min(8000, Math.max(0, Number(e.target.value))) })
      debounce();
    }
  }

  return (
    <div className={styles.filter}>
      <p className={styles.title}>Цена</p>
      <StyledSlider
        className={styles.slider}
        defaultValue={[0, 8000]}
        max={8000}
        min={0}
        value={[filterState.startPrice, filterState.endPrice]}
        onChange={(values) => onChange(values)}
        renderTrack={Track}
        renderThumb={Thumb}
        minDistance={100}
        pearling
      />
      <div className={styles.priceInputs}>
        <Input
          inputProps={{
            value: filterState.startPrice,
            onChange: onChangeInputStart,
            style: { 'width': '120px' }
          }}
          label={'От'}
        />
        <Input
          inputProps={{
            value: filterState.endPrice,
            onChange: onChangeInputEnd,
            style: { 'width': '120px' }
          }}
          label={'До'}
        />
      </div>
      <p className={styles.title2}>Категория товаров</p>
      <div className={styles.categories}>
        {data ? data!.rows.map((x) => (
          <Category
            key={`category filter: ${x.id}`}
            text={x.name}
            currentValue={filterState.categoryId}
            value={x.id}
            onClick={onCategoryClick(x.id)}
          // onClick={onFilterCategoryClick(filterState.categoryId, 'categoryIds', x.name)}
          />
        )) : <></>
        }
      </div>
      {
        ...Object.keys(filter.parameters).map(name => <>
          <p className={styles.title2}>{name}</p>
          <div className={styles.categories}>
            {parametersState ? parametersState[name as keyof typeof parametersState]?.map((x: string) => (
              <Parameter
                key={`category filter: ${x}`}
                text={x}
                values={filterState.parameters[name as keyof typeof filterState.parameters]}
                onClick={onParameterClick(name, x)}
              // onClick={onFilterCategoryClick(filterState.categoryId, 'categoryIds', x.name)}
              />
            )) : <></>
            }
          </div>
        </>)
      }
      {/* <p className={styles.title2}>Материал</p>
      <div className={styles.categories}>
        {
          ...material.map((x) => (
            <Category
              key={`category filter material: ${x}`}
              text={x}
              values={filterState.material}
              onClick={onFilterCategoryClick(filterState.material, 'material', x)}
            />
          ))
        }
      </div> */}
      {/* <p className={styles.title2}>Форма</p>
      <div className={styles.categories}>
        {
          ...shape.map((x) => (
            <Category
              key={`category filter shape: ${x}`}
              text={x}
              values={filterState.shape}
              onClick={onFilterCategoryClick(filterState.shape, 'shape', x)}
            />
          ))
        }
      </div> */}
      {/* <p className={styles.title2}>Размер</p>
      <div className={styles.categories}>
        {
          ...size.map((x) => (
            <Category
              key={`category filter size: ${x}`}
              text={x}
              values={filterState.size}
              onClick={onFilterCategoryClick(filterState.size, 'size', x)}
            />
          ))
        }
      </div> */}
    </div>
  );
};

export default Filter;