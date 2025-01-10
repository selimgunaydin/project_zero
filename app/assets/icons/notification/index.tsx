"use client";
import { ROUTES } from "@/app/routes";
import {
  Badge,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const NotificationIcon = ({
  size,
  className,
  height,
  width,
  ...props
}: {
  size?: number;
  className?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const DeleteDocumentIcon = ({ ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Notification({ visible }: { visible: boolean }) {
  const [count, setCount] = useState(5);
  const { data } = useSession();
  if (!visible || !data) return null;

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown placement="bottom-end">
      {count > 0 ? (
        <Badge
          color="danger"
          content={count}
          isInvisible={!visible}
          shape="circle"
        >
          <DropdownTrigger>
            <span className="flex items-center justify-center cursor-pointer">
              <NotificationIcon className="fill-current" size={20} />
            </span>
          </DropdownTrigger>
        </Badge>
      ) : (
        <DropdownTrigger>
          <span className="flex items-center justify-center cursor-pointer">
            <NotificationIcon className="fill-current" size={20} />
          </span>
        </DropdownTrigger>
      )}
      <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
        <DropdownSection showDivider title="Bildirimler">
          <DropdownItem key="new" description="Create a new file">
            New file
          </DropdownItem>
          <DropdownItem key="copy" description="Copy the file link">
            Copy link
          </DropdownItem>
          <DropdownItem key="edit" description="Allows you to edit the file">
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Tüm bildirimleri siler."
            startContent={
              <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
            }
            onPress={() => setCount(0)}
          >
            Tümünü Oku
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
