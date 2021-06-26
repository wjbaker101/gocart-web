<template>
    <h2>Add Freetext</h2>
    <p>Include an item you would like without having to search for a specific product.</p>
    <label>
        <span>Item Name</span>
        <input ref="freetextInput" type="text" v-model="freetext" placeholder="Dairy Free Pesto">
    </label>
    <p></p>
    <ButtonComponent @click="onAdd">Add</ButtonComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { v4 as uuid } from 'uuid';

import ButtonComponent from '@/component/item/ButtonComponent.vue';

import { AppState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { Product } from '@/model/Product.model';
import { Event, eventService } from '@/service/Event.service';

export default defineComponent({
    name: 'AddFreetextModalContentComponent',

    components: {
        ButtonComponent,
    },

    setup() {
        const store = useStore<AppState>();

        const freetextInput = ref<HTMLInputElement | null>(null);
        const freetext = ref<string>('');

        onMounted(() => {
            freetextInput.value?.focus();
        });

        return {
            freetextInput,
            freetext,

            onAdd() {
                const newProduct: Product = {
                    id: uuid(),
                    name: freetext.value,
                    isFreetext: true,
                    listQuantity: 1,
                    isChecked: false,
                    addCount: 1,

                    price: 0,
                    imageUrl: '',
                    description: '',
                    department: '',
                    superDepartment: '',
                };

                store.dispatch(StateKeys.SHOPPING_LIST_PRODUCTS_ADD, newProduct);

                freetext.value = '';

                eventService.publish(Event.CLOSE_MODAL);
            },
        }
    },
})
</script>

<style lang="scss">
</style>
