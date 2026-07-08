export interface IUseShoppingList {
    readonly uncheckedItems: Array<IShoppingListItem>;
    readonly checkedItems: Array<IShoppingListItem>;
}

export interface IShoppingListItem {
    readonly tpnc: string;
    readonly name: string;
    readonly price: number;
    readonly imageUrl: string;
    quantity: number;
}

export function useShoppingList() {
    const storage = useState<IUseShoppingList>('shopping-list', () => ({
        uncheckedItems: [],
        checkedItems: [],
    }));

    const uncheckedLookup = new Map<string, IShoppingListItem>(storage.value.uncheckedItems.map(x => [x.tpnc, x]));
    const checkedLookup = new Map<string, IShoppingListItem>(storage.value.checkedItems.map(x => [x.tpnc, x]));

    function init(state: IUseShoppingList) {
        storage.value = state;

        watch(storage, () => {
            localStorage.setItem('useShoppingList', JSON.stringify(storage.value));
        }, {
            deep: true,
        });
    }

    function isChecked(tpnc: string) {
        return checkedLookup.has(tpnc);
    }

    function addItem(item: IShoppingListItem) {
        storage.value.uncheckedItems.push(item);
        uncheckedLookup.set(item.tpnc, item);
    }

    function removeItem(tpnc: string) {
        if (uncheckedLookup.has(tpnc)) {
            const index = storage.value.uncheckedItems.findIndex(x => x.tpnc === tpnc);
            storage.value.uncheckedItems.splice(index, 1);

            uncheckedLookup.delete(tpnc);
        }
        else {
            const index = storage.value.checkedItems.findIndex(x => x.tpnc === tpnc);
            storage.value.checkedItems.splice(index, 1);

            checkedLookup.delete(tpnc);
        }
    }

    function swapItem(item: IShoppingListItem) {
        if (uncheckedLookup.has(item.tpnc)) {
            removeItem(item.tpnc);

            storage.value.checkedItems.push(item);
            checkedLookup.set(item.tpnc, item);
        }
        else {
            removeItem(item.tpnc);

            storage.value.uncheckedItems.push(item);
            uncheckedLookup.set(item.tpnc, item);
        }
    }

    return {
        init,

        isChecked,

        addItem,
        removeItem,
        swapItem,

        uncheckedItems: computed(() => storage.value.uncheckedItems),
        checkedItems: computed(() => storage.value.checkedItems),
    };
}