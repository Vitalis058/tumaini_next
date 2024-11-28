"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: Readonly<React.ReactNode>;
}
const client = new QueryClient();

function QueryProvider({ children }: Props) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
