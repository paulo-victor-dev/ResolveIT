"use client";

import Image from "next/image";

import { useState } from "react";

import { cn } from "cn";

import { PanelLeftClose, PanelRightClose } from "lucide-react";

import { Button } from "../ui/button";

import UserArea from "./userArea";
import SidebarLinks from "./sidebarLinks";

export default function Sidebar() {
    const [isClosed, setIsClosed] = useState(false);

    return (
        <aside className={cn(
            "h-full flex flex-col gap-4 p-4 overflow-hidden",
            "transition-[width] duration-250",
            isClosed ? "w-17.5" : "w-72"
        )}>
            <div className={cn(
                "h-16 flex items-center justify-between",
                isClosed ? "justify-center " : ""
            )}>
                <Image
                    src="/logo.png"
                    alt="logo-resolvelit"
                    width={150}
                    height={80}
                    priority
                    className={cn(
                        "shrink-0 transition-transform duration-300",
                        isClosed ? "-translate-x-full" : "translate-x-0"
                    )}
                />

                <Button
                    variant="outline"
                    onClick={() => setIsClosed(prev => !prev)} 
                    className={cn(
                        "transition duration-200",
                        "hover:bg-muted-bg cursor-pointer",
                        isClosed ? "mr-9" : ""
                    )}
                >
                    {isClosed ? <PanelRightClose size={20} className="shrink-0"/> : <PanelLeftClose size={20} />}
                </Button>
            </div>

            <SidebarLinks sidebarIsClosed={isClosed} />          

            <UserArea sidebarIsClosed={isClosed} />
        </aside>
    );
}
