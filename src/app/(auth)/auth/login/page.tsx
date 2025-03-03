"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";
import InputField from "@/components/InputField";
import Image from "next/image";
import { NavMaps } from "@/utils/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const [btnDisable, setBtnDisable] = useState<boolean>(true);

  function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    setError(null);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setBtnDisable(true);

    let res = await signIn("credentials", {
      email: loginForm.email, // Matches the `email` key
      password: loginForm.password, // Matches the `password` key
      redirect: false, // Optional, to handle redirects yourself
    });
    if (res?.ok) {
      // toast success
      router.push("/");
      return;
    } else {
      // Toast failed
      setError("Invalid email or password");
      setLoading(false);
      setBtnDisable(false);
      return;
    }
  }

  useEffect(() => {
    // Retrieve the stored email and remove it after use
    const storedEmail = sessionStorage.getItem("prefillEmail");
    if (storedEmail) {
      setLoginForm({
        email: storedEmail,
        password: "", // Clear password field
      });
      sessionStorage.removeItem("prefillEmail"); // Clear after use
    }
  }, []);

  useEffect(() => {
    setBtnDisable(loginForm.email === "" || loginForm.password === "");
  }, [loginForm]);

  return (
    <section className="h-svh flex flex-col justify-center items-center gap-10 ">
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          width={100}
          height={100}
          alt="main-logo"
          className="w-10 h-10"
          fetchPriority="auto"
        />
      </Link>

      <div className="max-w-[400px] w-full p-6 rounded-3xl bg-semi_dark_blue md:p-8">
        <div className="flex flex-col gap-10">
          <h1 className="text-heading-L">Login</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error ? (
              <div className="w-full bg-red bg-opacity-10 text-body-M px-4 py-3 rounded-lg border border-red flex gap-4 items-center">
                <CircleAlert className=" text-red" />
                {error}
              </div>
            ) : null}

            <InputField
              type="email"
              id="email"
              name="email" // Matches the `email` key in `credentials`
              placeholder="Email Address"
              value={loginForm.email}
              onChange={(e) => handleChangeForm(e)}
            />
            <InputField
              type="password"
              id="password"
              name="password" // Matches the `password` key in `credentials`
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => handleChangeForm(e)}
            />
            <Button disabled={btnDisable} type="submit" isLoading={isLoading}>
              Login to your account
            </Button>
          </form>
          <p className="text-center text-body-M">
            {`Don't have an account?`}
            <Link
              className="text-red hover:text-dark_red"
              href={NavMaps.REGSITER}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
