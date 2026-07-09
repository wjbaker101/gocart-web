import { mapShoppingListItem, type IApiShoppingListItem } from '~~/server/types/ApiShoppingListItem';

import { updateShoppingListItem } from '~~/shared/schemas/updateShoppingListItem';

export interface IGetShoppingListResponse {
    readonly item: IApiShoppingListItem;
}

export default defineEventHandler(async (event): Promise<IGetShoppingListResponse> => {
    const session = await expectSession(event);
    const itemReference = getRouterParam(event, 'itemReference');
    const body = await validateRequest(updateShoppingListItem, event);

    const item = await prisma.shoppingListItem.findUnique({
        where: {
            reference: itemReference,
            userId: session.user.id,
        },
    });

    if (item === null) {
        throw createError({
            status: 404,
            statusText: `Could not find item with reference: '${itemReference}'.`,
        });
    }

    await prisma.shoppingListItem.update({
        data: {
            quantity: body.quantity,
            isChecked: body.isChecked,
        },
        where: {
            reference: item.reference,
        },
    });

    return {
        item: mapShoppingListItem(item),
    };
});