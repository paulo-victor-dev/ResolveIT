"use client";

import { Controller } from "react-hook-form";

import { 
    Field, 
    FieldError, 
    FieldGroup, 
    FieldLabel 
} from "@/components/ui/field";

import { handleSetInput, handleGetFieldsList } from "./form-utils";

export default function FormFields({ fieldsList, form, formType }) {
    const formFieldsList = handleGetFieldsList(fieldsList, formType);

    return (
        <>
            {formFieldsList.map((val, idx) => (
                <FieldGroup key={idx}>
                    <Controller
                        name={val.name}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={val.name}>
                                    {val.label}
                                </FieldLabel>

                                {handleSetInput(
                                    val,
                                    field,
                                    fieldState.invalid
                                )}

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
