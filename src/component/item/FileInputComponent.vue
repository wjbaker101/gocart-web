<template>
    <div class="file-input-component">
        <input ref="fileInput" type="file" @change="onChange" :id="id">
        <label class="button-component" :for="id">
            <slot />
        </label>
    </div>
</template>

<script>
    export default {
        name: 'FileInputComponent',

        computed: {
            id() {
                return `file-input-${this._uid}`;
            },
        },

        methods: {
            onChange(event) {
                this.$emit('change', event, this.$refs.fileInput);
            },
        },
    }
</script>

<style lang="scss">
    .file-input-component {
        display: table;

        input {
            width: 0;
            height: 0;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;

            & + label {
                font-size: 1.25em;
                font-weight: 700;
                color: white;
                background-color: black;
                display: inline-block;
                cursor: pointer;
            }
        }
    }
</style>