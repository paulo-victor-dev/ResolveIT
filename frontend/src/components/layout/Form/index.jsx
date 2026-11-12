"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldError } from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import FormFields from "./form-fields";

export default function Form({ 
    id = "",
    formType = "all",
    fieldsList = [],
    fieldsSchema,
    defaultValues = {},
    onSubmit,
    subBtnText = ""
}) {
    const form = useForm({
        resolver: zodResolver(fieldsSchema),
        defaultValues: {
            ...Object.fromEntries(fieldsList.map((i) => [i.name, ""])),
            ...defaultValues,
        },
    });

    const isLoading = form.formState.isSubmitting;  

    return (
        <form
            id={id}
            onSubmit={form.handleSubmit(() => onSubmit(form))}
            noValidate
            className="w-full h-full flex flex-col gap-5"
        >
            {form.formState.errors.root && (
                <div className="w-full text-center text-destructive mt-5">
                    <FieldError>
                        {form.formState.errors.root.message}
                    </FieldError>
                </div>
            )}

            <FormFields fieldsList={fieldsList} form={form} formType={formType} />

            {subBtnText && (
                <Button type="submit" disabled={isLoading}>
                    {subBtnText}
                    {isLoading && <Spinner />}
                </Button>
            )}
        </form>
    );
}
