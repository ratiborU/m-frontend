import React from "react";
import Header from "@/components/Header/Header";
import ReactQueryProvider from "@/providers/QueryProvider/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div style={{ margin: '0 70px' }}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </div>
    </>
  );
}
