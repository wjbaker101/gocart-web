<template>
    <button class="button-component" :class="elementClass" @click="$emit('click', $event)">
        <slot />
    </button>
</template>

<script>
    export default {
        name: 'ButtonComponent',

        props: ['isSecondary'],

        computed: {
            elementClass() {
                return {
                    'is-secondary': this.isSecondary,
                }
            },
        },
    }
</script>

<style lang="scss">
    .button-component {
        padding: 0.5rem 1rem;
        font: inherit;
        font-weight: bold;
        letter-spacing: inherit;
        border-radius: layout(border-radius);
        background-color: theme(primary);
        border: 0;
        border-top: 3px solid theme(primary);
        border-bottom: 3px solid theme(primary);
        color: theme(white);
        cursor: pointer;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
        transition: all animation(duration-mid);

        &:hover {
            box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
            border-bottom-color: theme(secondary);
        }

        &:focus {
            border-bottom-color: theme(secondary);
        }

        &.is-secondary {
            background-color: theme(secondary);
            border-top-color: theme(secondary);
            border-bottom-color: theme(secondary);

            &:focus {
                border-bottom-color: theme(primary);
            }
        }
    }
</style>
