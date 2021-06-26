<template>
    <h2>Add Freetext</h2>
    <p>Include an item you would like without having to choose a specific Tesco product.</p>
    <label>
        <span>Item Name</span>
        <input type="text">
    </label>
    <p></p>
    <ButtonComponent>Add</ButtonComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ButtonComponent from '@/component/item/ButtonComponent.vue';

export default defineComponent({
    name: 'AddFreetextModalContentComponent',

    components: {
        ButtonComponent,
    },
})
</script>

<style lang="scss">
</style>
