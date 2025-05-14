import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import styles from './layout.module.css'
import React from 'react';
import ClientHeader from "@/components/ClientHeader/ClientHeader";
import Footer from "@/components/Footer/Footer";
import StatisticsMenu from "@/components/StatisticsMenu/StatisticsMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.block}>
        {/* <ClientHeader /> */}
        <div className={styles.middle}>
          <div className={styles.layout}>
            <StatisticsMenu />
            {children}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
