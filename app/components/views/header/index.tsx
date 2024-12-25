"use client";

import Link from "next/link";
import React from "react";
import SessionStatus from "./sessionStatus";
import RtkTest from "../../rtk-test";

export default function Header() {
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
          <li>
            <Link href="#">C</Link>
          </li>
          <li>
            <SessionStatus />
          </li>
        </ul>
      </div>
    </div>
  );
}
