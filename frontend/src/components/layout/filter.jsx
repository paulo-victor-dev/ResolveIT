import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filter({ title, icon, items, paramName, setFilter }) {
    return (
        <Select 
            items={items}
            onValueChange={value => setFilter(paramName, value)}
        >
            <SelectTrigger className="cursor-pointer">

                {icon}
                {`${title}: `}
                <SelectValue />


            </SelectTrigger>

            <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem 
                            key={item.value} 
                            value={item.value}
                            className="cursor-pointer"
                        >
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
