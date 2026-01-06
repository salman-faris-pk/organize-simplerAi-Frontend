import Image from "next/image";
import { RegisterForm } from "@/components/register-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "register - Extraction-platform",
  description: "Create a new account",
};

const RegisterPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
        <div className="flex flex-col text-center">
          <Image
            className="mx-auto"
            src="/logo-org.png"
            width={65}
            height={70}
            alt="Organize Simple Logo"
          />
          <h1 className="text-2xl mt-8 font-semibold tracking-tight">Create an Account</h1>
        </div>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-900 hover:underline">
            Sign in
          </Link>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
