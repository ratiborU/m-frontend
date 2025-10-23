import React from "react";
import Header from "@/components/Header/Header";
import ReactQueryProvider from "@/providers/QueryProvider/QueryProvider";
import styles from './layout.module.css'
import MobileHeaderAdmin from "@/components/Header/MobileHeaderAdmin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <MobileHeaderAdmin />
      <div className={styles.wrapper}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </div>
    </>
  );
}
