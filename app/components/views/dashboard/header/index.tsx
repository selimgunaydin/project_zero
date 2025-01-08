import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { UserDropdown } from "./user-dropdown";
import { BurguerButton } from "./burguer-button";
import { SearchIcon } from "@/app/components/icons/searchicon";
import { FeedbackIcon } from "@/app/components/icons/navbar/feedback-icon";
import { NotificationsDropdown } from "./notifications-dropdown";
import { SupportIcon } from "@/app/components/icons/navbar/support-icon";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <NotificationsDropdown />
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
}
