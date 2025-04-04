'use client'
import React, { useState } from 'react';
import styles from './filter.module.css'
// import ReactSlider from 'react-slider';
// import styled from 'styled-components';
import { StyledSlider, Thumb, Track } from './sltyles';
// import { useCatalogFilterContext } from '@/providers/CatalogFilterProvider/hooks/useCatalogFilterContxt';
import { useCatalogFilterSetterContext } from '@/providers/CatalogFilterProvider/hooks/useCatalogFilterSetterContext';
import Input from '../UI/Input/Input';
import Category from '../Category/Category';
import { useGetCategoriesQuery } from '@/hooks/categories/useGetAllCategoriesQuery';
import { useDebouncedCallback } from 'use-debounce';
import { ICatalogFilterContext } from '@/providers/CatalogFilterProvider/contexts/catalogFilterContext';

type keySetNames = 'categoryIds' | 'material' | 'size' | 'shape';

const Filter = () => {
  // const filter = useCatalogFilterContext();
  const setFilter = useCatalogFilterSetterContext();

  const { data } = useGetCategoriesQuery();
  const material = ['Золото', 'Сталь']
  const size = ['Маленький', 'Средний', 'Большой']
  // const size = ['S', 'M', 'L']
  const shape = ['Завальцованные', 'Крапан', 'Без камня']

  const [filterState, setFilterState] = useState<ICatalogFilterContext>({
    startPrice: 0,
    endPrice: 8000,
    categoryIds: [],
    material: [], // золото сталь
    size: [], // большой маленький средний
    shape: [], // завальцовка крапан без камня
  });

  const debounce = useDebouncedCallback(() => {
    setFilter.setCategoryIds(filterState.categoryIds);
    setFilter.setStartPrice(filterState.startPrice);
    setFilter.setEndPrice(filterState.endPrice);
    setFilter.setMaterial(filterState.material);
    setFilter.setShape(filterState.shape);
    setFilter.setSize(filterState.size);
  }, 500)

  const onFilterCategoryClick = (array: string[], key: keySetNames, text: string) => {
    return () => {
      if (array.includes(text)) {
        // setFilter[key](array.filter(x => x != text));
        setFilterState(previous => {
          const newFilter = { ...previous }
          newFilter[key] = array.filter(x => x != text);
          return newFilter;
        })
        debounce();
      } else {
        // setFilter[key]([...array, text])
        setFilterState(previous => {
          const newFilter = { ...previous }
          newFilter[key] = [...array, text];
          return newFilter;
        })
        debounce();
      }
    }
  }

  const onChange = (values: number | readonly number[]) => {
    if (typeof values == 'number') {
      setFilterState({ ...filterState, startPrice: values, endPrice: values });
      debounce();
      // setFilter.setStartPrice(values);
      // setFilter.setEndPrice(values);
    } else {
      setFilterState({ ...filterState, startPrice: values[0], endPrice: values[1] });
      debounce();
      // setFilter.setStartPrice(values[0]);
      // setFilter.setEndPrice(values[1]);
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
            onChange: () => { },
            style: { 'width': '120px' }
          }}
          label={'От'}
        />
        <Input
          inputProps={{
            value: filterState.endPrice,
            onChange: () => { },
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
            values={filterState.categoryIds}
            onClick={onFilterCategoryClick(filterState.categoryIds, 'categoryIds', x.name)}
          />
        )) : <></>
        }
      </div>
      <p className={styles.title2}>Материал</p>
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
      </div>
      <p className={styles.title2}>Форма</p>
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
      </div>
      <p className={styles.title2}>Размер</p>
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
      </div>
    </div>
  );
};

export default Filter;