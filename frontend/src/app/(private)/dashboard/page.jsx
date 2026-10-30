"use client";

import { cn } from "cn";

import { dashboardPageConfig } from "./page-config";

import PageLayout from "@/components/layout/PageLayout";

import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
    return <PageLayout 
        pageConfig={dashboardPageConfig}
        type="dashboard"
    >
        <div className={cn(
            "grid grid-cols-4 gap-4",
        )}>
            {dashboardPageConfig.cards.map((val, idx) => (
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
    </PageLayout>;
}
