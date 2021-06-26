<template>
    <div class="product-component flex align-center" @click="onSelect">
        <div class="flex-auto" v-if="!forSearch">
            <CheckBoxComponent
                :id="`checked-checkbox-${product.id}`"
                type="checkbox"
                v-model="isChecked"
                @click.stop="() => {}"
            />
        </div>
        <div v-if="!product.isFreetext" class="flex-auto">
            <img
                width="50"
                height="50"
                class="product-image"
                :src="product.imageUrl"
            >
        </div>
        <div v-else class="image-placeholder flex flex-auto">
            <CutleryIcon />
        </div>
        <div class="product-name flex-1">
            {{ product.name }}
        </div>
        <div v-if="!product.isFreetext" class="product-price flex-auto">
            {{ displayPrice }}
            <strong v-if="product.listQuantity > 1">
                &times;{{ product.listQuantity }}
            </strong>
        </div>
        <div v-else class="remove-button flex-auto" @click.stop="onRemove">
            <CrossIcon />
        </div>
        <div class="add-to-list-container flex-auto" v-if="forSearch">
            <div class="icon-container" @click.stop="isChecked = !isChecked">
                <BinIcon v-if="isChecked" colour="url(#bin-grad)" />
                <PlusIcon v-else />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import CheckBoxComponent from '@/component/item/CheckBoxComponent.vue';
import AreYouSureModalContentComponent, { AreYouSureModalContentComponentProps } from '@/component/modal/content/AreYouSureModalContentComponent.vue';
import BinIcon from '@/component/icon/BinIcon.vue';
import CrossIcon from '@/component/icon/CrossIcon.vue';
import CutleryIcon from '@/component/icon/CutleryIcon.vue';
import PlusIcon from '@/component/icon/PlusIcon.vue';

import {
    UseShoppingListChecked,
    UseForSeachChecked,
} from '@/use/ProductChecked.use';

import { AppState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { Product } from '@/model/Product.model';
import { Event, eventService } from '@/service/Event.service';

interface ProductComponentProps {
    product: Product,
    forSearch: Boolean,
}

export default defineComponent({
    name: 'ProductComponent',

    components: {
        CheckBoxComponent,
        AreYouSureModalContentComponent,
        BinIcon,
        CrossIcon,
        CutleryIcon,
        PlusIcon,
    },

    props: {
        product: {
            type: Object as PropType<Product>,
            required: true,
        },
        forSearch: Boolean,
    },

    setup(props: ProductComponentProps) {
        const router = useRouter();
        const store = useStore<AppState>();

        const isChecked = props.forSearch
            ? UseForSeachChecked(props.product).isChecked
            : UseShoppingListChecked(props.product).isChecked;

        const displayPrice = computed<string>(
            () => `£${props.product.price.toFixed(2)}`);

        return {
            isChecked,
            displayPrice,

            onSelect() {
                store.dispatch(StateKeys.CURRENT_PRODUCT_SET, props.product);
                router.push({ path: '/product', });
            },

            onRemove() {
                eventService.publish(Event.OPEN_MODAL, {
                    content: AreYouSureModalContentComponent,
                    props: <AreYouSureModalContentComponentProps>{
                        message: `Remove <strong>${props.product.name}</strong> from your shopping list?`,
                        yesMessage: 'Delete Freetext',
                        noMessage: 'Cancel',
                        yesAction: () => {
                            store.dispatch(StateKeys.SHOPPING_LIST_PRODUCTS_REMOVE, props.product.id);
                        },
                        noAction: () => {},
                    },
                });
            },
        }
    },
})
</script>

<style lang="scss">
.product-component {
    position: relative;
    padding: 0.5rem;
    background-color: theme(white);
    cursor: pointer;
    user-select: none;

    &:first-child {
        border-top-right-radius: layout(border-radius);
        border-top-left-radius: layout(border-radius);
    }

    &:last-child {
        border-bottom-right-radius: layout(border-radius);
        border-bottom-left-radius: layout(border-radius);
    }

    &.is-dragged,
    &.sortable-chosen {
        box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.1);
        z-index: 1;
    }

    &.is-dragged,
    &.sortable-chosen {
        border-radius: layout(border-radius);
        border: 2px solid theme(secondary);
    }

    .product-image {
        margin-left: 0.5rem;
        border-radius: layout(border-radius);
    }

    .product-name {
        padding-left: 0.5rem;
        overflow-x: hidden;
        white-space: nowrap;
    }

    .product-price {
        padding-left: 0.25rem;
        box-shadow: -2px 0 4px 0.5rem theme(white);
    }

    .add-to-list-container {
        margin-left: 0.5rem;
        line-height: 0;

        .icon-container {
            padding: 0.5rem;
        }

        .icon {
            filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
        }

        .icon-plus {
            color: theme(primary);
        }

        .icon-bin {
            color: theme(negative);
        }
    }

    .image-placeholder {
        width: 50px;
        height: 50px;
        color: theme(primary-light);

        .icon {
            margin: auto;
        }
    }

    .remove-button {
        padding: 1rem;
        margin: -1rem 0;
        line-height: 0;
        color: theme(grey-dark);
        border-radius: layout(border-radius);

        &:hover {
            background-color: theme(grey);
            color: theme(black);
        }
    }
}
</style>