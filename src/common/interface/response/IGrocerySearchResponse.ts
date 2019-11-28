export interface IGrocerySearchResponseResult {
    image: string,
    superDepartment: string,
    tpnb: number,
    ContentsMeasureType: string,
    name: string,
    UnitOfSale: 1,
    AverageSellingUnitWeight: number,
    description: string[],
    UnitQuantity: string,
    id: number,
    ContentsQuantity: number,
    department: string,
    price: number,
    unitprice: number,
}

export interface IGrocerySearchResponse {
    uk: {
        ghs: {
            products: {
                input_query: string,
                output_query: string,
                filters: {},
                queryPhrase: string,
                totals: {
                    all: number,
                    new: number,
                    offer: number,
                },
                config: string,
                results: IGrocerySearchResponseResult[],
                suggestions: [],
            },
        },
    },
}
