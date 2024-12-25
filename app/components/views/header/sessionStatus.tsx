import { useSession } from "next-auth/react";
import Link from "next/link";

import React from "react";

export default function SessionStatus() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Link
        href="/profile"
        className="flex items-center border border-solid border-black rounded px-4"
      >
        Profile
      </Link>
    );
  } else if (status === "loading") {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  } else {
    return (
      <Link
        href="/auth/login"
        className="flex items-center border border-solid border-black rounded px-4"
      >
        Sign In
      </Link>
    );
  }
}
