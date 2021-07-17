<template>
    <svg :width="size" :height="size" aria-hidden="true" class="icon icon-bin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <defs>
        <linearGradient id="bin-grad" x1="50%" y1="10%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ee3731;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ce1483;stop-opacity:1" />
        </linearGradient>
    </defs>
    <path :fill="colour" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
</template>

<script lang="ts">
import { useIcon, useIconProps } from '@/use/Icon.use';

export default {
    name: 'BinIcon',

    props: useIconProps(),

    setup(props: any) {
        return useIcon(props);
    },
}
</script>

<style lang="scss">
</style>
