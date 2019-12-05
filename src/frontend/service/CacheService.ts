import { ImmortalDB } from 'immortal-db';

export default {

    async storeData(key: string, data: any): Promise<void> {
        await ImmortalDB.set(key, JSON.stringify(data));
    },

    async getData<T = any>(key: string): Promise<T | null> {
        const data = await ImmortalDB.get(key, null);

        if (data === null) {
            return null;
        }

        return JSON.parse(data);
    },
}