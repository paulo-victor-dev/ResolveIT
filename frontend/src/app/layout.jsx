import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/providers";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata = {
    title: "ResolveIT",
    description: "IT Help Desk",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="pt-BR"
            suppressHydrationWarning
            className={`${inter.variable} h-full w-full antialiased`}
        >
            <body className="h-full w-full flex items-center justify-center">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
