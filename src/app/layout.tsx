import type { Metadata } from "next";
// import localFont from "next/font/local";
import React from 'react';
import "./globals.css";
import ReactQueryProvider from "@/providers/QueryProvider/QueryProvider";
// import ClientHeader from "@/components/ClientHeader/ClientHeader";
import { CatalogFilterContextProvider } from "@/providers/CatalogFilterProvider/CatalogFilterProvider";
import { CatalogSortContextProvider } from "@/providers/CatalogSortProvider/CatalogSortProvider";
import { PersonContextProvider } from "@/providers/PersonProvider/PersonContextProvider";
import { OrderContextProvider } from "@/providers/OrderProvider/OrderContextProvider";

export const metadata: Metadata = {
  title: {
    default: 'Серьги Медиинские для Прокола Ушей',
    template: '%s - NINA'
  },
  description: "Серьги для прокола ушей от Nina из медицинской стали, с камнями: гороскоп, кристалл, сапфир и др.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body suppressHydrationWarning={true} className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body suppressHydrationWarning={true} >
        <ReactQueryProvider>
          <CatalogFilterContextProvider>
            <CatalogSortContextProvider>
              <PersonContextProvider>
                <OrderContextProvider>
                  {children}
                  {/* <div className={styles.block}>
                    <ClientHeader />
                    <div className={styles.middle}>
                      {children}
                    </div>

                    <Footer />
                  </div> */}
                </OrderContextProvider>
              </PersonContextProvider>
            </CatalogSortContextProvider>
          </CatalogFilterContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
