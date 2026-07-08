import { tesco } from '~~/server/utils/tesco';

import type { SearchProductsResponse } from '~~/server/utils/tesco-types/SearchProductsResponse';

import { productSearchQuery } from '~~/shared/schemas/ProductSearch';

export default defineEventHandler(async (event): Promise<SearchProductsResponse> => {
    const { searchTerm } = productSearchQuery.parse(getQuery(event));

    return tesco().search(searchTerm, 1);
});