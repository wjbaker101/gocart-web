<template>
    <h2>Are You Sure?</h2>
    <p v-html="message"></p>
    <div class="flex gap-small">
        <ButtonComponent isSecondary @click="onYes">{{ yesMessage }}</ButtonComponent>
        <ButtonComponent @click="onNo">{{ noMessage }}</ButtonComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import { Event, eventService } from '@/service/Event.service';

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

    setup(props: AreYouSureModalContentComponentProps) {
        const sharedAction = function () {
            eventService.publish(Event.CLOSE_MODAL);
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
        }
    },
})
</script>

<style lang="scss">
</style>
