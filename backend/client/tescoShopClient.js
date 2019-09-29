const tescoClient = require('./tescoClient2.js');

module.exports = {

    async searchShops({ filter, like, sort, fields, limit = 10, offset = 0, }) {
        const params = [
            filter !== null ? `filter=${filter}` : null,
            like !== null ? `like=${like}` : null,
            sort !== null ? `sort=${sort}` : null,
            fields !== null ? `fields=${fields}` : null,
            limit !== null ? `limit=${limit}` : null,
            offset !== null ? `offset=${offset}` : null,
        ]
        .filter(o => o !== null)
        .join('&');

        return await tescoClient.get(`/locations/search?${params}`);
    },
}
