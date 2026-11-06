import { z } from "zod";

export const schemaConfig = z.object({
    username: z
        .string("Digite um e-mail válido")
        .min(1, "Nome de usuário não pode estar vazio")
        .max(100, "Limite de 100 caracteres"), 

    email: z.email("Digite um e-mail válido"),
});
