import { useState } from "react";

export const useQueryParams = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    
    const setFilter = (paramName, value) => {
        setFilters(prev => ({
            ...prev,
            [paramName]: value,
        }));
    };

    return {
        search, setSearch, 
        page, setPage,
        filters, setFilter,
    };
};
