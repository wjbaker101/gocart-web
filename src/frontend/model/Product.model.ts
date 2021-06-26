export interface ProductNutrient {
    name: string,
    valuePer100g: number,
    valuePerServing: number,
}

export interface ProductNutrition {
    per100gHeader: string,
    perServingHeader: string,
    nutrients: ProductNutrient[],
}

export interface Product {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    description: string,
    department: string,
    superDepartment: string,

    barcodeId?: string,
    brand?: string,
    ingredients?: string[],
    healthScore?: number,
    nutrition?: ProductNutrition,

    isFreetext: boolean,
    listQuantity: number,
    isChecked: boolean,
    addCount: number,
}