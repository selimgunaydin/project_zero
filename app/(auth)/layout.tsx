"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderSpinner } from "@/app/components/blocks/LoaderSpinner";
import { ROUTES } from "../routes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push(ROUTES.HOME);
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  return session.status === "unauthenticated" ? <div>{children}</div> : null;
}
