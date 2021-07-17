import { useShoppingList } from '@/use/state/ShoppingList.use';

import { SearchForProductsResponse, SearchProduct, SearchProductGuidelineDailyAmounts, SearchProductGuidelineDailyAmountsAmount, SearchProductNutrient, SearchProductNutrition } from '@/api/products/model/SearchForProductsResponse.model';
import { Product, ProductGuidelineDailyAmounts, ProductGuidelineDailyAmountsAmount, ProductNutrient, ProductNutrition } from '@/model/Product.model';

const shoppingList = useShoppingList();

class SearchForProductsResponseMapper {

    public map(products: SearchForProductsResponse): Array<Product> {
        return products.map(this.mapProduct);
    }

    private mapProduct(product: SearchProduct): Product {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            brand: '',
            description: product.description,
            department: product.department,
            superDepartment: product.superDepartment,

            barcodeId: product.barcodeId,
            ingredients: product.ingredients,
            healthScore: product.healthScore,

            nutrition: this.mapNutrition(product.nutrition),
            guidelineDailyAmounts: this.mapGda(product.guidelineDailyAmounts),

            addCount: 1,
            isFreetext: false,
            listPosition: shoppingList.unchecked.value.length,
            listQuantity: 1,
        }
    }

    private mapNutrition(nutrition?: SearchProductNutrition): ProductNutrition | undefined {
        if (!nutrition)
            return undefined;

        return {
            per100gHeader: nutrition.per100gHeader,
            perServingHeader: nutrition.perServingHeader,
            nutrients: nutrition.nutrients.map(this.mapNutrient),
        }
    }

    private mapNutrient(nutrient: SearchProductNutrient): ProductNutrient {
        return {
            valuePer100g: nutrient.valuePer100g,
            valuePerServing: nutrient.valuePerServing,
            name: nutrient.name,
        }
    }

    private mapGda(gda?: SearchProductGuidelineDailyAmounts): ProductGuidelineDailyAmounts | undefined {
        if (!gda)
            return undefined;

        return {
            headers: gda.headers,
            footers: gda.footers,
            amounts: gda.amounts.map(this.mapGdaAmount),
        }
    }

    private mapGdaAmount(gdaAmount: SearchProductGuidelineDailyAmountsAmount): ProductGuidelineDailyAmountsAmount {
        return {
            name: gdaAmount.name,
            percent: gdaAmount.percent,
            rating: gdaAmount.rating,
            values: gdaAmount.values,
        }
    }
}

export const searchForProductsResponseMapper = new SearchForProductsResponseMapper();
