<template>
    <PageContainerComponent>
        <template #header-bottom>
            <h3 class="header-user-login-view-title">Log In</h3>
        </template>
        <div class="user-login-view">
            <section class="zero-state">
                <label>
                    <span>Username</span>
                    <input type="text" v-model="username">
                </label>
                <label>
                    <span>Password</span>
                    <input type="text" v-model="password">
                </label>
                <UserMessageComponent :message="userMessage" />
                <p>
                    <ButtonComponent @click="logIn">Log In</ButtonComponent>
                </p>
            </section>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import UserMessageComponent from '@/component/item/UserMessageComponent.vue';
import PageContainerComponent from '@/component/PageContainerComponent.vue';

import { API } from '@/api/API';
import { AppState } from '@/store/type/AppState.model';
import { StateKeys } from '@/store/type/StateKeys';
import { User } from '@/model/User.model';
import router from '@/router/AppRouter';

export default {
    name: 'UserView',

    components: {
        ButtonComponent,
        PageContainerComponent,
        UserMessageComponent,
    },

    setup() {
        const store = useStore<AppState>();

        const user = computed<User | null>(() => store.getters.user);

        const username = ref<string>('');
        const password = ref<string>('');
        const userMessage = ref<string | null>(null);

        return {
            user,
            username,
            password,
            userMessage,

            async logIn() {
                if (username.value.length < 4) {
                    userMessage.value = 'The username that\'s been entered is invalid, please try again.';
                    return;
                }

                if (password.value.length < 4) {
                    userMessage.value = 'The password that\'s been entered is invalid, please try again.';
                    return;
                }

                userMessage.value = null;

                const loginResponse =
                    await API.login(username.value, password.value);

                if (loginResponse instanceof Error) {
                    userMessage.value = loginResponse.message;
                    return;
                }

                store.dispatch(StateKeys.USER_SET, <User>{
                    username: loginResponse.username,
                    jwtToken: loginResponse.loginToken,
                });

                router.push({ path: '/user' });
            },
        }
    },
}
</script>

<style lang="scss">
.header-user-login-view-title {
    margin: 0;
    text-align: center;
}

.user-login-view {}
</style>