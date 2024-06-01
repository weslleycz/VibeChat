"use client";

import { Box, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../../theme";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
