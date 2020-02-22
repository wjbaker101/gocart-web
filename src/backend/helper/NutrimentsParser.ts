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
                name: this.parseBaseName(baseName, nutriments),
                per100g: Number(nutriments[`${baseName}_100g`]),
                perServing: Number(nutriments[`${baseName}_serving`]),
            };

            parsedNutrients.add(baseName);
        }

        const nutrientKJ = nutrients.find(n => n.name === 'energy-kj');

        if (nutrientKJ && !nutrients.find(n => n.name === 'energy-kcal')) {
            nutrients.push({
                sortingOrder: 0,
                name: 'energy-kcal',
                per100g: nutrientKJ.per100g / 4.184,
                perServing: nutrientKJ.perServing / 4.184,
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

    parseBaseName(baseName: string, nutriments: Record<string, string | number>): string {
        if (baseName === 'energy-kcal' && !nutriments['energy-kj']) {
            return 'energy-kj';
        }

        if (baseName === 'energy-kcal_100g' && !nutriments['energy-kj_100g']) {
            return 'energy-kj_100g';
        }

        if (baseName === 'energy-kcal_serving' && !nutriments['energy-kj_serving']) {
            return 'energy-kj_serving';
        }

        return baseName;
    },
}
