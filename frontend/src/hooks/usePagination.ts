import { useMemo } from "react";

export function usePagination(data: any[], page: number, itemsPerPage: number) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

    return { paginatedData, totalPages };
}
