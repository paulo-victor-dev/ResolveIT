"use client";

import { useQueryParams } from "@/hooks/useQueryParams";

import { usersCrud, usersPageConfig } from "./page.config";
import { columns } from "./table.config";

import PageLayout from "@/components/layout/pageLayout";

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
            columns,
            data: data?.results ?? [],
            isFetching: isFetching
        }}
    />;
}
