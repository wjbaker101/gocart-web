<template>
    <input
        ref="numberInput"
        class="number-input-component"
        type="number"
        :value="value"
        :min="min"
        :max="max"
        @input="update">
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'NumberInputComponent',

        props: ['value', 'min', 'max'],

        methods: {
            update() {
                this.$emit('input', this.$refs.numberInput.value);
            },
        },
    })
</script>

<style lang="scss">
    .number-input-component {
        min-width: 0;
        padding: 0.5rem 1rem;
        border: 0;
        font: inherit;
        letter-spacing: inherit;
        border-radius: layout(border-radius);
        border-bottom: 3px solid theme(white);
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25) inset;
        transition: box-shadow animation(duration-mid);

        &:focus {
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5) inset;
            border-bottom: 3px solid theme(secondary);
        }
    }
</style>
