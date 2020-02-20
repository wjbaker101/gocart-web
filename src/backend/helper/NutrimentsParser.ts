interface INutrient {
    name: string,
    per100g: number,
    perServing: number,
}

export const NutrimentsParser = {

    parseNutriments(nutriments: Record<string, string | number>): INutrient[] {
        const nutrients: INutrient[] = [];
        const parsedNutrients: Set<string> = new Set();

        for (const nutrient of Object.keys(nutriments)) {
            const baseName = nutrient.split('_')[0];

            if (parsedNutrients.has(baseName)) {
                continue;
            }

            nutrients[nutrients.length] = {
                name: baseName,
                per100g: Number(nutriments[`${baseName}_100g`]),
                perServing: Number(nutriments[`${baseName}_serving`]),
            };

            parsedNutrients.add(baseName);
        }

        return nutrients
                .map(this.mapNutrient)
                .filter(n => n !== null) as INutrient[];
    },

    mapNutrient(nutrient: INutrient): INutrient | null {
        const map: Record<string, string> = {
            'fat': 'Fat (g)',
            'saturated-fat': 'Saturates (g)',
            'carbohydrates': 'Carbohydate (g)',
            'sugars': 'Sugars (g)',
            'proteins': 'Protein (g)',
            'salt': 'Salt (g)',
            'energy-kj': 'Energy (kJ)',
        };

        if (!map[nutrient.name]) {
            return null;
        }

        nutrient.name = map[nutrient.name];

        return nutrient;
    },
}
