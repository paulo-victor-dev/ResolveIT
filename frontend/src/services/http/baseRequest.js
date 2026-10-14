import "server-only";

import { RequestError } from "./requestErrors";

export const baseRequest = async (
    endpoint,
    { method = "GET", headers = {}, body } = {},
) => {
    const requestHeaders = {
        Accept: "application/json",
        ...headers,
    };

    const options = {
        method,
        headers: requestHeaders,
    };

    if (body !== undefined && !["GET", "HEAD"].includes(method)) {
        requestHeaders["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    const response = await fetch(
        new URL(endpoint, process.env.API_BASE_URL),
        options,
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new RequestError(response.status, data);
    }

    return data;
};
