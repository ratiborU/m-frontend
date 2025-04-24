'use client'
import React, { useState } from 'react';
import styles from './filter.module.css'
import Image from 'next/image';
import filterIcon from '../../../public/mobile/Filter list.svg'
import crossIcon from '../../../public/mobile/Close.svg'
import { StyledSlider, Thumb, Track } from './sltyles';
import Input from '../UI/Input/Input';
import { useCatalogFilterSetterContext } from '@/providers/CatalogFilterProvider/hooks/useCatalogFilterSetterContext';
import { useGetCategoriesQuery } from '@/hooks/categories/useGetAllCategoriesQuery';
import { ICatalogFilterContext } from '@/providers/CatalogFilterProvider/contexts/catalogFilterContext';
import { useDebouncedCallback } from 'use-debounce';
import Category from '../Category/Category';
import Button from '../UI/Button/Button';

type keySetNames = 'categoryIds' | 'material' | 'size' | 'shape';

const FilterMobile = () => {
  const [isActive, setIsActive] = useState(false)
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
    <>
      <button
        className={styles.sortButtonMobile}
        type='button'
        onClick={() => setIsActive(!isActive)}
      >
        Фильтр
        <Image className={isActive ? styles.imageActive : styles.image} src={filterIcon} alt={''} />
      </button>
      <div className={isActive ? styles.filerMobileBlock : styles.filerMobileBlockNone}>
        <p className={styles.title2}>Фильтры</p>
        <button className={styles.crossButton} onClick={() => setIsActive(!isActive)}>
          <Image src={crossIcon} alt={''} />
        </button>
        <StyledSlider
          className={styles.slider}
          defaultValue={[0, 8000]}
          max={8000}
          min={0}
          // value={[0, 8000]}
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
        <Button
          text={'Применить'}
          size={'l'}
          onClick={() => setIsActive(!isActive)}
        />
      </div >
    </>
  );
};

export default FilterMobile;