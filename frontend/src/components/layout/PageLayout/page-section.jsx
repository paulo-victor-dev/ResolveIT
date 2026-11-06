import PageSearch from "./page-search";
import FiltersDisplay from "../Filters/filters-display";
import DataTable from "../DataTable";
import Pagination from "../Pagination";
import Modal from "../Modal";

export default function PageSection({ 
    pageConfig = {}, 
    queryConfig = {},
    componentConfig = {},
}) {
    const { data, isFetching, params, crud } = queryConfig;

    const { search, pagination, filtering, ordering } = params.raw;

    const { dataFields, filtersFields, formSchema } = componentConfig;

    return (
        <section className="w-full h-full flex flex-col gap-6">
            <PageSearch 
                search={search}
                pagination={pagination}
                page={pageConfig}
                filtersData={{ filtersFields, filtering }}
                crud={crud}
                modalData={{ dataFields, formSchema }}
            />

            <FiltersDisplay 
                filtersData={{ filtersFields, filtering }}
                orderingState={ordering}    
            />

            <div className="h-full flex flex-col">
                <DataTable 
                    data={data?.results ?? []}
                    isFetching={isFetching}
                    crud={crud}
                    
                    dataFields={dataFields}
                    orderingState={ordering}

                    formSchema={formSchema}
                    modalTitleSufix={pageConfig.modalTitleSufix}
                />

                <Pagination 
                    pagination={pagination}
                    data={data ?? {}}
                />
            </div>

            <Modal />
        </section>
    );
}
