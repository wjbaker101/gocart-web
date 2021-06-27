<template>
    <SideModalContentComponent @close="onClose">
        <h2>Are You Sure?</h2>
        <p v-html="message"></p>
        <div class="flex gap-small">
            <ButtonComponent isSecondary @click="onYes">{{ yesMessage }}</ButtonComponent>
            <ButtonComponent @click="onNo">{{ noMessage }}</ButtonComponent>
        </div>
    </SideModalContentComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import SideModalContentComponent from '@/component/modal/SideModalContentComponent.vue';

export interface AreYouSureModalContentComponentProps {
    message: string,
    yesMessage: string,
    noMessage: string,
    yesAction: Function,
    noAction: Function,
}

export default defineComponent({
    name: 'AreYouSureModalContentComponent',

    components: {
        ButtonComponent,
        SideModalContentComponent,
    },

    props: {
        message: {
            type: String,
            required: true,
        },
        yesMessage: {
            type: String,
            required: true,
        },
        noMessage: {
            type: String,
            required: true,
        },
        yesAction: {
            type: Function,
            required: true,
        },
        noAction: {
            type: Function,
            required: true,
        },
    },

    setup(props: AreYouSureModalContentComponentProps, { emit }) {
        const sharedAction = function () {
            emit('close');
        };

        return {
            onYes() {
                sharedAction();
                props.yesAction();
            },

            onNo() {
                sharedAction();
                props.noAction();
            },

            onClose() {
                sharedAction();
                props.noAction();
            },
        }
    },
})
</script>

<style lang="scss">
</style>
