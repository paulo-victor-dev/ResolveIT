"use client";

import { useMemo } from "react";

import { useQueryParams } from "@/hooks/useQueryParams";

import { createCrud } from "@/services/crud";

export const useGetPageConfig = ({
    //Crud
    endpoint, 
    resource,

    // Page
    title, 
    subTitle, 
    icon,
    searchPlaceholder,
    modalTitleSufix,

    // Button
    btnText,
    btnIcon,
    btnFn = null,
}) => {
    const { 
        search, 
        pagination, 
        filtering,
        ordering
    } = useQueryParams();

    const crud = useMemo(
        () => createCrud(resource, endpoint), 
        [resource, endpoint]
    );

    return {
        crud,

        params: {
            raw: {
                search, 
                pagination, 
                filtering,
                ordering
            },

            inListQuery: {
                ...filtering.filters,
                search: search.searchValue, 
                page: pagination.page, 
                ordering: ordering.orderings,   
            }
        },

        page: {
            title, 
            subTitle, 
            icon,
            searchPlaceholder,
            modalTitleSufix,

            button: {
                text: btnText,
                icon: btnIcon,
                onClick: btnFn
            }
        },
    };
};
