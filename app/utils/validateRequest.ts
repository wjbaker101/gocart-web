import z from 'zod';

export function validateRequest<T extends z.ZodType>(schema: T, request: z.infer<T>) {
    const result = z.safeParse(schema, request);

    if (result.error) {
        throw createError({
            status: 400,
            statusText: result.error.message,
        });
    }

    return result.data;
}