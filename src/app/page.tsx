// import Image from "next/image";
import ClientHeader from "@/components/ClientHeader/ClientHeader";
import styles from "./page.module.css";
// import SliderComponent from "@/components/Slider/Slider";
// import { getAllProducts } from "@/services/api/products/productService";
import HomeComments from "@/widjets/HomeComments/HomeComments";
import PopularProducts from "@/widjets/PopularProducts/PopularProducts";
import SpecialOfferProducts from "@/widjets/SpecialOfferProducts/SpecialOfferProducts";
import Footer from "@/components/Footer/Footer";
import SwiperHome from "@/widjets/SwiperHome/SwiperHome";
import { Metadata } from "next";
import { TProduct } from "@/services/api/products/productType";
import { TPagination } from "@/services/types/paginationType";

export const metadata: Metadata = {
  title: "Серьги Медиинские для Прокола Ушей - Nina",
  // title: "Серьги NINA для Прокола Ушей ",
  description: "Серьги для прокола ушей от Nina из медицинской стали, с камнями: гороскоп, кристалл, сапфир и др.",
  twitter: {
    card: 'summary_large_image'
  },
}

export default async function Home() {
  // const products = await getAllProducts();

  const products2: TPagination<TProduct> = await fetch(`${process.env.BACKEND_URL}/products`)
    .then(data => data.json())

  return (
    <>
      <div className={styles.block}>
        <ClientHeader />
        <div className={styles.middle}>
          <SwiperHome />
          <div className={styles.wrapper}>
            <PopularProducts products={products2 || []} />
            <SpecialOfferProducts products={products2 || []} />
            <HomeComments />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
