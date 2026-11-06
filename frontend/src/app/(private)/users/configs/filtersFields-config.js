
export const filtersFieldsConfig = [
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
];
