import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import 'swiper/css/keyboard';
import { Pagination, Navigation } from 'swiper/modules';
import styles from './gallery.module.css'
import Image from 'next/image';

type GalleryProps = {
  isVisible?: boolean;
  images?: string[]
}

// Infinite loop

const Gallery = (props: GalleryProps) => {
  const { isVisible = true, images = [] } = props;

  return (
    <>
      <div id={`dark-window`} className={`${styles.darkWindow} ${!isVisible && styles.none}`}></div>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{ clickable: true, }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={`mySwiper ${styles.swiper} ${!isVisible && styles.none}`}
      >
        {...images.map(x => (
          <SwiperSlide key={`swiper slide gallery key: ${x}`} className={styles.swiperSlide}>
            <Image src={x} alt={''} width={1024} height={1024} />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide className={styles.swiperSlide}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide> */}
        {/* <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 4</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 5</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 6</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 7</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 8</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 9</SwiperSlide> */}
      </Swiper>
    </>

  );
};

export default Gallery;