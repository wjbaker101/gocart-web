export interface ITescoProductNutritionalValue {
    name: string,
    per100g: number,
    perServing: number,
}

export interface ITescoProductData {
    barcodeID: string,
    ingredients?: string,
    nutritionalValue?: {
        header: {
            per100g: string,
            perServing: string,
        },
        values: ITescoProductNutritionalValue[],
    },
}

export interface ITescoProduct {
    image: string,
    superDepartment: string,
    tpnb: number,
    ContentsMeasureType: string,
    name: string,
    UnitOfSale: 1,
    AverageSellingUnitWeight: number,
    description: string,
    UnitQuantity: string,
    id: number,
    ContentsQuantity: number,
    department: string,
    price: number,
    unitprice: number,
    quantity: number,
    isChecked: boolean,
    timesAddedToShoppingList: number,
    productData?: ITescoProductData,
}
