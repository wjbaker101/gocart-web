export default defineNuxtRouteMiddleware(async (to) => {
    const { data: session } = await authClient.useSession(useFetch);

    if (!session.value) {
        return navigateTo({ path: '/log-in', query: { go: to.fullPath } });
    }
});