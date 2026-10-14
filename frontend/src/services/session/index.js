import "server-only";

import { cookies } from "next/headers";

import { getTokensData } from "../tokens";

const cookiesOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};

export const saveSession = async (session) => {
    const { accessTokenData, refreshTokenData } = getTokensData(session);

    if (!accessTokenData.token || !refreshTokenData.token) {
        throw new Error("Tokens não recebidos");
    }

    // Considerar expiração dos tokens a partir do maxAge.
    // Se estiver vazio nos Cookies do navaegador, está expirado.
    const cookieStore = await cookies();

    // Access Token Cookie
    cookieStore.set("access_token", accessTokenData.token, {
        maxAge: accessTokenData.expiresIn,
        ...cookiesOptions,
    });

    // Refresh Token Cookie
    cookieStore.set("refresh_token", refreshTokenData.token, {
        maxAge: refreshTokenData.expiresIn,
        ...cookiesOptions,
    });

    // Current User Cookie
    if (session?.user) {
        cookieStore.set(
            "user",
            encodeURIComponent(JSON.stringify(session.user)),
            {
                maxAge: refreshTokenData.expiresIn,
                ...cookiesOptions,
            },
        );
    }
};

export const clearSession = async (deleteUser = false) => {
    const cookieStore = await cookies();

    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    if (deleteUser) cookieStore.delete("user");
};

export const getCurrentUser = async () => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) return null;

    return JSON.parse(decodeURIComponent(userCookie.value));
};
