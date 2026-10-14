"use client";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";

import { Toggle } from "../ui/toggle";

export function ThemeToggleButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    return (
        <Toggle
            variant="outline"
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            {isDark ? <Sun /> : <Moon />}
        </Toggle>
    );
}
