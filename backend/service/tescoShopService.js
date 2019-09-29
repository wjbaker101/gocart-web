const tescoShopClient = require('../client/tescoShopClient.js');

module.exports = {

    async searchShops(location, services) {
        const response = await tescoShopClient.searchShops({
            filter: null,
            like: null,
            sort: `near:"${location}"`,
            fields: null,
        });

        return response.results;
    },
}
