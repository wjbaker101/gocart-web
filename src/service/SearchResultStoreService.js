import dataStoreService from './DataStoreService.js';

class SearchResultStoreService {

    constructor() {
        this.productsKey = 'search-result';
    }

    async saveSearchResult(products) {
        await dataStoreService.storeData(this.productsKey, products);
    }

    async getSearchResult() {
        return await dataStoreService.getData(this.productsKey);
    }
}

export default new SearchResultStoreService();
