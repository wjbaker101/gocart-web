import {
    SearchProduct,
    SearchProductGuidelineDailyAmounts,
    SearchProductGuidelineDailyAmountsAmount,
    SearchProductNutrient,
    SearchProductNutrition,
} from '@/api/tesco/type/SearchProduct';

import {
    Product,
    ProductGuidelineDailyAmounts,
    ProductGuidelineDailyAmountsAmount,
    ProductNutrient,
    ProductNutrition,
} from '@/model/Product.model';

const mapNutrients = (nutrients: SearchProductNutrient[]): ProductNutrient[] => {
    return nutrients.map(n => ({
        name: n.name,
        valuePer100g: n.valuePer100g,
        valuePerServing: n.valuePerServing,
    }));
};

const mapNutrition = (nutrition?: SearchProductNutrition): ProductNutrition | undefined => {
    if (!nutrition)
        return undefined;

    return {
        per100gHeader: nutrition.per100gHeader,
        perServingHeader: nutrition.perServingHeader,
        nutrients: mapNutrients(nutrition.nutrients),
    }
};

const mapGdaAmounts = (amounts: Array<SearchProductGuidelineDailyAmountsAmount>): Array<ProductGuidelineDailyAmountsAmount> => {
    return amounts.map(x => ({
        name: x.name,
        percent: x.percent,
        rating: x.rating,
        values: x.values,
    }));
};

const mapGda = (gda?: SearchProductGuidelineDailyAmounts): ProductGuidelineDailyAmounts | undefined => {
    if (!gda)
        return undefined;

    return {
        headers: gda.headers,
        footers: gda.footers,
        amounts: mapGdaAmounts(gda.amounts),
    }
};

export const ProductMapper = {

    map(product: SearchProduct): Product {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            description: product.description,
            department: product.department,
            superDepartment: product.superDepartment,

            barcodeId: product.barcodeId,
            ingredients: product.ingredients,
            healthScore: product.healthScore,
            nutrition: mapNutrition(product.nutrition),
            guidelineDailyAmounts: mapGda(product.guidelineDailyAmounts),

            isFreetext: false,
            listQuantity: 1,
            listPosition: 0,
            addCount: 0,
        }
    },
}