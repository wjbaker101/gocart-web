<template>
    <div class="add-to-home-screen-component"
            @click="onClick"
            :class="{ 'is-visible': showButton }">
        <HomeIcon class="home-icon" />
        <span>Install App</span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import HomeIcon from '@frontend/assets/icon/home.svg';

    export default Vue.extend({
        name: 'AddToHomeScreenComponent',

        components: {
            HomeIcon,
        },

        data() {
            return {
                showButton: false,
                beforeInstallPrompEvent: null,
            }
        },

        created() {
            window.addEventListener('beforeinstallprompt', this.onBeforeInstallPrompt);
        },

        methods: {
            onBeforeInstallPrompt(event: BeforeInstallPromptEvent) {
                event.preventDefault();

                this.beforeInstallPrompEvent = event;

                this.showButton = true;
            },

            async onClick() {
                if (this.beforeInstallPrompEvent === null) {
                    return;
                }

                this.showButton = false;

                this.beforeInstallPrompEvent.prompt();

                const userChoice = await this.beforeInstallPrompEvent.userChoice;

                if (userChoice.outcome === 'accepted') {
                    console.log('accepted');
                }
                else {
                    console.log('dismissed');
                }

                this.beforeInstallPrompEvent = null;
            },
        },
    })
</script>

<style lang="scss">
    .add-to-home-screen-component {
        position: fixed;
        bottom: 5.5rem;
        left: 50%;
        display: none;
        padding: 0.25rem 1rem;
        transform: translateX(-50%);
        border-radius: layout(border-radius);
        background-color: theme(secondary);
        color: theme(black);
        cursor: pointer;

        &.is-visible {
            display: initial;
        }

        &:hover {
            @include box-shadow-small-hover;
        }

        .home-icon {
            margin-right: 1rem;
        }

        @include box-shadow-small;
    }
</style>