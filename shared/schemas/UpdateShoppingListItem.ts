import z from 'zod';

export const updateShoppingListItem = z.object({
    quantity: z.number().min(1).max(100),
})
.readonly();