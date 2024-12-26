import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          "flex items-center justify-center border border-solid border-black rounded px-4 py-2 hover:bg-black hover:text-white transition",
        ),
        className
      )}
    >
      {children}
    </button>
  );
}
