"use client";
import { Input } from "@nextui-org/react";

const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width = 18,
  height = 18,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function Search({
  placeholder,
  className,
  iconSize,
  ...props
}: {
  placeholder?: string;
  className?: string;
  iconSize?: number;
}) {
  return (
    <Input
      classNames={{
        base: `max-w-full sm:max-w-[8rem] h-8 ${className || ""}`,
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder={placeholder || "Type to search..."}
      size="sm"
      startContent={<SearchIcon size={iconSize || 18} />}
      type="search"
    />
  );
}
