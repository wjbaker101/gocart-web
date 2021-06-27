<template>
    <svg :width="size" :height="size" aria-hidden="true" class="icon icon-sort" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path :fill="colour" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path></svg>
</template>

<script lang="ts">
import { useIcon, useIconProps } from '@/use/UseIcon.use';

export default {
    name: 'SortIcon',

    props: useIconProps(),

    setup(props: any) {
        return useIcon(props);
    },
}
</script>

<style lang="scss">
</style>
