"use server";

import { baseRequest } from "@/services/http/baseRequest";
import { ENDPOINTS } from "@/services/http/endpoints";

import { saveSession, clearSession, getCurrentUser } from "@/services/session";

import { getRefreshToken } from "@/services/tokens";

export const loginAction = async (credentials) => {
    const response = await baseRequest(ENDPOINTS.auth.login, {
        method: "POST",
        body: credentials,
    });

    await saveSession(response);
};

export const logoutAction = async () => {
    const refreshToken = await getRefreshToken();

    try {
        await baseRequest(ENDPOINTS.auth.logout, {
            method: "POST",
            body: { refresh: refreshToken },
        });
    } finally {
        await clearSession(true);
    }
};

export const getCurrentUserAction = async () => {
    return await getCurrentUser();
};
