"use client";
import { createNewUser } from "@/utils/auth.api";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { NavMaps } from "@/utils/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Register() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [registerForm, setRegisterForm] = useState<RegisterFormProps>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [btnDisable, setBtnDisable] = useState<boolean>(true);

  function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
    setError(null);
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (registerForm.password !== registerForm.repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    setBtnDisable(true);
    setLoading(true);
    const createUser = await createNewUser(registerForm);
    if (!createUser.success) {
      setError(createUser.error);
      setLoading(false);
      setBtnDisable(false);
      return;
    }
    // Store email in sessionStorage before navigating
    sessionStorage.setItem("prefillEmail", registerForm.email);
    router.push("/auth/login");
  }

  useEffect(() => {
    setBtnDisable(
      registerForm.name === "" ||
        registerForm.email === "" ||
        registerForm.password === "" ||
        registerForm.repeatPassword === ""
    );
  }, [registerForm]);

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
          <h1 className="text-heading-L">Sign Up</h1>

          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            {error ? <Alert type="error" message={error as string} /> : null}
            <InputField
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={registerForm.name}
              onChange={(e) => handleChangeForm(e)}
            />

            <InputField
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={registerForm.email}
              onChange={(e) => handleChangeForm(e)}
            />
            <InputField
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={(e) => handleChangeForm(e)}
            />
            <InputField
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat Password"
              value={registerForm.repeatPassword}
              onChange={(e) => handleChangeForm(e)}
            />
            <Button disabled={btnDisable} type="submit" isLoading={isLoading}>
              Create an account
            </Button>
          </form>
          <p className="text-center text-body-M">
            Already have an account?{`  `}
            <Link className="text-red hover:text-dark_red" href={NavMaps.LOGIN}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
