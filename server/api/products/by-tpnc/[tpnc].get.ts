export default defineEventHandler(async (event) => {
    const tpnc = getRouterParam(event, 'tpnc');

    if (tpnc === undefined) {
        throw createError({
            status: 400,
            statusText: 'Please provide the identifier for the product.',
        });
    }

    return tesco().getProduct(tpnc);
});