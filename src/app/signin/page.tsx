import { Metadata } from "next";
import Registration from "@/widjets/Registration/Registration";

export const metadata: Metadata = {
  title: 'Регистрация'
}

export default function RegistrationPage() {
  return (
    <Registration />
  );
}
