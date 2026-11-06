"use client";

import { Controller } from "react-hook-form";

import { 
    Field, 
    FieldError, 
    FieldGroup, 
    FieldLabel 
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

export default function FormFields({ fieldsList, form }) {
    return (
        <>
            {fieldsList.map((val, idx) => (
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
        </>
    );
}
