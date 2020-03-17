<template>
    <div class="help-view">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="product-title-container">
                    <h2>Login</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="view-content">
            <section>
                <label>
                    <span>Username</span>
                    <input type="text" v-model="usernameField" placeholder="todd@email.com">
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" v-model="passwordField">
                </label>
                <p>
                    <ButtonComponent class="full-width" @click="onLogIn">
                        Log In
                    </ButtonComponent>
                </p>
                <p class="text-centered">
                    <router-link to="/create-user">Create User</router-link>
                </p>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { FirebaseClient } from '@frontend/api/FirebaseClient';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import ButtonComponent from '@frontend/component/item/ButtonComponent.vue';
import AppState from '../state/AppState';
import { EventService, Events } from '../service/EventService';

    export default Vue.extend({
        name: 'HelpView',

        components: {
            ButtonComponent,
            HeaderComponent,
        },

        data() {
            return {
                usernameField: '',
                passwordField: '',
            }
        },

        beforeRouteEnter(to, from, next) {
            if (AppState.getUser() !== null) {
                next('/user');
            }
            else {
                next();
            }
        },

        beforeRouteUpdate(to, from, next) {
            if (AppState.getUser() !== null) {
                next('/user');
            }
            else {
                next();
            }
        },

        methods: {
            async onLogIn(): Promise<void> {
                const loginResult = await FirebaseClient.login(this.usernameField, this.passwordField);

                if (loginResult instanceof Error) {
                    EventService.$emit(Events.EVENT_POPUP_SHOW, 'Something went wrong!');
                    return;
                }

                this.$router.push({ path: '/user', });
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