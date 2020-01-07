<template>
    <button class="button-component" :class="elementClass" @click="$emit('click', $event)">
        <slot />
    </button>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'ButtonComponent',

        props: ['isSecondary'],

        computed: {
            elementClass() {
                return {
                    'is-secondary': this.isSecondary,
                }
            },
        },
    })
</script>

<style lang="scss">
    .button-component {
        position: relative;
        padding: 0.5rem 1rem;
        font: inherit;
        font-weight: bold;
        letter-spacing: inherit;
        background-color: transparent;
        border-radius: layout(border-radius);
        border: 0;
        color: theme(white);
        cursor: pointer;
        z-index: 1;
        transition: all animation(duration-mid);

        @include box-shadow-small;

        /*
            Use pseudo-elements to add a background to the button, due to the
            "background" not being transitionable. Add the hover background
            style to a pseudo-element and change it's opacity when the button
            is hovered.
        */
        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: inherit;
            background-color: theme(primary);
            background: linear-gradient(-15deg, theme(primary-dark), theme(primary));
            z-index: -1;
            transition: opacity animation(duration-short);
        }

        &::after {
            opacity: 0;
            background: linear-gradient(-15deg, theme(primary-dark), theme(primary-dark));
        }

        &:hover {
            @include box-shadow-small-hover;

            &::after {
                opacity: 1;
            }
        }

        &.is-secondary {
            color: theme(white);
            border-top-color: theme(secondary);
            border-bottom-color: theme(secondary);

            &:focus {
                border-bottom-color: theme(primary);
            }

            &::before {
                background: linear-gradient(-15deg, theme(accent), theme(negative));
            }

            &::after {
                background: linear-gradient(-15deg, theme(accent-dark), theme(negative-dark));
            }
        }
    }
</style>