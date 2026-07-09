import type { Product, ShoppingListItem } from '~~/.prisma/client';

export interface IApiShoppingListItem {
    readonly reference: string;
    readonly createdAt: number;
    readonly quantity: number;
    readonly listOrder: string;
    readonly isChecked: boolean;
    readonly data: {
        readonly tpnc: string;
        readonly name: string;
        readonly imageUrl: string;
        readonly price: number;
    };
}

export function mapShoppingListItem(item: ShoppingListItem & { product: Product }): IApiShoppingListItem {
    const data = item.product.data as any as GetProductResponse['data']['product'];

    return {
        reference: item.reference,
        createdAt: item.createdAt.getTime(),
        quantity: item.quantity,
        listOrder: item.listOrder,
        isChecked: item.isChecked,
        data: {
            tpnc: data.tpnc,
            name: data.title,
            imageUrl: data.defaultImageUrl,
            price: data.price.actual,
        },
    };
}