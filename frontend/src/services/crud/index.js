"use client";

import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export const createCrud = (resource, endpoint) => {
    return {
        useList: (params = {}, queryOptions = {}) =>
            useApiQuery({
                queryKey: [resource, "list", params],
                endpoint,
                params,
                ...queryOptions,
            }),

        useDetail: (id, queryOptions = {}) =>
            useApiQuery({
                queryKey: [resource, id, "detail"],
                endpoint: `${endpoint}${id}/`,
                ...queryOptions,
            }),

        useCreate: (mutationOptions = {}) => {
            const mutation = useApiMutation({
                mutationKey: [resource, "create"],
                endpoint,
                method: "POST",
                invalidateQueryKey: [resource],
                ...mutationOptions,
            });

            return {
                ...mutation,

                create: (body) =>
                    mutation.mutateAsync({
                        body,
                    }),
            };
        },

        usePatch: (mutationOptions = {}) => {
            const mutation = useApiMutation({
                mutationKey: [resource, "patch"],
                endpoint,
                method: "PATCH",
                invalidateQueryKey: [resource],
                ...mutationOptions,
            });

            return {
                ...mutation,

                patch: (id, body) =>
                    mutation.mutateAsync({
                        id,
                        body,
                    }),
            };
        },

        usePut: (mutationOptions = {}) => {
            const mutation = useApiMutation({
                mutationKey: [resource, "put"],
                endpoint,
                method: "PUT",
                invalidateQueryKey: [resource],
                ...mutationOptions,
            });

            return {
                ...mutation,

                put: (id, body) =>
                    mutation.mutateAsync({
                        id,
                        body,
                    }),
            };
        },

        useRemove: (mutationOptions = {}) => {
            const mutation = useApiMutation({
                mutationKey: [resource, "delete"],
                endpoint,
                method: "DELETE",
                invalidateQueryKey: [resource],
                ...mutationOptions,
            });

            return {
                ...mutation,

                remove: (id) => mutation.mutateAsync({ id }),
            };
        },
    };
};
