import { useState, useEffect } from "react";

import Image from "next/image";

import { cn } from "cn";

import { PanelLeftClose, PanelRightClose } from "lucide-react";

export default function LogoArea({ sidebarState, isDark }) {
    const { isClosed, setIsClosed } = sidebarState;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={cn(
            "w-full h-14 shrink-0 flex items-center relative",
            "overflow-hidden",
        )}>
            {mounted && (
                <Image
                    src={isDark ? "/logo-light.png" : "/logo-dark.png"}
                    alt="logo-resolvelit"
                    width={200}
                    height={200}
                    priority
                    className={cn(
                        "-ml-2",
                        "transition-transform duration-300",
                        isClosed ? "-translate-x-20" : "translate-x-0",
                    )}
                />
            )}

            <button
                onClick={() => setIsClosed(prev => !prev)}
                className={cn(
                    "w-11 right-0 flex items-center justify-center p-2.5",
                    "absolute",
                    "border rounded-md cursor-pointer",
                    "bg-surface-bg",
                    "transition-colors",
                    "hover:bg-muted-bg",
                )}
            >
                {isClosed 
                    ? <PanelRightClose size={20} /> 
                    : <PanelLeftClose size={20} />
                }
            </button>
        </div>  
    );
}
