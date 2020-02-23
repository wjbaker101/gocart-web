import { ITescoProduct } from '@frontend/interface/ITescoProduct';
import { IProductDataResponseResult } from '@common/interface/response/IProductDataResponse';

export const TescoProductService = {

    addDataToExistingProduct(product: ITescoProduct, data: IProductDataResponseResult) {
        product.productData = {
            barcodeID: data.gtin,
            healthScore: data.productCharacteristics.healthScore,
            ingredients: data.ingredients?.join(', '),
            nutritionalValue: data.calcNutrition ? {
                header: {
                    per100g: data.calcNutrition.per100Header,
                    perServing: data.calcNutrition.perServingHeader,
                },
                values: data.calcNutrition.calcNutrients.map(n => ({
                    name: n.name,
                    per100g: n.valuePer100,
                    perServing: n.valuePerServing,
                })),
            } : undefined,
        };
    },
}
