<template>
    <div class="checkbox-component">
        <input ref="checkboxInput" :id="id" type="checkbox" :checked="value" @change="update">
        <label :for="id" class="checkbox-label">{{ label }}</label>
        <span class="check"></span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'CheckBoxComponent',

        props: ['id', 'label', 'value'],

        methods: {
            update(event: Event) {
                if (!event || !event.target) {
                    return;
                }

                const input = event.target as HTMLInputElement;

                this.$emit('input', input.checked);
            },
        },
    })
</script>

<style lang="scss">
    .checkbox-component {

        .checkbox-label {
            position: relative;
            padding: 0.5rem;
            margin: 0.5rem;
            margin-left: -0.5rem;

            &::before {
                content: '';
                display: inline-block;
                width: 1.25rem;
                height: 1.25rem;
                border: 2px solid theme(primary);
                border-radius: layout(border-radius);
                background-color: theme(white);
                cursor: pointer;
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 17px;
                left: 15px;
                pointer-events: none;
                opacity: 0;
                width: 6px;
                height: 11px;
                border-bottom: 2px solid theme(white);
                border-right: 2px solid theme(white);
                box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
                transform: rotate(45deg);
            }
        }

        input {
            display: none;
        }

        input:checked  {
            & + .checkbox-label {
                &::before {
                    background-color: theme(primary);
                }

                &::after {
                    opacity: 1;
                }
            }

            & + .check {
                opacity: 1;
            }
        }
    }
</style>
