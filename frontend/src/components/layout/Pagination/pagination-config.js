export const getPaginationConfig = (totalItems, next, previous, page, setPage) => {   
    const totalPages = Math.ceil(totalItems / 10);
    
    const setNextPage = () => {
        if (next && page < totalPages) {
          setPage(prev => prev + 1);  
        }
    };
    
    const setPreviousPage = () => {
        if (previous && page > 1) {
          setPage(prev => prev - 1);  
        }
    };

    const handleSetPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber);
        }
    };

    const getVisiblePages = (currentPage, totalPages) => {
        if (totalPages <= 0) return [];

        const pages = new Set([1, totalPages]);

        for (
            let page = currentPage - 1;
            page <= currentPage + 1;
            page++
        ) {
            if (page >= 1 && page <= totalPages) {
                pages.add(page);
            }
        }

        return [...pages].sort((a, b) => a - b);
    }
    
    return {
        totalPages,
        setNextPage,
        setPreviousPage,
        handleSetPage,
        getVisiblePages
    };
}
