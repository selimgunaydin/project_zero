"use client";

import { LoaderSpinner } from "@/app/components/blocks/LoaderSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, FC } from "react";
import { ProfileMenu } from "./Menu";

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

  return status === "authenticated" ? (
    <div className="flex h-screen">
      <ProfileMenu />
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  ) : null;
};

export default ProfileLayout;