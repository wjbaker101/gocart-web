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

<script>
    export default {
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
    }
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
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-radius: layout(border-radius);
        transition: border-color animation(duration-mid);

        &:focus {
            border-bottom-color: theme(secondary);
        }
    }
</style>
