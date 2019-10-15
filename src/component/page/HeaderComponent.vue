<template>
    <header class="header-component">
        <div class="top-row">
            <div class="back-container" v-if="hasBackButton" @click="onBackClick">
                <LeftArrowIcon />
            </div>
            <h1>GoCart</h1>
            <div class="right-side">
                <slot name="right-side" />
            </div>
        </div>
        <div class="below">
            <slot name="below" />
        </div>
    </header>
</template>

<script>
    import LeftArrowIcon from '@/assets/icon/arrow-left.svg';

    export default {
        name: 'HeaderComponent',

        props: ['hasBackButton'],

        components: {
            LeftArrowIcon,
        },

        methods: {
            onBackClick() {
                this.$router.go(-1);
            },
        },
    }
</script>

<style lang="scss">
    .header-component {
        padding: 1rem;
        background-color: theme(primary);
        background: linear-gradient(-15deg, theme(secondary), theme(primary));
        color: theme(white);
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
        border-bottom-right-radius: layout(border-radius);
        border-bottom-left-radius: layout(border-radius);
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);

        svg {
            filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.7));
        }

        h1, h2, h3, h4, h5, h6 {
            color: inherit;
        }

        .top-row {
            display: flex;

            & > * {
                flex: 1;
                margin: auto 0;
            }
        }

        .back-container {
            margin: -1rem 0 -1rem -1rem;
            padding: 1rem;
            flex: 0 0 auto;
            cursor: pointer;
        }

        h1 {
            flex: 0 0 auto;
            margin: 0;
            font-size: 1.25rem;
        }

        .right-side {
            text-align: right;
        }
    }
</style>
