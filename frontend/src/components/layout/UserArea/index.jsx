"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { SunIcon, MoonIcon, LogOutIcon } from "lucide-react";

import { logoutAction } from "@/actions/authActions";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components//ui/dropdown-menu";

import UserAreaDropdownTrigger from "./userArea-dropdown-trigger";

export default function UserArea({ sidebarIsClosed }) {
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const isDark = theme === "dark"; 

    const handleLogout = async () => {
        await logoutAction();
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <UserAreaDropdownTrigger sidebarIsClosed={sidebarIsClosed} />
            } />

            <DropdownMenuContent className={sidebarIsClosed && "w-50"}>
                <DropdownMenuItem 
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="flex items-center cursor-pointer"
                >
                    {isDark? <MoonIcon /> : <SunIcon />}

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
    );
}
