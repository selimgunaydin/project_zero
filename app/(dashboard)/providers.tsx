"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
      {children}
    </NextThemesProvider>
  );
}
