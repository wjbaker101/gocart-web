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
    import { ITescoProduct } from '@frontend/interface/ITescoProduct';

    export default Vue.extend({
        name: 'SearchSortComponent',

        props: ['isVisible'],

        methods: {
            onSortChange(type: string): void {
                const options: Record<string, Function> = {
                    alphabetical(a: ITescoProduct, b: ITescoProduct) {
                        if(a.name < b.name) {
                            return -1;
                        }

                        if(a.name > b.name) {
                            return 1;
                        }

                        return 0;
                    },

                    price(a: ITescoProduct, b: ITescoProduct) {
                        return b.price - a.price;
                    },

                    // health(a: ITescoProduct, b: ITescoProduct) {
                    //     console.log('Sorting by healthScore.');

                    //     return b.healthScore - a.healthScore;
                    // },
                };

                this.$emit('sortChange', options[type]);
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