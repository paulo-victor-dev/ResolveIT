import { Input } from "@/components/ui/input";
import Select from "@/components/layout/Select";

export const handleSetInput = (fieldData, formField, ariaInvalid) => {
    if (fieldData.type === "select") {
        return <Select
            fieldData={fieldData}
            formField={formField}
        />;
    }      
    
    
    
    return <Input 
        {...formField}
        id={fieldData.name}
        type={fieldData.type}
        value={formField.value ?? ""}
        autoComplete={fieldData.autoComplete}
        aria-invalid={ariaInvalid}
        placeholder={fieldData.placeholder}
        disabled={fieldData.readOnly}
    />;
};

export const handleGetFieldsList = (fieldsList, formType) => {
    const fields = fieldsList.filter((val) => val.name !== "id");
    
    switch (formType) {
        case "create":
            return fields.filter(field => (
                field.formType === "create"
                || field.formType === "all"
            ));

        case "edit":
            return fields.filter(field => (
                field.formType === "edit"
                || field.formType === "all"
            ));

        default:
            return fields;
    }
}; 
