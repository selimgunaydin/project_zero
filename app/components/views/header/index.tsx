import Link from "next/link";
import React from "react";
import SessionStatus from "./sessionStatus";
import RtkTest from "../../blocks/rtk-test";
import { Category } from "@/app/models/Category";

export default async function Header() {
  const categories = await Category.find();

  return (
    <div className="w-full border-b bg-white">
      <div className="container py-3 w-full grid grid-cols-12 items-center">
        <Link className="text-3xl font-bold col-span-4" href="/">
          PZ
        </Link>
        <div className="col-span-4 flex justify-center">
          <RtkTest />
        </div>
        <ul className="flex gap-5 col-span-4 font-semibold justify-end">
          <li>
            <Link href="#">A</Link>
          </li>
          <li>
            <Link href="#">B</Link>
          </li>
          <li className="relative group">
            <Link href="#">Categories</Link>
            <ul className="absolute hidden flex-col gap-2 ps-2 py-1.5 min-w-[100px] group-hover:flex border rounded bg-white shadow-lg">
              {categories.map((category) => (
                <li className="flex py-1 w-full" key={category.id}>
                  <Link className="w-full" href={`/${(category.name).toLowerCase()}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <SessionStatus />
          </li>
        </ul>
      </div>
    </div>
  );
}
