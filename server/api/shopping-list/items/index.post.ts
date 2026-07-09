import { mapShoppingListItem, type IApiShoppingListItem } from '~~/server/types/ApiShoppingListItem';

import { addShoppingListItem } from '~~/shared/schemas/addShoppingListItem';

export interface IGetShoppingListResponse {
    readonly item: IApiShoppingListItem;
}

export default defineEventHandler(async (event): Promise<IGetShoppingListResponse> => {
    const session = await expectSession(event);
    const body = await validateRequest(addShoppingListItem, event);

    let product = await prisma.product.findUnique({
        where: {
            tpnc: body.tpnc,
        },
    });

    if (product === null) {
        const tescoProduct = await tesco().getProduct(body.tpnc);

        product = await prisma.product.create({
            data: {
                tpnc: tescoProduct.data.product.tpnc,
                data: tescoProduct.data.product as any,
            },
        });
    }

    const item = await prisma.shoppingListItem.create({
        data: {
            reference: crypto.randomUUID(),
            createdAt: new Date(),
            userId: session.user.id,
            productId: product.id,
            quantity: body.quantity,
            listOrder: 'a',
            isChecked: false,
        },
    });

    return {
        item: mapShoppingListItem(item),
    };
});