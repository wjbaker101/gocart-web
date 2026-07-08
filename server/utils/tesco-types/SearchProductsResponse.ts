export interface SearchProductsResponse {
    data: {
        search: {
            results: ProductResult[];
        };
    };
}

interface ProductResult {
    node: ProductNode;
}

interface ProductNode {
    __typename: 'ProductType';
    tpnc: string;
    tpnb: string;
    title: string;
    brandName: string;
    defaultImageUrl: string;
    sellers: {
        results: SellerResult[];
    };
}

interface SellerResult {
    price: Price;
    promotions: Array<Promotion>;
}

interface Price {
    actual: number;
    unitPrice: number;
    unitOfMeasure: string;
}

interface Promotion {
    description: string;
    startDate: string;
    endDate: string;
    attributes: Array<string>;
    price: PromotionPrice | null;
}

interface PromotionPrice {
    afterDiscount: number;
    beforeDiscount: number | null;
}