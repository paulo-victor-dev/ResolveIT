"use client";

import { useState } from "react";

import { cn } from "cn";

import LogoArea from "./logo-area";
import SidebarLinks from "./sidebar-links";
import UserArea from "../UserArea";

export default function Sidebar() {
    const [isClosed, setIsClosed] = useState(false);

    return (
        <aside className={cn(
            "h-full shrink-0 flex flex-col gap-4 p-4 overflow-hidden",
            "transition-[width] duration-250",
            isClosed ? "w-19" : "w-75"
        )}>
            <LogoArea 
                sidebarState={{ isClosed, setIsClosed }}
            />

            <SidebarLinks />          

            <UserArea 
                sidebarIsClosed={isClosed} 
            />
        </aside>
    );
}
