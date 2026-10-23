"use client";

import { useRouter } from "next/navigation";

import { loginAction } from "@/actions/authActions";
import { loginSchema } from "@/schemas/loginSchema";

import Form from "@/components/ui/form";

export default function Login() {
    const router = useRouter();

    const inputs = [
        {
            label: "E-mail",
            name: "email",
            type: "email",
            autoComplete: "email",
            placeholder: "Seu e-mail...",
        },

        {
            label: "Senha",
            name: "password",
            type: "password",
            autoComplete: "current-password",
            placeholder: "Sua senha...",
        },
    ];

    const handleLogin = async (values, form) => {
        try {
            await loginAction(values);
            router.push("/dashboard");

        } catch (error) {
            form.setError("root", {
                message: error.message,
            });

            inputs.forEach((input) => form.setError(input.name));
        }
    };

    return (
        <div className="w-100 flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold uppercase">Login</h1>

            <Form inputs={inputs} schema={loginSchema} onSubmit={handleLogin} />
        </div>
    );
}
