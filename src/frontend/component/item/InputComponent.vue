<template>
    <input
        ref="inputElement"
        class="input-component"
        :type="inputType"
        :value="value"
        :placeholder="placeholder"
        @input="onInputChange"
        @keyup.enter="onEnter">
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'InputComponent',

        props: ['value', 'isPassword', 'placeholder'],

        computed: {
            inputType: function() {
                return this.isPassword ? 'password' : 'text';
            },
        },

        methods: {
            onInputChange() {
                this.$emit('input', this.$refs.inputElement.value);
            },

            onEnter() {
                this.$emit('enter', this.$refs.inputElement.value);
            },
        },
    })
</script>

<style lang="scss">
    .input-component {
        width: 100%;
        padding: 0.5rem;
        font: inherit;
        line-height: 1em;
        letter-spacing: inherit;
        background-color: theme(white);
        border: 0;
        border: 2px solid transparent;
        border-radius: layout(border-radius);
        transition: border-color animation(duration-mid);

        box-shadow:
            1px -2px 4px rgba(0, 0, 0, 0.25),
            -2px -2px 12px rgba(0, 0, 0, 0.1) inset;

        &:focus {
            border-color: theme(accent);
        }
    }
</style>
