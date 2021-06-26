<template>
    <h2>Add Freetext</h2>
    <p>Include an item you would like without having to search for a specific product.</p>
    <label>
        <span>Item Name</span>
        <input
            ref="freetextInput"
            type="text"
            v-model="freetext"
            placeholder="Dairy Free Pesto"
            @keyup.enter="onAdd"
        >
        <UserMessageComponent :message="userMessage" />
    </label>
    <p></p>
    <ButtonComponent @click="onAdd">Add</ButtonComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { v4 as uuid } from 'uuid';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import UserMessageComponent from '@/component/item/UserMessageComponent.vue';

import { AppState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { Product } from '@/model/Product.model';

import { UseUserMessage } from '@/use/UserMessage.use';
import { Event, eventService } from '@/service/Event.service';

export default defineComponent({
    name: 'AddFreetextModalContentComponent',

    components: {
        ButtonComponent,
        UserMessageComponent,
    },

    setup() {
        const store = useStore<AppState>();
        const useUserMessage = UseUserMessage();

        const freetextInput = ref<HTMLInputElement | null>(null);
        const freetext = ref<string>('');
        const userMessage = ref<string>('');

        onMounted(() => {
            freetextInput.value?.focus();
        });

        return {
            freetextInput,
            freetext,
            userMessage,

            onAdd() {
                if (freetext.value.length < 2) {
                    useUserMessage.set(userMessage, 'Freetext should be at least 2 characters long, please try again.');
                    return;
                }

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
