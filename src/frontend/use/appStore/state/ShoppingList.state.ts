import { Product } from '@/model/Product.model';

export interface ShoppingListSettingsState {
    isCheckedItemsVisible: boolean;
}

export interface ShoppingListState {
    list: Array<Product>;
    settings: ShoppingListSettingsState;
}
