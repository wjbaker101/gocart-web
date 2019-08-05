import dataStoreService from './DataStoreService.js';

class ProductStoreService {

    constructor() {
        this.productsKey = 'products';
    }

    async saveProducts(products) {
        await dataStoreService.storeData(this.productsKey, products);
    }

    async getProducts() {
        return await dataStoreService.getData(this.productsKey);
    }
}

export default new ProductStoreService();
