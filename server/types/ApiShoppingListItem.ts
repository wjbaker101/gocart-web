import type { ShoppingListItem } from '~~/.prisma/client';

export interface IApiShoppingListItem {
    readonly reference: string;
    readonly createdAt: number;
    readonly quantity: number;
    readonly listOrder: string;
}

export function mapShoppingListItem(item: ShoppingListItem): IApiShoppingListItem {
    return {
        reference: item.reference,
        createdAt: item.createdAt.getTime(),
        quantity: item.quantity,
        listOrder: item.listOrder,
    };
}