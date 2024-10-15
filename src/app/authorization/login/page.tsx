// 'use client'
// todo вынести код в отдельный компонент который сделать client

import { Metadata } from "next";
// import styles from "./page.module.css";
// import Input from "@/components/UI/Input/Input";
// import Title from "@/components/UI/Title/Title";
import Login from "@/components/Login/Login";
// import Button from "@/components/UI/Button/Button";

export const metadata: Metadata = {
    title: 'Login'
}

export default function LoginPage() {
    return (
        <Login/>
    );
}
  