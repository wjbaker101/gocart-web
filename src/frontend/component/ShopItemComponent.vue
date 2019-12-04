<template>
    <div class="shop-item-component" :class="{ 'is-expanded': isExpanded }">
        <div class="shop-container">
            <ShopIcon />
            <span class="shop-name">{{ shop.location.name }}</span>
        </div>
        <div class="expanded-container">
            <div class="expanded-content">
                <span class="shop-distance">{{ distance }}</span>
            </div>
            <ButtonComponent class="select-shop-button" @click.stop="onSelectClick">Select</ButtonComponent>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import ShopIcon from '@frontend/assets/icon/shop.svg';

    import ButtonComponent from '@frontend/component/item/ButtonComponent.vue';

    export default Vue.extend({
        name: 'ShopItemComponent',

        props: ['shop', 'isExpanded'],

        components: {
            ShopIcon,
            ButtonComponent,
        },

        computed: {
            distance(): string {
                const distanceFrom = this.shop.distanceFrom;

                return `${distanceFrom.value.toFixed(1)} ${distanceFrom.unit} away`;
            },
        },

        methods: {
            onSelectClick(): void {
                this.$root.$data.setSelectedShop(this.shop);
                this.$router.push({ path: '/shop' });
            },
        },
    })
</script>

<style lang="scss">
    .shop-item-component {
        padding: 1rem;
        border-radius: layout(border-radius);
        background-color: theme(white);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: height 0.5s;

        & + .shop-item-component {
            margin-top: 0.5rem;
        }

        &:hover,
        &.is-expanded {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2);
        }

        .expanded-container {
            display: none;
        }

        &.is-expanded {
            .expanded-container {
                display: initial;
            }

            .shop-container {
                /*
                    Add additional padding to replace gap from the line-height
                    that has been removed.

                    This was calculated by doing:
                    (original_line_height - new_line_height) / 2
                */
                padding-top: 0.3em;
            }

            .shop-name {
                font-weight: bold;
                white-space: initial;

                /*
                    Reduce line-height to fix multiple lines having a too large
                    of a gap.
                */
                line-height: 1.2em;
            }
        }

        .shop-container {
            display: flex;

            & > * {
                margin: auto 0;
            }
        }

        .shop-name {
            margin-left: 1rem;
            overflow-x: hidden;
            white-space: nowrap;
        }

        .shop-distance {
            color: theme(primary);
        }

        .expanded-content {
            margin-left: 2rem;
            margin-bottom: 1rem;
        }

        .select-shop-button {
            width: 100%;
        }
    }
</style>