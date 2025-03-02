"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const query = new QueryClient();
export default function QueryClientProviders({ children }) {
    return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
