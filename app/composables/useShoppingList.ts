export interface IuseShoppingList {
    readonly items: Array<IShoppingListItem>;
}

export interface IShoppingListItem {
    readonly reference: string;
    readonly createdAt: number;
    quantity: number;
    listOrder: string;
    isChecked: boolean;
    readonly data: {
        readonly tpnc: string;
        readonly name: string;
        readonly imageUrl: string;
        readonly price: number;
    };
}

export function useShoppingList() {
    return useState<IuseShoppingList>('useShoppingList', () => ({
        items: [],
    }));
}