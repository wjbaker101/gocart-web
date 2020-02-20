import { OFFClient } from '../client/OFFClient';
import { NutrimentsParser } from '../helper/NutrimentsParser';

export const OFFService = {

    async getProductData(barcodeID: string): Promise<any | Error> {
        const result = await OFFClient.getProductData(barcodeID);

        if (result instanceof Error) {
            return result;
        }

        return {
            ingredients: result.product.ingredients_text_with_allergens,
            nutrientLevels: result.product.nutrient_levels,
            nutrientValues: NutrimentsParser.parseNutriments(result.product.nutriments),
        }
    },
}
