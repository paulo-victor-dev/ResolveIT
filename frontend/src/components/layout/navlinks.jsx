import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Ticket } from "lucide-react";

import { cn } from "cn";

export default function Navlinks({ sidebarState }) {
    const { isClosed } = sidebarState;
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
                    "w-full h-10 flex items-center pl-3",
                    "rounded-md overflow-hidden",
                    "transition-colors",
                    "hover:bg-primary hover:text-primary-foreground",
                    pathname === val.href && ("bg-primary text-primary-foreground") 
                )}>
                    <Link href={val.href} className={cn(
                        "w-full h-full flex items-center gap-3",
                        "text-sm",
                    )}>
                        <span>{val.icon}</span>

                        <span>{val.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
