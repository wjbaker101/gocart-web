import { ImmortalDB } from 'immortal-db';

export default {

    async storeData(key, data) {
        await ImmortalDB.set(key, JSON.stringify(data));
    },

    async getData(key) {
        const data = await ImmortalDB.get(key, null);

        if (data === null) {
            return null;
        }

        return JSON.parse(data);
    },
}