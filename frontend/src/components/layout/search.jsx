"use client";

import { useState, useEffect } from "react";

import { cn } from "cn";

import { SearchIcon, XIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

export default function Search({ 
    searchSetState, 
    paginationSetState, 
    placeholder
}) {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            searchSetState(value);
            paginationSetState(1);
        }, 500);

        return () => clearTimeout(timeout); 
    }, [value]);

    return (
        <InputGroup className="w-80 group">
            <InputGroupInput
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
            />

            <InputGroupAddon
                className="group-focus-within:text-page-fg"
            >
                <SearchIcon />
            </InputGroupAddon>

            <InputGroupAddon align="inline-end" 
                className={cn(
                    "cursor-pointer",
                    "transition-colors",
                    "hover:text-page-fg",
                )}
                onClick={() => setValue("")}
            >
                {value && <XIcon />}
            </InputGroupAddon>
        </InputGroup>
    );
}
