<template>
    <header class="header-component">
        <div class="top-row">
            <h1>GoCart</h1>
            <div class="right-side">
                <slot name="right-side" />
            </div>
        </div>
        <div class="below">
            <slot name="below" />
        </div>
    </header>
</template>

<script>
    export default {
        name: 'HeaderComponent',

        props: ['currentView'],

        data() {
            return {
                shoppingListTotalPrice: null,
            }
        },

        methods: {
            onViewChange(view) {
                if (view === 'shopping_list') {
                    const shoppingList = this.$root.$data.getShoppingList();

                    const totalPrice = Object.values(shoppingList)
                        .map(p => p.price * p.quantity)
                        .reduce((total, p) => total + p);

                    this.shoppingListTotalPrice = totalPrice.toFixed(2);
                }
            },
        },

        watch: {
            currentView(to, from) {
                this.onViewChange(to);
            },
        },
    }
</script>

<style lang="scss">
    .header-component {
        padding: 2rem 1rem;
        background-color: theme(primary);
        color: theme(white);
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);

        h1, h2, h3, h4, h5, h6 {
            color: inherit;
        }

        .top-row {
            display: flex;

            & > * {
                flex: 1;
                margin: auto 0;
            }
        }

        h1 {
            flex: 0 0 auto;
            margin: 0;
            font-size: 1.25rem;
        }

        .right-side {
            text-align: right;
        }
    }
</style>
