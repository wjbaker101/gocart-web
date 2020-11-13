import {
    ImmortalStorage,
    IndexedDbStore,
    LocalStorageStore
} from 'immortal-db';

const immortalDB = new ImmortalStorage([
    IndexedDbStore,
    LocalStorageStore
]);

export const CacheService = {

    async get<T>(key: string): Promise<T | null> {
        const stored = await immortalDB.get(key);

        if (stored == null)
            return null;

        return JSON.parse(stored);
    },

    async set(key: string, data: any): Promise<void> {
        await immortalDB.set(key, JSON.stringify(data));
    },
}
