"use client";

import { ArrowDownIcon } from "@/app/assets/icons";
import {
  Accordion,
  AccordionItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

type DropdownContentProps = {
  id: number;
  link: string;
  name: string;
};

function DropdownElement({
  title,
  type,
  content,
  ...props
}: {
  title: string;
  type?: string;
  content: DropdownContentProps[] | any;
}) {
  if (type === "drawer-list") {
    return (
      <Accordion fullWidth variant="light" className="p-0 w-full">
        <AccordionItem
          title={title}
          classNames={{
            trigger: "p-",
          }}
        >
          <ul className="flex flex-col gap-2 justify-center items-start list-none pl-2">
            {content?.map((item: DropdownContentProps, index: number) => (
              <li key={index} className="text-sm">{item?.name}</li>
            ))}
          </ul>
        </AccordionItem>
      </Accordion>
    );
  }

  // return (
  //   <Dropdown>
  //     <DropdownTrigger>
  //       <span className="flex items-center gap-1">
  //         {title}
  //         <ArrowDownIcon className="w-3 h-3" />
  //       </span>
  //     </DropdownTrigger>
  //     <DropdownMenu aria-label="Link Actions">
  //       {content?.map((item: DropdownContentProps) => (
  //         <DropdownItem key={item.id} href={item?.link}>
  //           {item?.name}
  //         </DropdownItem>
  //       ))}
  //     </DropdownMenu>
  //   </Dropdown>
  // );
}

export default DropdownElement;
