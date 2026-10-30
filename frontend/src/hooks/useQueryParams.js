import { useState } from "react";

export const useQueryParams = () => {
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [orderings, setOrderings] = useState([]);
    
    const setSingleFilter = (paramName, value) => {
        setFilters(prev => ({
            ...prev,
            [paramName]: value,
        }));
    };

    const clearSingleFilter = (paramName) => {
        setFilters(prev => {
            const updated = { ...prev };
            delete updated[paramName];
            return updated;
        });
    };

    const clearFilters = () => {
        setFilters({});
    };

    const handleSetOrderings = (field) => {
        if (field === "action") return;

        setOrderings((current) => {
            const existing = current.find(
                item => item.replace("-", "") === field
            );

            if (!existing) {
                return [...current, field];
            }

            return current.map(item =>
                item.replace("-", "") === field
                    ? item.startsWith("-")
                        ? field
                        : `-${field}`
                    : item
            );
        });
    };

    const clearOrderings = () => {
        setOrderings([]);
    };

    return {
        search: { searchValue, setSearchValue },
        pagination: { page, setPage },
        filtering: { filters, setFilters, setSingleFilter, clearSingleFilter, clearFilters },
        ordering: { orderings, handleSetOrderings, clearOrderings },
    };
};
