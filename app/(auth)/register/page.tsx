"use client";
import { register } from "@/app/actions/auth/register";
import { ROUTES } from "@/app/routes";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
      surname: formData.get("surname"),
      phone: formData.get("phone"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push(ROUTES.HOME);
    }
  };

  return (
    <section className="w-full flex items-center justify-center">
      <form
        ref={ref}
        action={handleSubmit}
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
          border border-solid border-black bg-white rounded"
      >
        {error && <div className="">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>

        <div className="flex gap-2">
          <div>
            <label className="w-full text-sm">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
              name="name"
            />
          </div>
          <div>
            <label className="w-full text-sm">Surname</label>
            <input
              type="text"
              placeholder="Surname"
              className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
              name="surname"
            />
          </div>
        </div>

        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
          name="email"
        />

        <label className="w-full text-sm">Phone</label>
        <input
          type="phone"
          placeholder="Phone"
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
          name="phone"
        />

        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
            name="password"
          />
        </div>

      <Button className="w-full">Sign Up</Button>

        <Link
          href="/login"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
