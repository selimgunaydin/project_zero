"use client";

import { LoaderSpinner } from "@/app/components/blocks/LoaderSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, FC } from "react";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  return status === "authenticated" ? <>{children}</> : null;
};

export default ProfileLayout;
