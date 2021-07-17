export const SortService = {

    alphabeticalAsc(a: string, b: string): number {
        if (a > b) return 1;
        if (a < b) return -1;

        return 0;
    },

    numericalDesc(a: number, b: number): number {
        if (a < b) return 1;
        if (a > b) return -1;

        return 0;
    },
}
