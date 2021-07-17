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
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import UserMessageComponent from '@/component/item/UserMessageComponent.vue';
import PageContainerComponent from '@/component/PageContainerComponent.vue';

import { useCurrentUser } from '@/use/state/CurrentUser.use';

import { API } from '@/api/API';

import { User } from '@/model/User.model';

export default defineComponent({
    name: 'UserView',

    components: {
        ButtonComponent,
        PageContainerComponent,
        UserMessageComponent,
    },

    setup() {
        const router = useRouter();
        const currentUser = useCurrentUser();

        const user = computed<User | null>(() => currentUser.user.value);

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

                const loginResponse = await API.login(username.value, password.value);

                if (loginResponse instanceof Error) {
                    userMessage.value = loginResponse.message;
                    return;
                }

                currentUser.user.value = {
                    username: loginResponse.username,
                    loginToken: loginResponse.loginToken,
                };

                router.push({ path: '/user' });
            },
        }
    },
})
</script>

<style lang="scss">
.header-user-login-view-title {
    margin: 0;
    text-align: center;
}

.user-login-view {}
</style>