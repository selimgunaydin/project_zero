'use client'

import Link from "next/link";
import React from "react";
import SessionStatus from "./sessionStatus";

export default function Header() {
  return (
    <div className="w-full border-b">
      <div className="container py-3 w-full flex justify-between items-center">
        <Link className="text-3xl font-bold" href="/">
          PZ
        </Link>
        <ul className="flex gap-5 font-semibold">
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
