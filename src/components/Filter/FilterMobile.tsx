'use client'
import React, { useState } from 'react';
import styles from './filter.module.css'
import Image from 'next/image';
import filterIcon from '../../../public/mobile/Filter list.svg'
import crossIcon from '../../../public/mobile/Close.svg'
import { StyledSlider, Thumb, Track } from './sltyles';
import Input from '../UI/Input/Input';
// import { useCatalogFilterSetterContext } from '@/providers/CatalogFilterProvider/hooks/useCatalogFilterSetterContext';
import { useGetCategoriesQuery } from '@/hooks/categories/useGetAllCategoriesQuery';
// import { ICatalogFilterContext } from '@/providers/CatalogFilterProvider/contexts/catalogFilterContext';
import { useDebouncedCallback } from 'use-debounce';
import Category from '../Category/Category';
import Button from '../UI/Button/Button';
import { useFilterContext } from '@/providers/NewFilterProvider/hooks/useFilterContxt';
import { useFilterSetterContext } from '@/providers/NewFilterProvider/hooks/useFilterSetterContext';
import { IFilterContext } from '@/providers/NewFilterProvider/contexts/filterContext';
import Parameter from '../Category/Parameter';

// type keySetNames = 'categoryIds' | 'material' | 'size' | 'shape';

const FilterMobile = () => {
  const [isActive, setIsActive] = useState(false)
  const filter = useFilterContext();
  const setFilter = useFilterSetterContext();
  const [parametersState, setParametersState] = useState<object>(filter.parameters);

  const { data } = useGetCategoriesQuery();

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
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const newEmptyParameters = Object.keys(newParameters || {}).reduce((acc: any, cur) => {
        acc[cur] = [];
        return acc
      }, {})
      console.log(newEmptyParameters);
      setFilterState({ ...filterState, categoryId: id, parameters: newEmptyParameters });
      setParametersState(newParameters || {})
      debounce();
    }
  }

  const onParameterClick = (name: string, parameterName: string) => {
    return () => {
      const newParameters = filterState.parameters;
      // @ts-expect-error:next-line
      if (newParameters[name as keyof typeof newParameters].includes(parameterName)) {
        // @ts-expect-error:next-line
        newParameters[name as keyof typeof newParameters] = newParameters[name as keyof typeof newParameters].filter(x => x != parameterName);
      } else {
        // @ts-expect-error:next-line
        newParameters[name as keyof typeof newParameters].push(parameterName);
      }
      setFilterState({ ...filterState, parameters: newParameters });
      debounce();
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
            />
          )) : <></>
          }
        </div>
        {
          ...Object.keys(filter.parameters).map(name => <>
            <p className={styles.title2}>{name}</p>
            <div className={styles.categories}>
              {/* @ts-expect-error:next-line */}
              {parametersState ? parametersState[name as keyof typeof parametersState]?.map((x: string) => (
                <Parameter
                  key={`category filter: ${x}`}
                  text={x}
                  values={filterState.parameters[name as keyof typeof filterState.parameters]}
                  onClick={onParameterClick(name, x)}
                />
              )) : <></>
              }
            </div>
          </>)
        }
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