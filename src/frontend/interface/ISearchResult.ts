import { ITescoProduct } from '@frontend/interface/ITescoProduct';

export interface ISearchResult {
    searchTerm: string,
    searchResult: ITescoProduct[],
}
