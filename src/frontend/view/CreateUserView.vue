<template>
    <div class="help-view">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="product-title-container">
                    <h2>Create User</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="view-content">
            <section>
                <label>
                    <span>Email Address</span>
                    <input type="text" v-model="usernameField" placeholder="todd@email.com">
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" v-model="passwordField">
                </label>
                <label>
                    <span>Confirm Password</span>
                    <input type="password" v-model="passwordConfirmField">
                </label>
                <p>
                    <ButtonComponent class="full-width" @click="onCreateUser">
                        Create User
                    </ButtonComponent>
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
                passwordConfirmField: '',
            }
        },

        methods: {
            async onCreateUser(): Promise<void> {
                if (!this.doFieldCheck()) {
                    return;
                }

                const createResult = await FirebaseClient.createUser(
                        this.usernameField,
                        this.passwordField);

                if (createResult instanceof Error) {
                    EventService.$emit(Events.EVENT_POPUP_SHOW, 'Something went wrong!');
                    return;
                }

                EventService.$emit(Events.EVENT_POPUP_SHOW, 'New user has been created!');
                this.$router.push({ path: '/login', });
            },

            doFieldCheck(): boolean {
                if (this.usernameField.length === 0) {
                    console.log('username bad');
                    return false;
                }

                if (this.passwordField.length === 0) {
                    console.log('password bad');
                    return false;
                }

                if (this.passwordConfirmField.length === 0) {
                    console.log('password confirm bad');
                    return false;
                }

                if (this.passwordField !== this.passwordConfirmField) {
                    console.log('passwords different');
                    return false;
                }

                return true;
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