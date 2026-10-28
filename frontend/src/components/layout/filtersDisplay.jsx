import { FunnelXIcon, ListXIcon } from "lucide-react";

import { Button } from "../ui/button";

export default function FiltersDisplay({ filtersData }) {
    const { filtersList, filtering, ordering } = filtersData;

    const hasActiveFilters = Object.values(filtering.filters ?? {})
        .filter(value => value !== "" && value !== null)
        .length > 0;

    const hasActiveOrderings = ordering.orderings.length > 0;

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
                    onClick={() => ordering.clearOrderings()}
                >
                    Limpar ordenações
                    <ListXIcon />
                </Button>
            )}
        </div>
    );
}
