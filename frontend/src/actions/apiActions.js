"use server";

import { redirect } from "next/navigation";

import { privateRequest } from "@/services/http/privateRequest";
import { RefreshTokenError } from "@/services/http/requestErrors";

const handleRequest = async (endpoint, options = {}) => {
    try {
        return await privateRequest(endpoint, options);
    } catch (error) {
        if (error instanceof RefreshTokenError) {
            redirect("/login");
        }

        throw error;
    }
};

export const mutationAction = async (
    endpoint,
    options = { method: "POST", body: undefined },
) => {
    return handleRequest(endpoint, options);
};

export const queryAction = async (endpoint) => {
    return handleRequest(endpoint);
};
