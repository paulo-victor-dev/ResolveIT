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
            "w-full h-17.5 flex items-center relative",
        )}>
            <div className={cn(
                "w-40 h-full relative",
                "overflow-hidden",
                "pointer-events-none",
            )}>
                {mounted && (
                    <Image
                        src={isDark ? "/logo-light.png" : "/logo-dark.png"}
                        alt="logo-resolvelit"
                        fill
                        priority
                        className={cn(
                            "object-cover",
                            "transition-transform duration-300",
                            isClosed ? "-translate-x-20" : "translate-x-0",
                        )}
                    />
                )}
            </div>

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
