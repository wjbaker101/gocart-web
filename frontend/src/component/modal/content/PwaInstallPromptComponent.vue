<template>
    <SideModalContentComponent @close="onClose">
        <h2>Install GoCart?</h2>
        <p>This will add an icon onto your home screen.</p>
        <div class="flex gap-small">
            <ButtonComponent isSecondary @click="onYes">Install GoCart</ButtonComponent>
            <ButtonComponent @click="onNo">Cancel</ButtonComponent>
        </div>
    </SideModalContentComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import SideModalContentComponent from '@/component/modal/SideModalContentComponent.vue';

export interface PwaInstallPromptComponentProps {
    yesAction: Function,
    noAction: Function,
}

export default defineComponent({
    name: 'PwaInstallPromptComponent',

    components: {
        ButtonComponent,
        SideModalContentComponent,
    },

    props: {
        event: {
            type: Object as PropType<BeforeInstallPromptEvent>,
            required: true,
        },
    },

    setup(props, { emit }) {
        const sharedAction = function () {
            emit('close');
        };

        return {
            onYes() {
                sharedAction();
                props.event.prompt();
            },

            onNo() {
                sharedAction();
            },

            onClose() {
                sharedAction();
            },
        }
    },
})
</script>

<style lang="scss">
</style>
