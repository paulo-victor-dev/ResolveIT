"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { getCurrentUserAction, logoutAction } from "@/actions/authActions";

import { cn } from "cn";

import { LogOut } from "lucide-react";

import { Button } from "../ui/button";
import { ThemeToggleButton } from "./themeToggleButton";

export default function UserArea({ sidebarIsClosed }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();

        router.refresh();
    };

    const getUserAcronym = () => {
        const username = user?.username; 

        if (username) {
            return username.slice(0, 1).toUpperCase();
        };

        return "A";
    };

    useEffect(() => {
        const getUser = async () => {
            const user = await getCurrentUserAction();

            setUser(user);
        };

        getUser();
    }, []);

    return (
        <div 
            className={cn(
                "flex items-center justify-between px-2"
            )}
        >
            <div className={cn(
                "flex items-center gap-1",
                "transition-transform duration-300",
                sidebarIsClosed? "-translate-x-50" : "translate-x-0"
            )}>
                <span className={cn(
                    "w-8 flex items-center justify-center p-2 rounded-md",
                    "text-primary-foreground font-semibold text-xs uppercase",
                    "bg-primary",
                )}>
                    {getUserAcronym()}
                </span>

                <div className={cn(
                    "w-28 flex flex-col justify-center text-nowrap"
                )}>
                    <span className="font-semibold overflow-hidden text-ellipsis text-xs">
                        {user?.username}
                    </span>

                    <span className="text-xs overflow-hidden text-ellipsis text-muted-foreground">
                        {user?.role}
                    </span>
                </div>
            </div>

            {/* Arrumar aqui e criar DropDown, o do ShadCn está ruim */}

            <ThemeToggleButton className="w-8 h-8" />

            <Button
                variant="destructive" 
                onClick={handleLogout}
                className={cn(
                    "w-8 h-8",
                    "transition-transform duration-300",
                    sidebarIsClosed ? "-translate-x-40" : ""
                )}
            >
                <LogOut size={20} />
            </Button>
        </div>
    );

}
