"use client";

import { ROUTES } from "@/app/routes";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
  CircularProgress,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function SessionStatus() {
  const { status, data } = useSession();
  console.log("datdat: ", data);

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{data?.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="profile" href={ROUTES.PROFILE}>
              Profile
            </DropdownItem>
            <DropdownItem key="dashboard" href={ROUTES.ADMIN.HOME}>
              Dashboard
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  } else if (status === "loading") {
    return <CircularProgress aria-label="Loading..." color="primary" />;
  } else {
    return (
      <Link href={ROUTES.LOGIN}>
        <Button className="border border-gray-700 bg-gray-50" size="sm">
          <span className="font-medium text-black">Sign In</span>
        </Button>{" "}
      </Link>
    );
  }
}
