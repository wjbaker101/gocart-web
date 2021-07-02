<template>
    <SideModalContentComponent @close="$emit('close')" @open="onOpen">
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
            <UserMessageComponent :message="onAddMessage" />
        </label>
        <p></p>
        <div class="flex gap-small">
            <ButtonComponent @click="onAdd">Add Freetext</ButtonComponent>
            <ButtonComponent isSecondary @click="$emit('close')">Cancel</ButtonComponent>
        </div>
    </SideModalContentComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { v4 as uuid } from 'uuid';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import UserMessageComponent from '@/component/item/UserMessageComponent.vue';
import SideModalContentComponent from '@/component/modal/SideModalContentComponent.vue';

import { Product } from '@/model/Product.model';

import { useUserMessage } from '@/use/UserMessage.use';
import { Event, eventService } from '@/service/Event.service';
import { useShoppingList } from '@/use/state/ShoppingList.use';

export default defineComponent({
    name: 'AddFreetextModalContentComponent',

    components: {
        ButtonComponent,
        UserMessageComponent,
        SideModalContentComponent,
    },

    setup() {
        const userMessage = useUserMessage();
        const shoppingList = useShoppingList();

        const freetextInput = ref<HTMLInputElement | null>(null);
        const freetext = ref<string>('');
        const onAddMessage = ref<string>('');

        onMounted(() => {
            freetextInput.value?.focus();
        });

        return {
            freetextInput,
            freetext,
            onAddMessage,

            onAdd() {
                if (freetext.value.length < 2) {
                    userMessage.set(onAddMessage, 'Freetext should be at least 2 characters long, please try again.');
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

                shoppingList.add(newProduct);

                freetext.value = '';

                eventService.publish(Event.CLOSE_MODAL);
            },

            onOpen() {
                freetextInput.value?.focus();
            },
        }
    },
})
</script>

<style lang="scss">
</style>
