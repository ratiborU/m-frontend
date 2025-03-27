import type { Metadata } from "next";
// import "../globals.css";
import Header from "@/components/Header/Header";
import ReactQueryProvider from "@/providers/QueryProvider/QueryProvider";

// export const metadata: Metadata = {
//   title: 'Панель администратора - Mircos',
//   description: "Магазин косметики",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body suppressHydrationWarning={true}>
    <>
      <Header />
      {/* хз надо ли */}
      <div style={{ margin: '0 70px' }}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </div>
    </>

    //   </body>
    // </html>
  );
}
