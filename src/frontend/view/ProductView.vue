<template>
    <PageContainerComponent :backButton="product !== null">
        <template #header-bottom v-if="product !== null">
            <h3 class="header-product-view-product-name">{{ product.name }}</h3>
        </template>
        <div v-if="product === null">
            <section class="zero-state">
                <NoProductFoundIcon massive />
                <p><strong>I don't know what product to show!</strong></p>
                <p>Please go back to another page and retry.</p>
            </section>
        </div>
        <div class="product-view" v-else>
            <section class="text-centered">
                <img width="225" height="225" class="product-image" :src="displayImageUrl">
            </section>
            <section class="text-centered">
                <h2 class="product-price">{{ displayPrice }}</h2>
            </section>
            <section class="text-centered">
                <p class="department-breadcrumbs">
                    <small>{{ product.superDepartment }}</small>
                    <ChevronRightIcon small />
                    <span>{{ product.department }}</span>
                </p>
            </section>
            <section class="actions-section">
                <CheckBoxComponent
                    id="added-to-list-checkbox"
                    type="checkbox"
                    v-model="isChecked"
                    :label="displayAddToListLabel"
                />
                <div class="actions-group flex align-center" v-if="isChecked">
                    <div class="flex-1">
                        <input
                            type="number"
                            v-model="product.listQuantity"
                            :min="quantityConstraints.min"
                            :max="quantityConstraints.max"
                        >
                    </div>
                    <div class="flex-auto">
                        <ButtonGroupComponent>
                            <ButtonComponent
                                isSecondary
                                @click="onChangeQuantity(-1)"
                            >
                                -
                            </ButtonComponent>
                            <ButtonComponent
                                class="add-quantity-button"
                                @click="onChangeQuantity(1)"
                            >
                                +
                            </ButtonComponent>
                        </ButtonGroupComponent>
                    </div>
                </div>
            </section>
            <section class="background" v-if="product.guidelineDailyAmounts">
                <p :key="`gda-header-${index}`" v-for="(header, index) in product.guidelineDailyAmounts.headers">
                    <small>{{ header }}:</small>
                </p>
                <div class="flex text-centered">
                    <div
                        class="flex-1"
                        :key="`gda-${index}`"
                        v-for="(amount, index) in product.guidelineDailyAmounts.amounts"
                    >
                        <div>
                            <strong>{{ amount.name }}</strong>
                        </div>
                        <div>
                            <div class="gda-blob" :class="{ [amount.rating?.toLowerCase() ?? 'no-rating']: true }">
                                <span v-if="amount.percent">{{ amount.percent }}%</span>
                            </div>
                            <p>{{ amount.values.join(' / ') }}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="background" v-if="displayIngredients">
                <h2>Ingredients</h2>
                <p v-html="product.ingredients"></p>
            </section>
            <section class="background" v-if="product.nutrition">
                <h2>Nutrition</h2>
                <table>
                    <thead>
                        <tr class="text-right">
                            <th></th>
                            <th>{{ product.nutrition.per100gHeader }}</th>
                            <th>{{ product.nutrition.perServingHeader }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(nutrient, index) in product.nutrition.nutrients" :key="`nutrient-${index}`">
                            <td>{{ nutrient.name }}</td>
                            <td class="numerical">{{ nutrient.valuePer100g.toFixed(1) }}</td>
                            <td class="numerical">{{ nutrient.valuePerServing.toFixed(1) }}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, readonly, ref, watch } from 'vue';

import PageContainerComponent from '@/component/PageContainerComponent.vue';
import ButtonComponent from '@/component/item/ButtonComponent.vue';
import ButtonGroupComponent from '@/component/item/ButtonGroupComponent.vue';
import CheckBoxComponent from '@/component/item/CheckBoxComponent.vue';
import AreYouSureModalContentComponent, { AreYouSureModalContentComponentProps } from '@/component/modal/content/AreYouSureModalContentComponent.vue';
import ChevronRightIcon from '@/component/icon/ChevronRightIcon.vue';
import NoProductFoundIcon from '@/component/icon/ExclamationCircleIcon.vue';

import { useCurrentProduct } from '@/use/state/CurrentProduct.use';
import { useScrollPosition } from '@/use/ScrollPosition.use';
import { useShoppingList } from '@/use/state/ShoppingList.use';
import { Event, eventService } from '@/service/Event.service';

import { Product } from '@/model/Product.model';

export default defineComponent({
    name: 'ProductView',

    components: {
        PageContainerComponent,
        ButtonComponent,
        ButtonGroupComponent,
        CheckBoxComponent,
        ChevronRightIcon,
        NoProductFoundIcon,
    },

    setup() {
        useScrollPosition('ProductView');
        const currentProduct = useCurrentProduct();
        const shoppingList = useShoppingList();

        const product = computed<Product | null>(() => currentProduct.product.value);

        const isChecked = ref<boolean>(false);

        const displayImageUrl = computed<string | null>(
            () => product.value?.imageUrl.replace('90x90', '225x225') || '');

        const displayPrice = computed<string>(
            () => `£${product.value?.price.toFixed(2)}`);

        const quantityConstraints = readonly<{ min: number, max: number, }>({
            min: 1,
            max: 1000,
        });

        const displayAddToListLabel = computed<string>(
            () => isChecked.value ? 'Remove from List' : 'Add to List');

        const displayIngredients = computed<string>(() => {
            if (!product.value || !product.value.ingredients)
                return '';

            return product.value.ingredients.join('<br>');
        });

        onBeforeMount(() => {
            if (product.value !== null)
                isChecked.value = shoppingList.isInShoppingList(product.value);

            watch(isChecked, () => {
                if (product.value === null)
                    return;

                if (isChecked.value) {
                    shoppingList.add(product.value);
                }
                else {
                    eventService.publish(Event.OPEN_MODAL, {
                        content: AreYouSureModalContentComponent,
                        props: <AreYouSureModalContentComponentProps>{
                            message: `Remove <strong>${product.value.name}</strong> from your shopping list?`,
                            yesMessage: 'Remove',
                            noMessage: 'Cancel',
                            yesAction: () => {
                                if (product.value === null)
                                    return;

                                shoppingList.remove(product.value);
                            },
                            noAction: () => {
                                isChecked.value = true;
                            },
                        },
                    });
                }
            });
        });

        return {
            product,
            isChecked,
            displayImageUrl,
            displayPrice,
            displayAddToListLabel,
            quantityConstraints,
            displayIngredients,

            onChangeQuantity(change: number) {
                if (product.value === null)
                    return;

                const prevQuantity = Number(product.value.listQuantity);
                const newQuantity = prevQuantity + change;

                if (newQuantity < quantityConstraints.min)
                    return;

                if (newQuantity > quantityConstraints.max)
                    return;

                product.value.listQuantity = newQuantity;

                shoppingList.update(product.value);
            },
        }
    },
})
</script>

<style lang="scss">
.header-product-view-product-name {
    margin: 0;
    text-align: center;
}

.product-view {

    .product-image {
        margin-top: 0.5rem;
        border-radius: layout(border-radius);
    }

    .product-price {
        margin-bottom: 0.5rem;
    }

    .department-breadcrumbs {
        margin-top: 0;

        .icon-chevron-right {
            margin: 0 0.25rem;
        }
    }

    .actions-section {
        padding-bottom: 1rem;
    }

    .actions-group {
        margin-top: 0.5rem;

        & > * + * {
            margin-left: 0.5rem;
        }
    }

    .add-quantity-button {
        width: 64px;
    }

    .gda-blob {
        width: 3rem;
        height: 3rem;
        display: table;
        margin: 0.5rem auto;
        border-radius: 50%;
        color: theme(white);
        line-height: 3rem;

        &.no-rating {
            color: theme(black);
            box-shadow: 0 0 2px #222;
        }

        &.low {
            $colour: #44b827;

            background-color: $colour;
            box-shadow: 0 0 1px $colour;
        }

        &.medium {
            $colour: #b87927;

            background-color: $colour;
            box-shadow: 0 0 1px $colour;
        }

        &.medium {
            $colour: #b82727;

            background-color: $colour;
            box-shadow: 0 0 1px $colour;
        }
    }
}
</style>
