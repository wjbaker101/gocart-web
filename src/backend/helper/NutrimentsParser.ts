interface INutrient {
    sortingOrder: number,
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
                sortingOrder: 0,
                name: baseName,
                per100g: Number(nutriments[`${baseName}_100g`]),
                perServing: Number(nutriments[`${baseName}_serving`]),
            };

            parsedNutrients.add(baseName);
        }

        if ('energy-kcal_100g' in nutriments) {
            nutrients.push({
                sortingOrder: 0,
                name: 'energy-kj',
                per100g: Number(nutriments['energy-kcal_100g']) * 4.184,
                perServing: Number(nutriments['energy-kcal_serving']) * 4.184,
            });
        }

        if ('energy-kj_100g' in nutriments) {
            nutrients.push({
                sortingOrder: 0,
                name: 'energy-kcal',
                per100g: Number(nutriments['energy-kj_100g']) / 4.184,
                perServing: Number(nutriments['energy-kj_serving']) / 4.184,
            });
        }

        return nutrients
                .map(this.mapNutrient)
                .filter(n => n !== null)
                .sort(this.sortNutrient) as INutrient[];
    },

    mapNutrient(nutrient: INutrient): INutrient | null {
        const map: Record<string, { name: string, order: number }> = {
            'energy-kj': { name: 'Energy (kJ)', order: 1 },
            'energy-kcal': { name: 'Energy (kcal)', order: 2 },
            'fat': { name: 'Fat (g)', order: 3 },
            'saturated-fat': { name: 'Saturates (g)', order: 4 },
            'carbohydrates': { name: 'Carbohydate (g)', order: 5 },
            'sugars': { name: 'Sugars (g)', order: 6 },
            'proteins': { name: 'Protein (g)', order: 7 },
            'salt': { name: 'Salt (g)', order: 8 },
        };

        if (!map[nutrient.name]) {
            return null;
        }

        const nutrientProperties = map[nutrient.name];

        nutrient.name = nutrientProperties.name;
        nutrient.sortingOrder = nutrientProperties.order;

        return nutrient;
    },

    sortNutrient(a: INutrient, b: INutrient): number {
        return a.sortingOrder - b.sortingOrder;
    },
}
