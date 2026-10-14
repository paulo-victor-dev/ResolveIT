export class RequestError extends Error {
    constructor(status, data) {
        const message =
            data?.detail ||
            data?.message ||
            JSON.stringify(data) ||
            "Erro na requisição";

        super(message);

        this.name = "RequestError";
        this.status = status;
        this.data = data;
    }
}

export class RefreshTokenError extends RequestError {
    constructor(status, data) {
        super(status, data);

        this.name = "RefreshTokenError";
    }
}
