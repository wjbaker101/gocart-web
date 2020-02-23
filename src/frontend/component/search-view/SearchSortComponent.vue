<template>
    <div class="search-sort-component" :class="{ 'is-visible': isVisible }">
        <ul>
            <li @click="onSortChange('alphabetical')">Alphabetical</li>
            <li @click="onSortChange('price')">Price</li>
            <li @click="onSortChange('health')">Health</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { EventService, Events } from '@frontend/service/EventService';

    import { ITescoProduct } from '@frontend/interface/ITescoProduct';

    export default Vue.extend({
        name: 'SearchSortComponent',

        props: ['isVisible'],

        methods: {
            onSortChange(type: string): void {
                const options: Record<string, any> = {
                    alphabetical: {
                        func(a: ITescoProduct, b: ITescoProduct): number {
                            if(a.name < b.name) {
                                return -1;
                            }

                            if(a.name > b.name) {
                                return 1;
                            }

                            return 0;
                        },
                        message: '<span>Sorted in</span> <strong>alphabetical</strong> <span>order!</span>',
                    },

                    price: {
                        func(a: ITescoProduct, b: ITescoProduct): number {
                            return a.price - b.price;
                        },
                        message: '<span>Sorted in</span> <strong>price</strong> <span>order!</span>',
                    },

                    health: {
                        func(a: ITescoProduct, b: ITescoProduct): number {
                            if (!a.productData || !b.productData) {
                                return 0;
                            }

                            return b.productData.healthScore - a.productData.healthScore;
                        },
                        message: '<span>Sorted in</span> <strong>health</strong> <span>order!</span>',
                    },
                };

                const option = options[type];

                EventService.$emit(Events.EVENT_POPUP_SHOW, option.message);

                this.$emit('sortChange', option.func);
            },
        },
    })
</script>

<style lang="scss">
    .search-sort-component {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 1rem;
        transform: translateY(100%);
        z-index: 10;
        text-align: initial;
        background-color: theme(white);
        color: theme(black);
        border-left: 3px solid theme(secondary);
        border-radius: layout(border-radius);
        box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
        pointer-events: none;
        opacity: 0;

        &.is-visible {
            opacity: 1;
            pointer-events: all;
        }

        ul {
            padding: 0;
            list-style: none;
        }
    }
</style>