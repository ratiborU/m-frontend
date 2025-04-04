'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import styles from './swiperHome.module.css'
import slideImage from '../../../public/slide1920 465.png'

const SwiperHome = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      className={`mySwiper ${styles.swiper} `}
    >
      <SwiperSlide className={styles.swiperSlide}>
        <Image src={slideImage} alt={''} width={1920} height={465} />
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <Image src={slideImage} alt={''} width={1920} height={465} />
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <Image src={slideImage} alt={''} width={1920} height={465} />
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <Image src={slideImage} alt={''} width={1920} height={465} />
      </SwiperSlide>
      {/* <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide> */}
    </Swiper>
  );
};

export default SwiperHome;