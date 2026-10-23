import { Users, Plus, SquareActivity } from "lucide-react";

import { createCrud } from "@/services/crud";
import { ENDPOINTS } from "@/services/http/endpoints";

export const pageCrud = createCrud("users", ENDPOINTS.users);

export const pageConfig = {
    page: {
        title: "Usuários",
        subTitle: "Gerencie os usuários do sistema",
        icon: <Users />,
    },

    button: {
        text: "Criar usuário",
        icon: <Plus />,
    },
};

export const pageFilters = [
    {
        title: "Status", icon: <SquareActivity />, paramName: "is_active", items: [
            {label: "Ativa", value: true},
            {label: "Inativa", value: false},
        ]
    },
];


