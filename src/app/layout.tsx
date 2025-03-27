import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "@/providers/QueryProvider/QueryProvider";
import ClientHeader from "@/components/ClientHeader/ClientHeader";
import { CatalogFilterContextProvider } from "@/providers/CatalogFilterProvider/CatalogFilterProvider";
import { CatalogSortContextProvider } from "@/providers/CatalogSortProvider/CatalogSortProvider";
import { PersonContextProvider } from "@/providers/PersonProvider/PersonContextProvider";
import { OrderContextProvider } from "@/providers/OrderProvider/OrderContextProvider";
import Footer from "@/components/Footer/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: {
    default: 'Mircos',
    template: '%s - Mircos' // не обязательно
  },
  description: "Магазин косметики",
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
                  <ClientHeader />
                  {children}
                  <Footer />
                </OrderContextProvider>
              </PersonContextProvider>
            </CatalogSortContextProvider>
          </CatalogFilterContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
