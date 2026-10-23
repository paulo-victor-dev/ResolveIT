import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Ticket, Users } from "lucide-react";

import { cn } from "cn";

import { useAuthContext } from "@/contexts/AuthContext";

export default function Navlinks() {
    const pathname = usePathname()

    const { user } = useAuthContext();   

    const navLinks = () => {
        const linksList = [
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
        ] 

        if (user?.role === "admin") {
            linksList.push({
                href: "/users",
                label: "Usuários",
                icon: <Users size={20} />
            });
        };

        return linksList;
    };  
    
    return (
        <ul className="h-full flex flex-col gap-2">
            {navLinks().map((val, idx) => (
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
