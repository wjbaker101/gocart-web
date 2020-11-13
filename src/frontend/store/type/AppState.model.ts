import { Product } from '@/model/Product.model';
import { Shop } from '@/model/Shop.model';
import { SortOptionType } from '@/model/SortOption.model';

export interface CurrentSearchAppState {
    products: Product[],
    searchTerm: string,
}

export interface ShoppingListAppState {
    products: Record<string, Product>,
    unchecked: Set<string>,
    checked: Set<string>,
}

export interface SearchAppState {
    sortOption: SortOptionType,
}

export interface AppState {
    currentProduct: Product | null,
    currentSearch: CurrentSearchAppState | null,
    currentScrollPositions: Map<string, number>,

    searchSettings: SearchAppState,

    shoppingList: ShoppingListAppState,

    selectedShop: Shop | null,
}
