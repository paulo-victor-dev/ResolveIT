"use client";

import { useQueryParams } from "@/hooks/useQueryParams";

import { usersCrud, usersPageConfig } from "./page-config";
import { tableColumns } from "./table-columns";

import PageLayout from "@/components/layout/PageLayout";

export default function Users() {
    const { 
        search, 
        pagination, 
        filtering,
        ordering
    } = useQueryParams();

    const { data, isFetching } = usersCrud.useList({ 
        search: search.searchValue, 
        page: pagination.page, 
        ...filtering.filters,
        ordering: ordering.orderings,
    });

    return <PageLayout 
        pageConfig={usersPageConfig}

        paramsConfig={{
            search, 
            pagination, 
            filtering,
            ordering
        }}

        tableConfig={{
            columns: tableColumns,
            data,
            isFetching: isFetching
        }}
    />;
}
