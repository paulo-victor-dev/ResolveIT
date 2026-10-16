"use client";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";

import { Toggle } from "../ui/toggle";

import { Button } from "../ui/button";

import { cn } from "cn";

export function ThemeToggleButton({ className }) {
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
        <Button
            variant="outline"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "w-8 h-8",
                "transition duration-200",
                "hover:bg-muted-bg cursor-pointer",
                className
            )}
        >
            {isDark ? <Sun /> : <Moon />}
        </Button>
    );
}
