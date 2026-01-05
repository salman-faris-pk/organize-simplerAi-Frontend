"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validations/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { signIn } from "next-auth/react"



export function RegisterForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const onSubmit = async (data: RegisterFormData) => {
  setLoading(true);

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!res.ok) {
      toast.error(resData.error || "Registration failed");
      return;
    }

    toast.success("Registered successfully! Logging you in...");

    const loginResult = await signIn("credentials", {
      identifier: data.username, // or data.email
      password: data.password,
      redirect: false,
    });

    if (loginResult?.ok) {
      router.refresh();
      router.push("/dashboard");
    } else {
      toast.error(loginResult?.error || "Login failed after registration");
      router.push("/login");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">

          <div className="grid gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username"
              className="placeholder:text-xs placeholder:opacity-60"
              type="text"
              disabled={loading}
              {...register("username")}
            />
            {errors.username && (
              <p className="px-1 text-xs text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="placeholder:text-xs placeholder:opacity-60"
              placeholder="email@example.com"
              type="email"
              disabled={loading}
              {...register("email")}
            />
            {errors.email && (
              <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="placeholder:text-xs placeholder:opacity-60"
              placeholder="enter a password"
              disabled={loading}
              {...register("password")}
            />
            {errors.password && (
              <p className="px-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button disabled={loading} className="mt-2 cursor-pointer">
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
