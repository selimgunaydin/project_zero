"use client";

import { ArrowDownIcon } from "@/app/assets/icons";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from "@nextui-org/react";

type DropdownContentProps = {
  id: number;
  link: string;
  name: string;
};

function DropdownElement({
  title,
  content,
  ...props
}: {
  title: string;
  content: DropdownContentProps[] | any;
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <span className="flex items-center gap-1">
          {title}
          <ArrowDownIcon className="w-3 h-3" />
        </span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Link Actions">
        {content?.map((item: DropdownContentProps) => (
          <DropdownItem key={item.id} href={item?.link}>
            {item?.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownElement;
