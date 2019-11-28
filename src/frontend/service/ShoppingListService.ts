import dataStoreService from '@frontend/service/DataStoreService';

class ShoppingListService {

    constructor() {
        this.shoppingListKey = 'shopping-list';
        this.shoppingListOrderKey = 'shopping-list-order';
    }

    async saveShoppingList(shoppingList) {
        await dataStoreService.storeData(this.shoppingListKey, shoppingList);
    }

    async loadShoppingList() {
        return await dataStoreService.getData(this.shoppingListKey);
    }

    async saveShoppingListOrder(shoppingListOrder) {
        await dataStoreService.storeData(this.shoppingListOrderKey, shoppingListOrder);
    }

    async loadShoppingListOrder() {
        return await dataStoreService.getData(this.shoppingListOrderKey);
    }
}

export default new ShoppingListService();
