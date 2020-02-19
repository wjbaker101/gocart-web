export interface IProductDataResponsePackageDimension {
    no: number,
    height: number,
    width: number,
    depth: number,
    dimensionUom: string,
    weight: number,
    weightUom: string,
    volume: number,
    volumeUom: string,
}

export interface IProductDataResponseNutrient {
    name: string,
    valuePer100: number,
    valuePerServing: number,
}

export interface IProductDataResponseResult {
    gtin: string,
    tpnb: string,
    tpnc: string,
    description: string,
    brand: string,
    qtyContents: {
        quantity: number,
        totalQuantity: number,
        quantityUom: string,
        unitQty: string,
        netContents: string,
        avgMeasure: string,
    },
    productCharacteristics: {
        isFood: boolean,
        isDrink: boolean,
        isHazardous: boolean,
        storageType: string,
        isAnalgesic: boolean,
        containsLoperamide: boolean,
        totalAlcoholUnits: number,
    },
    pkgDimensions: IProductDataResponsePackageDimension[],
    ingredients?: string[],
    calcNutrition?: {
        per100Header: string,
        perServingHeader: string,
        calcNutrients: IProductDataResponseNutrient[],
    },
}

export interface IProductDataResponse {
    products: IProductDataResponseResult[],
}
