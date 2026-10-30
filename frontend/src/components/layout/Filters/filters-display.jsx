import { FunnelXIcon, ListXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function FiltersDisplay({ filtersData, orderingState }) {
    const { filtersList, filtering } = filtersData;

    const hasActiveFilters = Object.values(filtering.filters ?? {})
        .filter(value => value !== "" && value !== null)
        .length > 0;

    const hasActiveOrderings = orderingState.orderings.length > 0;

    return (
        <div className="h-2 flex items-center gap-2">
            {Object.entries(filtering.filters ?? {})
                .filter(([, value]) => value !== "" && value != null)
                .map(([paramName, value]) => {
                    const filter = filtersList.find(
                        (filter) => filter.paramName === paramName
                    );

                    const item = filter?.groupItems.find(
                        (item) => item.value === value
                    );

                    if (!filter || !item) return null;

                    return (
                        <Button 
                            key={paramName}
                            variant="outline"
                            size="xs"
                            onClick={() => filtering.clearSingleFilter(paramName)}   
                        >
                            <span className="font-bold">
                                {filter.groupLabel}: 
                            </span>
                            {item.label}
                        </Button>
                    );
                })
            }

            {hasActiveFilters && (
                <Button variant="destructive" size="xs"
                    onClick={() => filtering.clearFilters()}
                >
                    Limpar filtros
                    <FunnelXIcon />
                </Button>
            )}

            {hasActiveOrderings && (
                <Button variant="destructive" size="xs"
                    onClick={() => orderingState.clearOrderings()}
                >
                    Limpar ordenações
                    <ListXIcon />
                </Button>
            )}
        </div>
    );
}
