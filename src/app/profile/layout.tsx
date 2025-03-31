import type { Metadata } from "next";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import styles from './layout.module.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.layout}>
        <ProfileMenu />
        {children}
      </div>
    </>

  );
}
