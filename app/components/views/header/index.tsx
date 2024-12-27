import Link from "next/link";
import React from "react";
import SessionStatus from "./sessionStatus";
import { getCategories } from "@/app/actions/category/get-categories";

export default async function Header() {
  const categories = await getCategories().then((res) => res?.success);

  return (
    <div className="w-full border-b bg-white z-20 sticky top-0">
      <div className="container py-3 w-full grid grid-cols-12 items-center">
        <div className="col-span-6">
          <Link className="text-3xl font-bold" href="/">
            PZ
          </Link>
        </div>

        <div className="col-span-6 flex justify-end">
          <ul className="flex gap-5 col-span-4 font-semibold justify-end items-center">
            <li className="relative group">
              <p className="cursor-pointer">Categories</p>
              <ul className="absolute hidden flex-col gap-2 ps-3 py-2 min-w-[100px] group-hover:flex border rounded bg-white shadow-lg z-30">
                {categories?.map((category) => (
                  <li className="flex py-1.5 w-full pe-12" key={category.id}>
                    <Link
                      className="w-full"
                      href={`/category/${category.name.toLowerCase()}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                className="border-b border-b-transparent hover:border-b-2 hover:border-b-black transition pb-0.5"
                href="/blog"
              >
                Blog
              </Link>
            </li>

            <li>
              <SessionStatus />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
