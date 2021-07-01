import { Product } from '@/model/Product.model';
import { User } from '@/model/User.model';

export interface ShoppingListSettingsState {
    isCheckedItemsVisible: boolean,
}

export interface ShoppingListAppState {
    products: Record<string, Product>,
    unchecked: Set<string>,
    checked: Set<string>,
    settings: ShoppingListSettingsState,
}

export interface AppState {
    shoppingList: ShoppingListAppState,

    user: User | null,
}
