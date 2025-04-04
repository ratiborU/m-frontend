'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './slider.module.css'
import slide1 from '../../../public/slider1.jpg'
import arrowBack from '../../../public/Arrow back.svg'
import arrowForward from '../../../public/Arrow forward.svg'

// добавить слайд пальцем для мобилки
// стиль для кнопки если слайды закончились
const SliderComponent = () => {
  const [index, setIndex] = useState(0);
  const images = [slide1, slide1, slide1]

  const onNext = () => {
    setIndex(Math.min(index + 1, images.length - 1))
  }

  const onPrevious = () => {
    setIndex(Math.max(index - 1, 0))
  }

  return (
    <>
      <div className={styles.slider}>
        {...images.map((x, i) => <>
          <div className={styles.slide}
            style={{
              position: 'absolute',
              left: `calc(100vw * ${i - index})`
            }}
          >
            <Image className={styles.image} src={x} alt='' />
          </div>
        </>)}
        <button className={styles.back} onClick={onPrevious}><Image src={arrowBack} alt='' /></button>
        <button className={styles.next} onClick={onNext}><Image src={arrowForward} alt='' /></button>
      </div>
    </>
  );
};

export default SliderComponent;