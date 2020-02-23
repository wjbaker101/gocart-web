<template>
    <div class="popup-component" :class="{ 'is-visible': isVisible }">
        <div class="popup-content">
            <SortIcon />
            <span v-html="message"></span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { EventService, Events } from '@frontend/service/EventService';

    import SortIcon from '@frontend/assets/icon/sort-amounts.svg';

    export default Vue.extend({
        name: 'PopupComponent',

        components: {
            SortIcon,
        },

        data() {
            return {
                message: null,
                isVisible: false,
                timeout: null,
                showTime: 3000,
            }
        },

        created(): void {
            EventService.$on(Events.EVENT_POPUP_SHOW, (message: string) => {
                this.showPopup(message);
            });
        },

        methods: {
            showPopup(message: string): void {
                this.message =  message;
                this.isVisible = true;

                clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.hidePopup();
                }, this.showTime);
            },

            hidePopup(): void {
                this.isVisible = false;
            },
        },
    })
</script>

<style lang="scss">
    .popup-component {
        position: fixed;
        padding: 0 1rem;
        bottom: 6rem;
        left: 0;
        right: 0;
        transform: translateY(1rem);
        opacity: 0;
        pointer-events: none;
        z-index: 5;
        transition: opacity animation(duration-mid), transform animation(duration-short);

        &.is-visible {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }

        .popup-content {
            min-width: 8rem;
            display: table;
            margin: 0 auto;
            padding: 0.5rem 1rem;
            color: theme(white);
            background-color: theme(primary);
            border-radius: layout(border-radius);

            @include box-shadow-small;

            .icon {
                margin-right: 0.5rem;
            }
        }
    }
</style>