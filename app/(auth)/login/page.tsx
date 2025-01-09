/* eslint-disable react/no-unescaped-entities */
"use client";
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert, Button, Form, Input } from "@nextui-org/react";
import { ROUTES } from "@/app/routes";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    }
    if (res?.ok) {
      return router.push(ROUTES.HOME);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error])

  return (
    <section className="w-full h-screen flex-1 flex items-center justify-center">
      <Form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
          border border-solid border-gray-300 bg-white rounded-xl"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="fixed max-w-[400px] w-full h-screen bg-transparent top-0 py-10">
            <Alert color="danger" title={error} />
          </div>
        )}
        <h1 className="mb-4 w-full text-2xl font-bold">Sign In</h1>
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="E-Mail"
          labelPlacement="outside"
          name="username"
          type="email"
          classNames={{
            inputWrapper: "h-[50px]",
          }}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="username"
          type="text"
          classNames={{
            inputWrapper: "h-[50px] mb-10",
          }}
        />
        <Button className="w-full" type="submit" variant="solid">
          Sign In
        </Button>
        <Link
          href={ROUTES.REGISTER}
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          Don't have an account?
        </Link>
      </Form>
    </section>
  );
}
