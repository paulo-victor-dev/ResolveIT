"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mutationAction } from "@/actions/apiActions";

export const useApiMutation = ({
    mutationKey,
    endpoint,
    method = "POST",
    invalidateQueryKey,
    ...mutationOptions
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey,

        mutationFn: (variables) => {
            return mutationAction(
                (endpoint = variables.id
                    ? `${endpoint}${variables.id}/`
                    : endpoint),
                { method, body: variables.body },
            );
        },

        onSuccess: async () => {
            if (!invalidateQueryKey) return;

            await queryClient.invalidateQueries({
                queryKey: invalidateQueryKey,
            });
        },

        ...mutationOptions,
    });
};
