/* eslint-disable react/no-unescaped-entities */
"use client";
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert, Button, Form, Input } from "@nextui-org/react";
import { ROUTES } from "@/app/routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("E-Mail is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  console.log(errors);
  const onSubmit = async (data: any) => {
    console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
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
  }, [error]);

  return (
    <section className="w-full h-screen flex-1 flex items-center justify-center">
      <Form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between gap-2 
          border border-solid border-gray-300 bg-white rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <div className="fixed max-w-[400px] w-full h-screen bg-transparent top-0 py-10">
            <Alert color="danger" title={error} />
          </div>
        )}
        <h1 className="mb-4 w-full text-2xl font-bold">Sign In</h1>
      <div className="w-full space-y-2">
      <Input
          {...register("email")}
          isRequired
          errorMessage="Please enter a valid username"
          label="E-Mail"
          labelPlacement="outside"
          name="email"
          type="email"
          classNames={{
            inputWrapper: "h-[50px]",
          }}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4 w-full space-y-2">
      <Input
          {...register("password")}
          isRequired
          errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"
          type="text"
          classNames={{
            inputWrapper: "h-[50px]",
          }}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
        <Button className="w-full" type="submit" variant="solid">
          Sign In
        </Button>
        <Link
          href={ROUTES.REGISTER}
          className="text-sm text-[#888] transition duration-150 ease hover:text-black text-center w-full"
        >
          Don't have an account?
        </Link>
      </Form>
    </section>
  );
}
