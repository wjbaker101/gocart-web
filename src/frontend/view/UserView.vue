<template>
    <div class="help-view">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="product-title-container">
                    <h2>User Settings</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="view-content">
            <section>
                <ButtonComponent @click="onBackUp">
                    Back Up Shopping List
                </ButtonComponent>
            </section>
            <section>
                <ButtonComponent @click="loadBackUp">
                    Load Back-Up
                </ButtonComponent>
                <br>
                <span class="backup-timestamp">Last back-up: {{ lastBackUpText }}</span>
            </section>
            <section>
                <ButtonComponent @click="onLogOut">
                    Log Out
                </ButtonComponent>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { FirebaseClient } from '@frontend/api/FirebaseClient';
    import { EventService, Events } from '@frontend/service/EventService';
    import { NumberUtils } from '@frontend/util/NumberUtils';
    import AppState from '@frontend/state/AppState';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import ButtonComponent from '@frontend/component/item/ButtonComponent.vue';

    export default Vue.extend({
        name: 'HelpView',

        components: {
            ButtonComponent,
            HeaderComponent,
        },

        beforeRouteEnter(to, from, next) {
            if (AppState.getUser() === null) {
                next('/login');
            }
            else {
                next();
            }
        },

        beforeRouteUpdate(to, from, next) {
            if (AppState.getUser() === null) {
                next('/login');
            }
            else {
                next();
            }
        },

        data() {
            return {
                backUp: null,
                backupTimestamp: null,
            }
        },

        computed: {
            lastBackUpText(): string {
                if (this.backupTimestamp === null) {
                    return 'Never';
                }

                const date = new Date(Number(this.backupTimestamp));

                const day = NumberUtils.padNumber(date.getDay());
                const month = NumberUtils.padNumber(date.getMonth());
                const year = date.getFullYear();

                const hours = NumberUtils.padNumber(date.getHours());
                const minutes = NumberUtils.padNumber(date.getMinutes());

                return `${day}/${month}/${year} at ${hours}:${minutes}`;
            },
        },

        async created() {
            const userData = await FirebaseClient.loadUserData();

            if (userData instanceof Error || userData === null) {
                EventService.$emit(Events.EVENT_POPUP_SHOW, 'Unable to load back-up.');
                return;
            }

            this.backup = userData.data();
            this.backupTimestamp = this.backup.backupTimestamp;
        },

        methods: {
            async loadBackUp() {
                this.$root.$data.setUncheckedShoppingList(this.backup.uncheckedList);
                this.$root.$data.setCheckedShoppingList(this.backup.checkedList);
            },

            async onBackUp() {
                await FirebaseClient.saveShoppingList();

                EventService.$emit(Events.EVENT_POPUP_SHOW, 'Back Up Successful!');
            },

            async onLogOut() {
                const logOutSuccessful = await FirebaseClient.logout();

                if (logOutSuccessful) {
                    this.$router.push({ path: '/login', });
                }
                else {
                    EventService.$emit(Events.EVENT_POPUP_SHOW, 'Something went wrong!');
                }
            },
        },
    })
</script>

<style lang="scss">
    .help-view {

        .product-title-container {
            text-align: center;

            h2 {
                margin-bottom: 0;
            }
        }

        .backup-timestamp {
            padding-left: 0.5rem;
            font-size: 0.8em;
            vertical-align: bottom;
        }
    }
</style>