import { ImmortalDB } from 'immortal-db';

class DataStoreService {

    async storeData(key: string, data: any) {
        await ImmortalDB.set(key, JSON.stringify(data));
    }

    async getData(key: string) {
        const data = await ImmortalDB.get(key, null);

        if (data === null) {
            return null;
        }

        return JSON.parse(data);
    }
}

export default new DataStoreService();
