"use client";

import { LayoutDashboard, FileSpreadsheet } from "lucide-react";

import { useRouter } from "next/navigation";

import PageLayout from "@/components/layout/pageLayout";

export default function Dashboard() {
    const router = useRouter();

    const pageConfig = {
        page: {
            title: "Dashboard",
            icon: <LayoutDashboard />,
        },

        button: {
            text: "Gerar Relatório",
            icon: <FileSpreadsheet />,
        },
    }

    return (
    
        <PageLayout pageConfig={pageConfig}>
            <h1>DashBoard children</h1>
        </PageLayout>
    );
}
