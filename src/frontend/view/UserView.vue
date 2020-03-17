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
                    Back up Shopping List
                </ButtonComponent>
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
    import { EventService, Events } from '../service/EventService';
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

        methods: {
            async onBackUp() {
                await FirebaseClient.saveShoppingList();

                EventService.$emit(Events.EVENT_POPUP_SHOW, 'Shopping List Backed-Up!')
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
    }
</style>