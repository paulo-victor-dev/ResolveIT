"use client";

import { cn } from "cn";

import { 
    LayoutDashboard, 
    FileSpreadsheet,
    Ticket,
    CircleAlert,
    MessageSquareReply,
    MessageCircleCheck
} from "lucide-react";

import PageLayout from "@/components/layout/pageLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
    const pageConfig = {
        page: {
            title: "Dashboard",
            subTitle: "Visão geral dos chamados",
            icon: <LayoutDashboard />,
        },

        button: {
            text: "Gerar Relatório",
            icon: <FileSpreadsheet />,
        },
    }

    const cards = [
        {
            title: "Total de tickets",
            data: 128,
            periodDesc: "em relação ao mês anterior",
            
            icon: {
                i: <Ticket />,
                bg: "bg-info-bg",
                fg: "text-info-fg",
                border: "border border-info-fg",
            },
        },

        {
            title: "Tempo de resposta",
            data: "20/hr",
            periodDesc: "em relação ao mês anterior",
            
            icon: {
                i: <MessageSquareReply />,
                bg: "bg-purple-bg",
                fg: "text-purple-fg",
                border: "border border-purple-fg",
            },
        },

        {
            title: "Atendidos",
            data: "30",
            periodDesc: "em relação ao mês anterior",
            
            icon: {
                i: <MessageCircleCheck />,
                bg: "bg-success-bg",
                fg: "text-success-fg",
                border: "border border-success-fg",
            },
        },

        {
            title: "Não respondidos",
            data: "2",
            periodDesc: "em relação ao mês anterior",
            
            icon: {
                i: <CircleAlert />,
                bg: "bg-danger-bg",
                fg: "text-danger-fg",
                border: "border border-danger-fg",
            },
        },
    ];

    return (
        <PageLayout pageConfig={pageConfig}>
            {/* Cards area */}
            <div className={cn(
                "grid grid-cols-4 gap-4",
            )}>
                {cards.map((val, idx) => (
                    <Card key={idx} className="bg-page-bg">
                        <CardContent>
                            <div className="flex gap-3">
                                <span className={cn(
                                    "size-14 flex items-center justify-center",
                                    "rounded-full",
                                    val.icon.border, val.icon.bg, val.icon.fg 
                                )}>
                                    {val.icon.i}
                                </span>

                                <div className="flex flex-col gap-2">
                                    <span className="text-sm">{val.title}</span>

                                    <span className="font-bold text-2xl">{val?.data}</span>

                                    <span className="text-xs opacity-60">{val.periodDesc}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="w-full h-full grid grid-cols-2 gap-4">
                <div className="bg-page-bg border rounded-xl p-4">
                    <h1>Gráfico 1 em Torres</h1>
                </div>

                <div className="bg-page-bg border rounded-xl p-4">
                    <h1>Gráfico 2 em Pizza</h1>
                </div>
            </div>
        </PageLayout>
    );
}
