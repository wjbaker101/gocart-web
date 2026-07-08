import z from 'zod';

export const productSearchQuery = z.object({
    searchTerm: z.string().min(3).max(1000),
})
.readonly();