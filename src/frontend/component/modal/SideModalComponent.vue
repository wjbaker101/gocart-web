<template>
    <div class="side-modal-component" :class="{ 'is-open': isOpen }">
        <div class="flex">
            <div class="flex-1"></div>
            <div class="cross-button flex-auto" @click="onBackdropClose">
                <CrossIcon />
            </div>
        </div>
        <component v-if="content !== null" :is="content" />
    </div>
    <ModalBackdropComponent :isVisible="isOpen" @close="onBackdropClose" />
</template>

<script lang="ts">
import { defineComponent, DefineComponent, onMounted, onUnmounted, ref, shallowRef } from 'vue';

import ModalBackdropComponent from '@/component/modal/ModalBackdropComponent.vue';
import CrossIcon from '@/component/icon/CrossIcon.vue';

import { Event, eventService } from '@/service/Event.service';

export default defineComponent({
    name: 'SideModalComponent',

    components: {
        ModalBackdropComponent,
        CrossIcon,
    },

    setup() {
        const isOpen = ref<boolean>(false);
        const content = shallowRef<DefineComponent | null>(null);

        const onOpenModal = function (details: any) {
            isOpen.value = true;
            content.value = details.content;
        };

        const onCloseModal = function () {
            isOpen.value = false;
            content.value = null;
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

            onBackdropClose() {
                eventService.publish(Event.CLOSE_MODAL);
            },
        }
    },
})
</script>

<style lang="scss">
.side-modal-component {
    padding: 1rem;
    margin-left: 1rem;
    position: fixed;
    top: 50%;
    right: 0;
    opacity: 0;
    pointer-events: none;
    background-color: theme(grey);
    border-top-left-radius: layout('border-radius');
    border-bottom-left-radius: layout('border-radius');
    transform: translateY(-50%);
    z-index: 12;

    &.is-open {
        opacity: 1;
        pointer-events: all;
        animation: open animation(duration-long);
    }

    & > h2 {
        margin-top: 0;
    }

    .cross-button {
        margin: -1rem;
        padding: 1rem;
        color: theme(grey-dark);
        cursor: pointer;
        border-bottom-left-radius: layout(border-radius);
        line-height: 0;
        transition: all animation(duration-short);

        &:hover {
            color: theme(black);
            background-color: theme(grey-dark);
        }
    }

    @keyframes open {
        0% {
            transform: translate(100%, -50%);
        }

        100% {
            transform: translate(0, -50%);
        }
    }
}
</style>