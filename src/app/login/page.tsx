import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login | Octis",
  description: "Sign in to your jewellery management system",
};

export default function LoginPage() {
  return <LoginForm />;
}
