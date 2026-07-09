export interface IDeleteShoppingListItemResponse {
}

export default defineEventHandler(async (event): Promise<IDeleteShoppingListItemResponse> => {
    const session = await expectSession(event);
    const itemReference = getRouterParam(event, 'itemReference');

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

    await prisma.shoppingListItem.delete({
        where: {
            id: item.id,
        },
    });

    return {};
});