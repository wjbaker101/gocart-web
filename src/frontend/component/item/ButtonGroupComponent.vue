<template>
    <div class="button-group-component">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ButtonComponent',

    setup() {
    },
})
</script>

<style lang="scss">
.button-group-component {

    .button-component {
        &:first-child {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        & + .button-component {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
}
</style>
