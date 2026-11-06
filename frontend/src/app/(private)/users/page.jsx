"use client";

import { UsersIcon, UserRoundPlusIcon } from "lucide-react";

import { useGetPageConfig } from "@/hooks/useGetPageConfig";

import { ENDPOINTS } from "@/services/http/endpoints";

import { dataFieldsConfig } from "./configs/dataFields-config";
import { filtersFieldsConfig } from "./configs/filtersFields-config";
import { schemaConfig } from "./configs/schema-config";

import PageLayout from "@/components/layout/PageLayout";

export default function Users() {
    const { crud, params, page } = useGetPageConfig({
        endpoint: ENDPOINTS.users,
        resource: "users",

        title: "Usuários",
        subTitle: "Gerencie os usuários, suas permissões e funções de acesso ao sistema.",
        icon: <UsersIcon />,
        searchPlaceholder: "Buscar usuários...",
        modalTitleSufix: "usuário",

        btnText: "Novo usuário",
        btnIcon: <UserRoundPlusIcon />,
        btnFn: null
    });

    const { data, isFetching } = crud.useList(params.inListQuery);

    return <PageLayout 
        pageConfig={{ ...page }}

        queryConfig={{
            data,
            isFetching,
            params,
            crud
        }}

        componentConfig={{
            dataFields: dataFieldsConfig,
            filtersFields: filtersFieldsConfig,
            formSchema: schemaConfig,
        }}
    />;
}
