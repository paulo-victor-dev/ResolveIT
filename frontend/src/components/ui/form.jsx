"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";
import { Spinner } from "./spinner";

export default function Form({
    inputs = [],
    schema,
    onSubmit,
    subBtnText = "Enviar",
}) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: Object.fromEntries(inputs.map((i) => [i.name, ""])),
    });
    const isLoading = form.formState.isSubmitting;

    return (
        <form
            onSubmit={form.handleSubmit((values) => onSubmit(values, form))}
            noValidate
            className="w-full h-full flex flex-col gap-5"
        >
            <div className="w-full text-center text-destructive mt-5">
                {form.formState.errors.root && (
                    <FieldError>
                        {form.formState.errors.root.message}
                    </FieldError>
                )}
            </div>

            {inputs.map((val, idx) => (
                <FieldGroup key={idx}>
                    <Controller
                        name={val.name}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={val.name}>
                                    {val.label}
                                </FieldLabel>

                                <Input
                                    {...field}
                                    id={val.name}
                                    type={val.type}
                                    autoComplete={val.autoComplete}
                                    aria-invalid={fieldState.invalid}
                                    placeholder={val.placeholder}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            ))}

            <Button type="submit" disabled={isLoading}>
                {subBtnText}
                {isLoading && <Spinner />}
            </Button>
        </form>
    );
}
