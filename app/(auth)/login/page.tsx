import Image from "next/image"
import { AuthForm } from "@/components/auth-form"
import { Metadata } from "next"
import Link from "next/link";

export const metadata: Metadata = {
  title: 'login - organize-simple-platform',
  description: "Login to your account"
};

const LoginPage = () => {
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
          <h1 className="text-2xl mt-8 font-semibold tracking-tight">
            Welcome back
          </h1>
        </div>
        
        <div className="text-center text-sm text-gray-500">
           Ready to join the club? {" "}
          <Link href="/register" className="text-amber-900 hover:underline">
            Sign up!
           </Link>
        </div>

        <AuthForm />
      </div>
    </div>
  )
}

export default LoginPage