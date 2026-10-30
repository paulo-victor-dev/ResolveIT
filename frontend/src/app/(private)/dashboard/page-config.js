import { 
    LayoutDashboard, 
    FileSpreadsheet,
    Ticket,
    CircleAlert,
    MessageSquareReply,
    MessageCircleCheck
} from "lucide-react";

export const dashboardPageConfig = {
    page: {
        title: "Dashboard",
        subTitle: "Visão geral dos chamados",
        icon: <LayoutDashboard />,
    },

    cards: [
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
    ],
}