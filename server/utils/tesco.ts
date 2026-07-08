import type { SearchProductsResponse } from '~~/server/utils/tesco-types/SearchProductsResponse';

const url = 'https://xapi.tesco.com';

const client = $fetch.create({
    method: 'post',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.10 Safari/605.1.1',
        'X-ApiKey': 'TvOSZJHlEk0pjniDGQFAc9Q59WGAR4dA',
    },
});

export function tesco() {
    return {

        async search(searchTerm: string, page: number): Promise<SearchProductsResponse> {
            return await client(url, {
                body: JSON.stringify(createQuery('Search', {
                    query: searchTerm,
                    page: page,
                    count: 15,
                }, `
                query Search($query: String!, $page: Int = 1, $count: Int) {
                    search(query: $query, page: $page, count: $count) {
                        results {
                            node {
                                __typename
                                ... on ProductInterface {
                                    tpnc
                                    tpnb
                                    title
                                    brandName
                                    defaultImageUrl
                                    sellers {
                                        results {
                                            price {
                                                actual
                                                unitPrice
                                                unitOfMeasure
                                            }
                                            promotions {
                                                description
                                                startDate
                                                endDate
                                                attributes
                                                price {
                                                    afterDiscount
                                                    beforeDiscount
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                `)),
            });
        },

        async getProduct(tpnc: string): Promise<GetProductResponse> {
            return await client(url, {
                body: JSON.stringify(createQuery('GetProduct', {
                    tpnc: tpnc,
                }, `
                query GetProduct($tpnc: String!) {
                    product(tpnc: $tpnc) {
                        tpnb
                        tpnc
                        title
                        brandName
                        defaultImageUrl
                        price {
                            actual
                            unitPrice
                            unitOfMeasure
                        }
                        promotions {
                            description
                            startDate
                            endDate
                            attributes
                            price {
                                afterDiscount
                                beforeDiscount
                            }
                        }
                        details {
                            packSize {
                                value
                                units
                            }
                            nutrition {
                                name
                                value1
                                value2
                                value3
                            }
                            ingredients
                        }
                    }
                }
                `)),
            });
        },

    };
}

function createQuery(operation: string, variables: Record<string, any>, query: string) {
    return {
        operationName: operation,
        variables: variables,
        query: query,
    };
}