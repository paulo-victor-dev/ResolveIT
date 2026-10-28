"use client";

import { ArrowUpFromLineIcon } from "lucide-react";

import Search from "./search";
import Filters from "./filters";
import FiltersDisplay from "./filtersDisplay";
import DataTable from "./dataTable";

import { Button } from "../ui/button";

export default function PageLayout({ pageConfig, paramsConfig, tableConfig }) {
    const { page, filtersList } = pageConfig;
    const { search, pagination, filtering, ordering } = paramsConfig;
    const { columns, data, isFetching } = tableConfig;
    
    return (
        <main className="w-full h-full flex flex-col gap-6 p-6 rounded-2xl border bg-surface-bg">
            <header className="w-full h-15 flex">
                <div className="flex justify-center gap-3">
                    <span>{page.icon}</span>
                    
                    <div className="flex flex-col -mt-1">
                        <h1 className="flex text-xl font-bold">
                            {page.title}
                        </h1>

                        <h2 className="text-sm opacity-60">
                            {page.subTitle}
                        </h2>
                    </div>
                </div>
            </header>

            <section className="w-full h-full flex flex-col gap-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <Search 
                            searchSetState={search.setSearchValue}
                            paginationSetState={pagination.setPage}
                            placeholder={page.searchPlaceholder}
                            filtersData={{ filtersList, filtering }}
                        />

                        <Filters 
                            filtersData={{ filtersList, filtering }}
                            filtersList={filtersList}
                            filtersState={filtering}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline">
                            <ArrowUpFromLineIcon />
                            Exportar
                        </Button>

                        <Button>
                            {page.button.icon}
                            {page.button.text}
                        </Button>
                    </div>
                </div>

                <FiltersDisplay filtersData={{ filtersList, filtering, ordering }} />

                <div className="h-full flex flex-col">
                    <DataTable 
                        columns={columns}
                        data={data}
                        isFetching={isFetching}
                        orderingState={ordering}
                    />

                    <div className="w-full h-15 flex items-center">
                        <Button>
                            Paginação
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
