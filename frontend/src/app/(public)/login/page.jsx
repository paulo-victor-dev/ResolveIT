"use client";

import { cn } from "cn";

import { useRouter } from "next/navigation";

import { loginAction } from "@/actions/authActions";
import { loginSchema } from "@/schemas/loginSchema";

import { loginPageConfig } from "./page-config";

import Form from "@/components/layout/Form";

export default function Login() {
    const router = useRouter();

    const handleLogin = async (values, form) => {
        try {
            await loginAction(values);
            router.refresh();

        } catch (error) {
            form.setError("root", {
                message: error.message,
            });

            loginPageConfig.formFieldsList.forEach((input) => form.setError(input.name));
        }
    };

    return (
        <div className={cn(
            "w-100 flex flex-col items-center justify-center",
            "p-6 rounded-xl",
            "bg-surface-bg"
        )}>
            <h1 className="text-xl font-semibold uppercase">Login</h1>

            <Form 
                fieldsList={loginPageConfig.formFieldsList} 
                fieldsSchema={loginSchema} 
                onSubmit={handleLogin} 
                subBtnText="Entrar"
            />
        </div>
    );
}
