import {
    SearchProduct,
    SearchProductNutrient,
    SearchProductNutrition,
} from '@/api/tesco/type/SearchProduct';

import {
    Product,
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

            listQuantity: 1,
            isChecked: false,
            addCount: 0,
        }
    },
}