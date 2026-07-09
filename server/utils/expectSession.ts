import { H3Event } from '#imports';

export async function expectSession(event: H3Event) {
    const session = await auth.api.getSession({
        headers: event.headers,
    });

    if (!session) {
        throw createError({
            status: 403,
            statusText: 'Cannot use this service.',
        });
    }

    return session;
}