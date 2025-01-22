"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";
import InputField from "@/components/InputField";
import Image from "next/image";
import { NavMaps } from "@/utils/navigation";

interface LoginFormProps {
  email: string;
  password: string;
}

const dummyUsers = [
  { id: 1, email: "admin@example.com", password: "admin123" },
  { id: 2, email: "farel@example.com", passwprd: "admin123" },
];

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
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
    setTimeout(() => {
      setError(null);
      const user = dummyUsers.find((u) => u.email === loginForm.email);
      if (user && user.password === loginForm.password) {
        setLoading(false);
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 3000);
  }

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
              name="email"
              placeholder="Email Address"
              value={loginForm.email}
              onChange={(e) => handleChangeForm(e)}
            />
            <InputField
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => handleChangeForm(e)}
            />
            <Button
              disabled={btnDisable}
              label="Login to your account"
              type="submit"
            />
          </form>
          <p className="text-center text-body-M">
            Don't have an account?{`  `}
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
