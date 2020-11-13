export enum SortOptionType {
    ALPHABETICAL,
    PRICE,
    HEALTH_SCORE,
}

export interface SortOption {
    title: string,
    type: SortOptionType,
    icon: any,
}
