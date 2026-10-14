"use client";

import { useQuery } from "@tanstack/react-query";

import { queryAction } from "@/actions/apiActions";

export const useApiQuery = ({
    queryKey,
    endpoint,
    params = {},
    ...queryOptions
}) => {
    const queryParams = new URLSearchParams(params).toString();

    return useQuery({
        queryKey,

        queryFn: () =>
            queryAction(
                (endpoint = queryParams
                    ? `${endpoint}?${queryParams}`
                    : endpoint),
            ),

        staleTime: 60_000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,

        ...queryOptions,
    });
};
