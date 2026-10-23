"use client";

import { useState, useEffect } from "react";

import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"

export default function Search({ paramsState, placeholder }) {
    const { setSearch, setPage } = paramsState;
    const [value, setValue] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(value);
            setPage(1);
        }, 500);

        return () => clearTimeout(timeout); 
    }, [value]);

    return (
        <InputGroup className="w-100">
            <InputGroupInput
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
            />

            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
        </InputGroup>
    );
}
