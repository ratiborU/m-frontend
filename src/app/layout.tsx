import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "@/providers/QueryProvider/QueryProvider";
import ClientHeader from "@/components/ClientHeader/ClientHeader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body suppressHydrationWarning={true} className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <ClientHeader />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
