import PageSearch from "./page-search";
import FiltersDisplay from "../Filters/filters-display";
import DataTable from "../DataTable";
import Pagination from "../Pagination";

export default function PageSection({ 
    pageConfig = {}, 
    paramsConfig = {}, 
    tableConfig = {}
}) {
    const { page, filtersList, formInputsList } = pageConfig;
    const { search, pagination, filtering, ordering } = paramsConfig;
    const { columns, data, isFetching } = tableConfig;

    return (
        <section className="w-full h-full flex flex-col gap-6">
            <PageSearch 
                search={search}
                pagination={pagination}
                page={page}
                filtersData={{ filtersList, filtering }}
            />

            <FiltersDisplay 
                filtersData={{ filtersList, filtering }}
                orderingState={ordering}    
            />

            <div className="h-full flex flex-col">
                <DataTable 
                    columns={columns}
                    data={data?.results ?? []}
                    isFetching={isFetching}
                    orderingState={ordering}
                />

                <Pagination 
                    pagination={pagination}
                    data={data ?? []}
                />
            </div>
        </section>
    );
}
