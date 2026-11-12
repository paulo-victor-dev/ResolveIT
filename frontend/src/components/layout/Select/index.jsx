import {
  Select as ST,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

export default function Select({ fieldData, formField }) {
    const selectedItem = fieldData.items.find(
        item => item.value === String(formField.value)
    );
    
    return (
        <ST
            items={fieldData.items}
            name={fieldData.name} 
            value={String(formField.value ?? "")}
            onValueChange={formField.onChange}
        >
            <SelectTrigger
                id={fieldData.name}
                onBlur={formField.onBlur}
                ref={formField.ref}
                className="cursor-pointer"
            >
                <SelectValue 
                    placeholder={fieldData.placeholder || "Selecione..."}
                >
                    {selectedItem?.label}
                </SelectValue>
            </SelectTrigger>

            <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                    {fieldData.items.map(item => (
                        <SelectItem
                            key={item.value}
                            name={fieldData.name}
                            value={item.value}
                            className="cursor-pointer"
                        >
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </ST>
    );
}
