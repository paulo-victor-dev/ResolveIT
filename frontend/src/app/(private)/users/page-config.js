import { UsersIcon, UserRoundPlusIcon } from "lucide-react";

import { createCrud } from "@/services/crud";
import { ENDPOINTS } from "@/services/http/endpoints";

export const usersCrud = createCrud("users", ENDPOINTS.users);

export const usersPageConfig = {
    page: {
        title: "Usuários",
        subTitle: "Gerencie os usuários do sistema",
        icon: <UsersIcon />,
        searchPlaceholder: "Buscar usuários",
        filterChoiceType: "",

        button: {
            text: "Novo usuário",
            icon: <UserRoundPlusIcon />
        },
    },

    filtersList: [
        {
            groupLabel: "Status da conta", paramName: "is_active",
            groupItems: [
                {label: "Ativa", value: "true"},
                {label: "Inativa", value: "false"},
            ]
        },

        {
            groupLabel: "Função", paramName: "role",
            groupItems: [
                {label: "Administrador", value: "admin"},
                {label: "Técnico", value: "technician"},
                {label: "Usuário comum", value: "common"},
            ]
        },
    ],

    formInputsList: [
        {},
    ],
};
