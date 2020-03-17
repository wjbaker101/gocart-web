import CacheService from '@frontend/service/CacheService';

const KEY_CURRENT_USER = 'current-user';

export default {

    async storeCurrentUser(user: any): Promise<void> {
        await CacheService.storeData(KEY_CURRENT_USER, user);
    },

    async getCurrentUser(): Promise<any | null> {
        return await CacheService.getData<any>(KEY_CURRENT_USER);
    },
}
