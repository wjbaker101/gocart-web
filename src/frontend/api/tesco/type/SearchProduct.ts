export interface SearchProductNutrient {
    name: string,
    valuePer100g: number,
    valuePerServing: number,
}

export interface SearchProductNutrition {
    per100gHeader: string,
    perServingHeader: string,
    nutrients: SearchProductNutrient[],
}

export interface SearchProductGuidelineDailyAmounts {
    headers: Array<string>;
    footers: Array<string>;
    amounts: Array<SearchProductGuidelineDailyAmountsAmount>;
}

export interface SearchProductGuidelineDailyAmountsAmount {
    name: string;
    values: Array<string>;
    percent: string;
    rating: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SearchProduct {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    description: string,
    department: string,
    superDepartment: string,

    barcodeId?: string,
    ingredients?: string[],
    healthScore?: number,
    nutrition?: SearchProductNutrition,
    guidelineDailyAmounts: SearchProductGuidelineDailyAmounts;
}