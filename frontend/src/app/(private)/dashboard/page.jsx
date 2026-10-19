"use client";

import { LayoutDashboard, FileSpreadsheet } from "lucide-react";

import PageLayout from "@/components/layout/pageLayout";

export default function Dashboard() {
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
            <h1>Dashboard children</h1>
        </PageLayout>
    );
}
