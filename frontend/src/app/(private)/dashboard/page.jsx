"use client";

import { useRouter } from "next/navigation";

import { logoutAction } from "@/actions/authActions";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();

        router.refresh();
    };

    return (
        <div className="flex flex-col gap-5">
            <h1>DashBoard Page</h1>

            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
