"use client";

import { FunnelIcon, ChevronDownIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default function Filters({ filtersData }) {
    const { filtersList, filtering } = filtersData;

    return (
        <DropdownMenu>
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
