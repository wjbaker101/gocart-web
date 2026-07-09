import type { H3Event } from '#imports';
import z from 'zod';

export async function validateRequest<T extends z.ZodType>(schema: T, event: H3Event) {
    const result = z.safeParse(schema, await readBody(event));

    if (result.error) {
        throw createError({
            status: 400,
            statusText: result.error.message,
        });
    }

    return result.data;
}