<template>
    <svg :width="size" :height="size" aria-hidden="true" class="icon icon-tick" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="m50.524 238.6 148.72 148.72 262.23-262.23" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="80" fill="none" />
    </svg>
</template>

<script lang="ts">
import { useIcon, useIconProps } from '@/use/Icon.use';

export default {
    name: 'TickIcon',

    props: useIconProps(),

    setup(props: any) {
        return useIcon(props);
    },
}
</script>

<style lang="scss"></style>
