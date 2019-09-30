import TescoShopCacheService from '@/service/TescoShopCacheService.js';
import ShoppingListCacheService from '@/service/ShoppingListCacheService.js';

export default {

    debug: process.env.NODE_ENV !== 'production',

    state: {
        search: null,
        shoppingList: {},
        shoppingListOrder: [],
        shopSearch: null,
        shop: null,
    },

    log(message) {
        if (this.debug) {
            console.log(message);
        }
    },

    setSearchResult(searchResult) {
        this.state.search = searchResult;
    },

    getSearchResult() {
        return this.state.search;
    },

    setShopSearchResult(shopSearchResult) {
        this.log(`Setting shop search result:`);
        this.log(shopSearchResult);

        this.state.shopSearch = shopSearchResult;
    },

    getShopSearchResult() {
        return this.state.shopSearch;
    },

    setSelectedShop(shop) {
        this.log(`Setting selected shop:`);
        this.log(shop);

        this.state.shop = shop;

        (async () => {
            await TescoShopCacheService.storeSelectedShop(this.state.shop);
        })();
    },

    async getSelectedShop() {
        if (this.state.shop === null) {
            const shop = await TescoShopCacheService.getSelectedShop();
            this.log(`Querying for cached Tesco shop. Found Tesco shop:`);
            this.log(shop);

            this.state.shop = shop;
        }

        return this.state.shop;
    },

    addToShoppingList(products) {
        this.log(`Adding ${Object.keys(products).length} product(s) to shopping list:`);
        this.log(products);

        this.state.shoppingList = { ...this.state.shoppingList, ...products };

        this.state.shoppingListOrder =
            this.state.shoppingListOrder.concat(Object.keys(products));

        (async () => {
            await ShoppingListCacheService.storeListAndOrder(
                this.state.shoppingList,
                this.state.shoppingListOrder);
        })();
    },

    removeFromShoppingList(tpnc) {
        this.log(`Removing item from shopping list with tpnc=${tpnc}`);

        delete this.state.shoppingList[tpnc];

        this.state.shoppingListOrder =
            this.state.shoppingListOrder.filter(p => p !== String(tpnc));

        (async () => {
            await ShoppingListCacheService.storeListAndOrder(
                this.state.shoppingList,
                this.state.shoppingListOrder);
        })();
    },

    async getShoppingList() {
        if (this.state.shoppingListOrder.length === 0) {
            const list = await ShoppingListCacheService.getList();

            if (list !== null) {
                this.state.shoppingList = list;
            }
        }

        return this.state.shoppingList;
    },

    async getShoppingListOrder() {
        if (this.state.shoppingListOrder.length === 0) {
            const order = await ShoppingListCacheService.getOrder();

            if (order !== null) {
                this.state.shoppingListOrder = order;
            }
        }

        return this.state.shoppingListOrder;
    }
}