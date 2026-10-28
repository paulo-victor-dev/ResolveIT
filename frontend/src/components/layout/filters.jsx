"use client";

import { useState } from "react";

import { FunnelIcon, ChevronDownIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";

export default function Filters({ filtersData }) {
    const { filtersList, filtering } = filtersData;

    const [open, setOpen] = useState(false);
    const [filtersDisplay, setFiltersDisplay] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        filtering.setFilters(data);
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger render={
                <Button variant="outline">
                    <FunnelIcon />
                    <span>Filtros</span>
                    <ChevronDownIcon />
                </Button>
            } />

            <DropdownMenuContent className="w-60">
                <div className="w-full flex flex-col p-4">
                    {filtersList.map((filter, idx) => (
                        <RadioGroup 
                            key={filter.groupLabel} 
                            name={filter.paramName}
                            value={filtering.filters[filter.paramName] ?? ""}
                            onValueChange={value => {
                                filtering.setSingleFilter(filter.paramName, value)
                            }}
                        >
                            <span className="text-sm font-bold">{filter.groupLabel}</span>

                            <Label 
                                htmlFor={`${filter.groupLabel}-all`} 
                                className="cursor-pointer"
                            >
                                <RadioGroupItem 
                                    id={`${filter.groupLabel}-all`} 
                                    value={""}
                                />
                                <span>Tudo</span>
                            </Label>

                            {filter.groupItems.map(item => (
                                <Label 
                                    key={`${filter.groupLabel}-${item.label}`}
                                    htmlFor={`${filter.groupLabel}-${item.label}`} 
                                    className="cursor-pointer"
                                >
                                    <RadioGroupItem 
                                        id={`${filter.groupLabel}-${item.label}`} 
                                        value={item.value}
                                    />
                                    <span>{item.label}</span>
                                </Label>
                            ))}

                            {idx !== filtersList.length - 1 && (
                                <DropdownMenuSeparator className="mt-2 mb-4" />
                            )}
                        </RadioGroup>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
