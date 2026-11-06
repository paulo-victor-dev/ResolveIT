"use client";

import { useState } from "react";

import { ThemeProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";

export default function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
        >
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
