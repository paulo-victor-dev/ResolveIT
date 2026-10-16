import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Ticket } from "lucide-react";

import { cn } from "cn";

export default function SidebarLinks({ sidebarIsClosed }) {
    const pathname = usePathname()

    const links = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
        },

        {
            href: "/tickets",
            label: "Tickets",
            icon: <Ticket size={20} />,
        },
    ];
    
    return (
        <ul className="h-full flex flex-col gap-2">
            {links.map((val, idx) => (
                <li key={idx} className={cn(
                    "w-full h-9 flex items-center",
                    "rounded-md pl-2",
                    "overflow-hidden",
                    "hover:bg-primary hover:text-primary-foreground",
                    "transition duration-200",
                    pathname === val.href && ("bg-primary text-primary-foreground") 
                )}>
                    <Link href={val.href} className={cn(
                        "w-full h-full flex items-center gap-2",
                        "text-sm",
                        "overflow-hidden"
                    )}>
                        <span className="">
                            {val.icon}
                        </span>

                        <span className={cn(
                            "opacity-100",
                            "transition-[visibility, opacity] duration-[250ms, 250ms]",
                            sidebarIsClosed ? "invisible opacity-0" : ""
                        )}>
                            {val.label}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
