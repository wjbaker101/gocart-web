import { Product } from '@/model/Product.model';
import { SortOptionType } from '@/model/SortOption.model';

export interface ProductSearchState {
    searchTerm: string | null;
    products: Array<Product> | null;
    sortOption: SortOptionType;
}
