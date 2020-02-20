export type NutrientLevel = 'high' | 'moderate' | 'low';

export interface IOFFProductResponse {
    status: number,
    code: string,
    status_verbose: string,
    product: {
        ingredients_text_with_allergens: string,
        nutrient_levels: {
            sugars: NutrientLevel,
            fat: NutrientLevel,
            salt: NutrientLevel,
            'saturated-fat': NutrientLevel,
        },
        nutriments: Record<string, string | number>,
    },
}
