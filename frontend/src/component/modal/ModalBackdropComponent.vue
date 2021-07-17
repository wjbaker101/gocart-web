<template>
    <div class="modal-backdrop-component" :class="{ 'is-visible': isVisible }" :style="{ 'z-index': zIndex }" @click="onClose"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModalBackdropComponent',

    emits: [
        'close',
    ],

    props: {
        isVisible: Boolean,
        zIndex: {
            type: Number,
            required: false,
            default: 11,
        },
    },

    setup(_, { emit }) {
        return {
            onClose() {
                emit('close');
            },
        }
    },
})
</script>

<style lang="scss">
.modal-backdrop-component {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(10, 10, 40, 0.5);
    opacity: 0;
    pointer-events: none;

    &.is-visible {
        opacity: 1;
        pointer-events: all;
    }
}
</style>
