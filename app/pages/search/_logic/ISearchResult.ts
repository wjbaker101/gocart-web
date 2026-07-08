export interface ISearchResult {
    readonly tpnc: string;
    readonly name: string;
    readonly price: number;
    readonly imageUrl: string;
    readonly pricePer: {
        readonly amount: number;
        readonly unit: string;
    };
}