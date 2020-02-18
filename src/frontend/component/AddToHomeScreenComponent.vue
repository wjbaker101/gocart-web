<template>
    <div class="add-to-home-screen-component"
            @click="showPrompt"
            :class="{ 'is-visible': showButton }">
        <span class="home-icon">
            <DownloadIcon />
        </span>
        <span>Install App</span>
        <span class="close-icon" @click="hidePrompt">
            <CloseIcon />
        </span>
    </div>
</template>

<script lang="ts">
    /* eslint-disable no-console */

    import Vue from 'vue';

    import { VueInstallMixin, BeforeInstallPromptEvent } from 'vue-pwa-install';

    import CloseIcon from '@frontend/assets/icon/times.svg';
    import DownloadIcon from '@frontend/assets/icon/download.svg';

    export default Vue.extend({
        name: 'AddToHomeScreenComponent',

        mixins: [
            VueInstallMixin,
        ],

        components: {
            CloseIcon,
            DownloadIcon,
        },

        data() {
            return {
                showButton: false,
                promptEvent: null as BeforeInstallPromptEvent | null,
            }
        },

        created() {
            this.$on('canInstall', (event: BeforeInstallPromptEvent) => {
                event.preventDefault();

                this.deferredPrompt = event;
                this.showButton = true;
                console.log('asd');
            });
        },

        methods: {
            async showPrompt() {
                if (this.promptEvent === null) {
                    return;
                }

                this.promptEvent.prompt();

                const userChoice = await this.promptEvent.userChoice;

                if (userChoice.outcome === 'accepted') {
                    console.log('accepted');
                }
                else {
                    console.log('dismissed');
                }

                this.promptEvent = null;
            },

            hidePrompt() {
                this.showButton = false;
            },
        },
    })
</script>

<style lang="scss">
    .add-to-home-screen-component {
        position: fixed;
        bottom: 5.5rem;
        left: 1rem;
        right: 1rem;
        display: none;
        border-radius: layout(border-radius);
        background-color: theme(secondary);
        color: theme(black);
        font-weight: bold;
        cursor: pointer;

        &.is-visible {
            display: flex;
            align-items: center;
        }

        &:hover {
            @include box-shadow-small-hover;
        }

        & > * {
            flex: 1;
        }

        .home-icon {
            flex: 0 0 auto;
            display: inline-block;
            padding: 0.5rem 1rem;
        }

        .close-icon {
            flex: 0 0 auto;
            display: inline-block;
            padding: 0.5rem 1rem 0.5rem 2rem;
        }

        @include box-shadow-small;
    }
</style>