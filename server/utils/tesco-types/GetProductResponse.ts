export interface GetProductResponse {
    data: {
        product: Product;
    };
    status: number;
}

interface Product {
    tpnb: string;
    tpnc: string;
    title: string;
    brandName: string;
    defaultImageUrl: string;
    price: Price;
    promotions: Array<Promotion>;
    details: ProductDetails;
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

interface ProductDetails {
    packSize: Array<PackSize>;
    nutrition: Array<NutritionRow>;
    ingredients: Array<string>;
}

interface PackSize {
    value: string;
    units: string;
}

interface NutritionRow {
    name: string;
    value1: string;
    value2: string;
    value3: string;
}