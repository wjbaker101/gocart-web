export interface ProductNutrient {
    name: string;
    valuePer100g: number;
    valuePerServing: number;
}

export interface ProductNutrition {
    per100gHeader: string;
    perServingHeader: string;
    nutrients: ProductNutrient[];
}

export interface ProductGuidelineDailyAmounts {
    headers: Array<string>;
    footers: Array<string>;
    amounts: Array<ProductGuidelineDailyAmountsAmount>;
}

export interface ProductGuidelineDailyAmountsAmount {
    name: string;
    values: Array<string>;
    percent: string;
    rating: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    department: string;
    superDepartment: string;

    barcodeId?: string;
    brand?: string;
    ingredients?: string[];
    healthScore?: number;
    nutrition?: ProductNutrition;
    guidelineDailyAmounts?: ProductGuidelineDailyAmounts;

    isFreetext: boolean;
    listQuantity: number;
    listPosition: number;
    addCount: number;
}