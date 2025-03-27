// import Image from "next/image";
import styles from "./page.module.css";
import SliderComponent from "@/components/Slider/Slider";
import { getAllProducts } from "@/services/api/products/productService";
import HomeComments from "@/widjets/HomeComments/HomeComments";
import PopularProducts from "@/widjets/PopularProducts/PopularProducts";
import SpecialOfferProducts from "@/widjets/SpecialOfferProducts/SpecialOfferProducts";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
      {/* <ClientHeader /> */}
      <SliderComponent />
      <div className={styles.wrapper}>
        <PopularProducts products={products} />
        <SpecialOfferProducts products={products} />
        <HomeComments />
      </div>

    </>
  );
}
