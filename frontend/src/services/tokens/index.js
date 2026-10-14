import "server-only";

import { cookies } from "next/headers";

import { baseRequest } from "../http/baseRequest";
import { ENDPOINTS } from "../http/endpoints";
import { clearSession, saveSession } from "../session";
import { RefreshTokenError } from "../http/requestErrors";

const refreshPromises = new Map();

export const getTokensData = (session) => {
    const now = Date.now();

    return {
        accessTokenData: {
            token: session.access,
            expiresIn: session.access_expires_in,
            expiresAt: now + session.access_expires_in * 1000,
        },

        refreshTokenData: {
            token: session.refresh,
            expiresIn: session.refresh_expires_in,
            expiresAt: now + session.refresh_expires_in * 1000,
        },
    };
};

export const getAccessToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("access_token")?.value;
};

export const getRefreshToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("refresh_token")?.value;
};

export const refreshAccessToken = async () => {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        await clearSession();

        throw new RefreshTokenError(401, {
            detail: "Refresh Token ausente.",
        });
    }

    const existingRefresh = refreshPromises.get(refreshToken);

    if (existingRefresh) return existingRefresh;

    const refreshPromise = (async () => {
        try {
            const response = await baseRequest(ENDPOINTS.auth.refresh, {
                method: "POST",
                body: {
                    refresh: refreshToken,
                },
            });

            await saveSession(response);

            return response.access;
        } catch (error) {
            await clearSession();

            throw new RefreshTokenError(500, {
                detail: "Erro ao renovar a sessão.",
            });
        }
    })();

    refreshPromises.set(refreshToken, refreshPromise);

    try {
        return await refreshPromise;
    } finally {
        if (refreshPromises.get(refreshToken) === refreshPromise) {
            refreshPromises.delete(refreshToken);
        }
    }
};
