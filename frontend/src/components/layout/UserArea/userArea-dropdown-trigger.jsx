"use client";

import { cn } from "cn";

import { ChevronsUpDownIcon } from "lucide-react";

import { useAuthContext } from "@/contexts/AuthContext";

export default function UserAreaDropdownTrigger({ sidebarIsClosed, ...props }) {
    const { user } = useAuthContext();

    const getUserAcronym = () => {
        const username = user?.username; 

        if (!username) return "A";

        return username.slice(0, 1).toUpperCase();
    };
    
    return (
        <button
            {...props}
            className={cn(
                "w-full h-12 flex items-center px-[1.5px] gap-1",
                "rounded-sm cursor-pointer overflow-hidden relative",
                "outline outline-offset-6",
                "transition-colors duration-200",
                "hover:outline-muted-fg",
                "outline-border",
            )}
        >
            <div className={cn(
                "w-full h-full flex items-center gap-3",
            )}>
                <span className={cn(
                    "h-full w-10 flex items-center justify-center",
                    "absolute rounded-md text-sm",
                    "bg-primary text-primary-foreground",
                )}>
                    {getUserAcronym()}
                </span>

                <div className={cn(
                    "max-w-30 flex flex-col text-start ml-12",
                    "text-nowrap",
                    "transition-[visibility] duration-200",
                    sidebarIsClosed && "invisible",
                )}>
                    <span className="font-semibold text-sm overflow-hidden text-ellipsis">
                        {user?.username}
                    </span>

                    <span className="text-sm text-muted-fg overflow-hidden text-ellipsis">
                        {user?.role_display}
                    </span>
                </div>
            </div>

            <ChevronsUpDownIcon size={18} className={cn(
                "text-muted-fg",
                "transition-[visibility] duration-200",
                sidebarIsClosed && "invisible"
            )} />
        </button>
    );
}
