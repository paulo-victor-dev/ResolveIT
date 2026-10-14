import "server-only";

import { getAccessToken, refreshAccessToken } from "../tokens";
import { baseRequest } from "./baseRequest";

export const privateRequest = async (
    endpoint,
    { method = "GET", headers = {}, body } = {},
) => {
    let accessToken = await getAccessToken();

    if (!accessToken) {
        accessToken = await refreshAccessToken();
    }

    const requestHeaders = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
    };

    return baseRequest(endpoint, {
        method,
        headers: requestHeaders,
        body,
    });
};
