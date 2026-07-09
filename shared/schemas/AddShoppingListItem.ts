import z from 'zod';

export const addShoppingListItem = z.object({
    tpnc: z.string().min(1).max(100),
    quantity: z.number().min(1).max(100),
})
.readonly();