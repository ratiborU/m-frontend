// import type { Metadata } from "next";
import React from 'react';
import styles from '../page.module.css'
import ClientHeader from "@/components/ClientHeader/ClientHeader";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.block}>
        <ClientHeader />
        <div className={styles.middle}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
