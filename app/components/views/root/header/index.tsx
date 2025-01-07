import Link from "next/link";
import React from "react";
import SessionStatus from "./sessionStatus";

export default async function Header() {

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
              <p className="cursor-pointer">Title</p>
            </li>
            <li>
              <Link
                className="border-b border-b-transparent hover:border-b-2 hover:border-b-black transition pb-0.5"
                href="#"
              >
                Title
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
