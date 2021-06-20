<template>
    <div class="checkbox-component flex align-center">
        <input
            ref="checkboxInput"
            :id="id"
            type="checkbox"
            :checked="modelValue"
            @change="update"
        >
        <label :for="id" class="checkbox-label">
            <span>{{ label }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue';

export default defineComponent({
    name: 'CheckBoxComponent',

    props: {
        id: String,
        label: String,
        modelValue: Boolean,
    },

    setup(props: any, context: SetupContext) {
        const checkboxInput = ref<HTMLInputElement | null>(null);

        return {
            checkboxInput,

            update(event: Event): void {
                if (!event || !event.target || checkboxInput.value === null) {
                    return;
                }

                context.emit('update:modelValue', checkboxInput.value.checked);
            },
        }
    },
})
</script>

<style lang="scss">
    .checkbox-component {

        input {
            display: none;
        }

        input:checked  {
            & + .checkbox-label {
                &::before {
                    background: linear-gradient(-15deg, theme(primary-dark), theme(primary));
                }

                &::after {
                    opacity: 1;
                }
            }
        }

        .checkbox-label {
            position: relative;
            cursor: pointer;

            * > * {
                vertical-align: middle;
            }

            span {
                padding-left: 0.5rem;
                font-weight: normal;
            }

            &::before {
                content: '';
                display: inline;
                padding-left: 1.25rem;
                border: 2px solid theme(primary);
                border-radius: layout(border-radius);
                background-color: theme(white);
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 5px;
                left: 9px;
                pointer-events: none;
                opacity: 0;
                width: 6px;
                height: 11px;
                border-bottom: 2px solid theme(white);
                border-right: 2px solid theme(white);
                transform: rotate(45deg);
            }
        }
    }
</style>
