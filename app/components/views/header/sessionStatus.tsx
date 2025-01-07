'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function SessionStatus() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Link
        href="/admin"
        className="flex items-center border border-solid border-black rounded px-4 py-1 hover:bg-black hover:text-white transition"
      >
        Dashboard
      </Link>
    );
  } else if (status === "loading") {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  } else {
    return (
      <Link
        href="/login"
        className="flex items-center border border-solid border-black rounded px-4 py-1 hover:bg-black hover:text-white transition"
      >
        Sign In
      </Link>
    );
  }
}
