<template>
    <NuxtLink
        :to="page"
        :class="{
            'border-b-primary': isActive,
            'border-b-transparent': !isActive,
        }"
        class="group hover:bg-blue-50 p-4 border-t-2 border-t-transparent border-b-2 leading-4"
    >
        <div class="group-active:scale-95">
            <slot></slot>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
const { page } = defineProps<{
    page: string;
}>();

const route = useRoute();

const isActive = computed(() => route.path === page);
</script>