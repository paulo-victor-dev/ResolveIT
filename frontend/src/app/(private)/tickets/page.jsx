"use client";

import { Ticket, Plus } from "lucide-react";

import PageLayout from "@/components/layout/pageLayout";

export default function Tickets() {

    const pageConfig = {
        page: {
            title: "Tickets",
            subTitle: "Gerencie e acompanhe os chamados de suporte",
            icon: <Ticket />,
        },

        button: {
            text: "Novo Ticket",
            icon: <Plus />,
        },
    };
    
    return (
        <PageLayout pageConfig={pageConfig}>
            <div className="w-full p-4">
    
            </div>
        </PageLayout>
    );
}
