
export const dataFieldsConfig = [
    {
        label: "ID",
        name: "id",
        accessor: "id",
        type: "text",
        autoComplete: "id",
        placeholder: "",
        readOnly: true
    },

    {
        label: "Nome usuário",
        name: "username",
        accessor: "username",
        type: "text",
        autoComplete: "username",
        placeholder: "Nome de usuário...",
        readOnly: false,
        formType: "all"
    },

    {
        label: "E-mail",
        name: "email",
        accessor: "email",
        type: "email",
        autoComplete: "email",
        placeholder: "E-mail...",
        readOnly: false,
        formType: "all"
    },

    {
        label: "Senha",
        name: "password",
        accessor: "password",
        type: "password",
        autoComplete: "password",
        placeholder: "Senha...",
        readOnly: false,
        formType: "all",
        tableShow: false
    },

    {
        label: "Função",
        name: "role",
        accessor: "role_display",
        type: "select",
        autoComplete: "role",
        placeholder: "",
        readOnly: false,
        formType: "all",

        items: [
            { label: "Administrador", value: "admin" },
            { label: "Técnico", value: "technician" },
            { label: "Usuário", value: "common" },
        ]
    },

    {
        label: "Status conta",
        name: "is_active",
        accessor: "is_active",
        type: "select",
        autoComplete: "is_active",
        placeholder: "",
        readOnly: false,
        formType: "all",

        items: [
            { label: "Ativa", value: "true" },
            { label: "Inativa", value: "false" },
        ]
    },

    {
        label: "Data cadastro",
        name: "date_joined",
        accessor: "date_joined",
        type: "text",
        autoComplete: "date_joined",
        placeholder: "",
        readOnly: true,
    },

    {
        label: "Último acesso",
        name: "last_login",
        accessor: "last_login",
        type: "text",
        autoComplete: "last_login",
        placeholder: "",
        readOnly: true,
    },
];

