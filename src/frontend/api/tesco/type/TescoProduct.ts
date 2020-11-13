export interface TescoProductNutrient {
    name: string,
    valuePer100g: number,
    valuePerServing: number,
}

export interface TescoProductNutrition {
    per100gHeader: string,
    perServingHeader: string,
    nutrients: TescoProductNutrient[],
}

export interface TescoProduct {
    id: string,
    barcodeId: string,
    description: string,
    brand: string,
    ingredients?: string[],
    healthScore?: number,
    nutrition?: TescoProductNutrition,
}
