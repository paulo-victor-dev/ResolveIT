"use client";

import { useQueryParams } from "@/hooks/useQueryParams";

import { pageCrud, pageConfig, pageFilters } from "./page-config";

import PageLayout from "@/components/layout/pageLayout";
import Search from "@/components/layout/search";
import Filter from "@/components/layout/filter";

export default function Users() {
    const { 
        search, setSearch, 
        page, setPage, 
        filters, setFilter 
    } = useQueryParams();

    const { data, isFetching, error } = pageCrud.useList({ search, page, ...filters });
    
    return (
        <PageLayout pageConfig={pageConfig}>
            <div className="w-full flex items-center gap-4">
                <Search 
                    paramsState={{ setSearch, setPage }}
                    placeholder="Pesquisar usuários..."
                />

                {pageFilters.map((filter) => (
                    <Filter
                        key={filter.title}
                        title={filter.title}
                        icon={filter.icon}
                        items={filter.items}
                        paramName={filter.paramName}
                        setFilter={setFilter}
                    />
                ))}
            </div>

            <div className="w-full h-full">
                
            
            </div>
        </PageLayout>
    );
}
