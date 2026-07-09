import { mapShoppingListItem, type IApiShoppingListItem } from '~~/server/types/ApiShoppingListItem';

export interface IGetShoppingListResponse {
    readonly items: Array<IApiShoppingListItem>;
}

export default defineEventHandler(async (event): Promise<IGetShoppingListResponse> => {
    const session = await expectSession(event);

    const items = await prisma.shoppingListItem.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            listOrder: 'asc',
        },
    });

    return {
        items: items.map(mapShoppingListItem),
    };
});