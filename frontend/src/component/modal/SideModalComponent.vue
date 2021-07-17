<template>
    <component
        v-if="content !== null"
        :is="content"
        v-bind="contentProps"
        :isOpen="isOpen"
        @close="onClose"
    />
</template>

<script lang="ts">
import { DefineComponent, defineComponent, onMounted, onUnmounted, ref, shallowRef } from 'vue';

import { Event, eventService } from '@/service/Event.service';

export default defineComponent({
    name: 'SideModalComponent',

    setup() {
        const isOpen = ref<boolean>(false);
        const content = shallowRef<DefineComponent | null>(null);
        const contentProps = ref<any>();

        const onOpenModal = function (details: any) {
            contentProps.value = details.props;
            content.value = details.content;
            isOpen.value = true;
        };

        const onCloseModal = function () {
            isOpen.value = false;
        };

        onMounted(() => {
            eventService.subscribe(Event.OPEN_MODAL, onOpenModal);
            eventService.subscribe(Event.CLOSE_MODAL, onCloseModal);
        });

        onUnmounted(() => {
            eventService.unsubscribe(Event.OPEN_MODAL, onOpenModal);
            eventService.unsubscribe(Event.CLOSE_MODAL, onCloseModal);
        });

        return {
            isOpen,
            content,
            contentProps,

            onClose() {
                eventService.publish(Event.CLOSE_MODAL);
            },
        }
    },
})
</script>

<style lang="scss">
</style>