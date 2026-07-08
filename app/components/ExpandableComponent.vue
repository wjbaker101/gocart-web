<template>
    <div
        :class="{
            'grid-rows-[1fr]': isOpen,
            'grid-rows-[0fr]': !isOpen,
        }"
        class="grid overflow-hidden"
    >
        <div class="min-h-0">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean;
}>();
</script>