"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { cn } from "cn";

import { Sun, Moon, LogOutIcon } from "lucide-react";

import { logoutAction } from "@/actions/authActions";

import LogoArea from "./logoArea";
import Navlinks from "./navlinks";
import UserArea from "./userArea";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "../ui/dropdown-menu";

export default function Sidebar() {
    const [isClosed, setIsClosed] = useState(false);
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const isDark = theme === "dark"; 

    const handleLogout = async () => {
        await logoutAction();
        router.refresh();
    };

    return (
        <aside className={cn(
            "h-full shrink-0 flex flex-col gap-4 p-4 overflow-hidden",
            "transition-[width] duration-250",
            isClosed ? "w-19" : "w-75"
        )}>
            <LogoArea 
                sidebarState={{ isClosed, setIsClosed }} 
                isDark={isDark} 
            />

            <Navlinks 
                sidebarState={{ isClosed }} 
            />          

            <DropdownMenu>
                <DropdownMenuTrigger render={
                    <UserArea sidebarState={{ isClosed }} />
                } />

                <DropdownMenuContent className={isClosed && "w-50"}>
                    <DropdownMenuItem 
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="flex items-center cursor-pointer"
                    >
                        {isDark? <Moon /> : <Sun />}

                        <div className="flex flex-col">
                            {isDark? "Tema escuro" : "Tema claro"}

                            <span className="text-xs text-muted-fg">
                                Clique para alterar
                            </span>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleLogout}
                        variant="destructive"
                        className="cursor-pointer"
                    >
                        <LogOutIcon  />
                        Sair da conta
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </aside>
    );
}
