<template>
    <div class="side-modal-content-component" :class="{ 'is-open': isOpen }">
        <div class="flex">
            <div class="flex-1"></div>
            <div class="cross-button flex-auto" @click="$emit('close')">
                <CrossIcon />
            </div>
        </div>
        <slot />
    </div>
    <ModalBackdropComponent :isVisible="isOpen" @close="$emit('close')" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ModalBackdropComponent from '@/component/modal/ModalBackdropComponent.vue';
import CrossIcon from '@/component/icon/CrossIcon.vue';

export default defineComponent({
    name: 'SideModalContentComponent',

    components: {
        ModalBackdropComponent,
        CrossIcon,
    },

    emits: [
        'close',
    ],

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
})
</script>

<style lang="scss">
.side-modal-content-component {
    padding: 1rem;
    margin-left: 1rem;
    position: fixed;
    top: 50%;
    right: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    background-color: theme(grey);
    border-top-left-radius: layout('border-radius');
    border-bottom-left-radius: layout('border-radius');
    transform: translate(100%, -50%);
    animation: open animation(duration-long);
    z-index: 12;
    transition: all animation(duration-long);

    &.is-open {
        opacity: 1;
        pointer-events: all;
        transform: translate(0, -50%);
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
            opacity: 0;
            transform: translate(100%, -50%);
        }

        100% {
            opacity: 1;
            transform: translate(0, -50%);
        }
    }
}
</style>
