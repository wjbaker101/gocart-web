import { Product } from '@/model/Product.model';
import { SortOptionType } from '@/model/SortOption.model';
import { User } from '@/model/User.model';

export interface CurrentSearchAppState {
    products: Product[],
    searchTerm: string,
}

export interface ShoppingListSettingsState {
    isCheckedItemsVisible: boolean,
}

export interface ShoppingListAppState {
    products: Record<string, Product>,
    unchecked: Set<string>,
    checked: Set<string>,
    settings: ShoppingListSettingsState,
}

export interface SearchAppState {
    sortOption: SortOptionType,
}

export interface AppState {
    currentSearch: CurrentSearchAppState | null,

    searchSettings: SearchAppState,

    shoppingList: ShoppingListAppState,

    user: User | null,
}
