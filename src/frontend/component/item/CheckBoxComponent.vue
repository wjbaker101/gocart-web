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
            <TickIcon v-if="modelValue" />
            <span>{{ label }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import TickIcon from '@/component/icon/TickIcon.vue';

export default defineComponent({
    name: 'CheckBoxComponent',

    components: {
        TickIcon,
    },

    props: {
        id: String,
        label: String,
        modelValue: Boolean,
    },

    setup(_, { emit }) {
        const checkboxInput = ref<HTMLInputElement | null>(null);

        return {
            checkboxInput,

            update(event: Event): void {
                if (!event || !event.target || checkboxInput.value === null)
                    return;

                emit('update:modelValue', checkboxInput.value.checked);
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
            }
        }

        .checkbox-label {
            position: relative;
            margin-right: 0.5rem;
            cursor: pointer;

            * > * {
                vertical-align: middle;
            }

            span {
                padding-left: 0.5rem;
                font-weight: normal;
            }

            .icon-tick {
                position: absolute;
                top: 50%;
                left: 4px;
                transform: translateY(-50%);
                color: theme(white);

                path {
                    stroke-dasharray: 600;
                    stroke-dashoffset: 600;
                    animation: tick-open animation(duration-mid) linear forwards;
                }

                @keyframes tick-open {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            }

            &::before {
                content: '';
                display: inline;
                padding-left: 1.25rem;
                border: 2px solid theme(primary);
                border-radius: layout(border-radius);
                background-color: theme(white);
            }
        }
    }
</style>
