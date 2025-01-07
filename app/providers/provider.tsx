"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";
import { NextUIProvider } from "@nextui-org/react";

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <NextUIProvider>
          <div className="min-h-screen flex flex-col">{children}</div>
        </NextUIProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};
