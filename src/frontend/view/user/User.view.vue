<template>
    <PageContainerComponent>
        <template #header-bottom>
            <h3 class="header-user-view-title">Your User</h3>
        </template>
        <div class="user-view">
            <section class="zero-state" v-if="user === null">
                <p><strong>You haven't logged in!</strong></p>
                <p>Creating a user means you're able to save your shopping list so you can access it on multiple devices.</p>
                <p>
                    <ButtonComponent>Sign Up</ButtonComponent>
                </p>
                <p>
                    <router-link to="/user/login">
                        <ButtonComponent>Log In</ButtonComponent>
                    </router-link>
                </p>
            </section>
            <div v-else>
                <section class="background">
                    <h2>Details</h2>
                    <p>
                        <strong>Logged in as: </strong>
                        <span>{{ user.username }}</span>
                    </p>
                </section>
                <section class="background">
                    <h2>Log Out</h2>
                    <p>
                        <UserMessageComponent :message="userMessage" />
                        <ButtonComponent @click="logOut">
                            Log Out
                        </ButtonComponent>
                    </p>
                </section>
            </div>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import PageContainerComponent from '@/component/PageContainerComponent.vue';
import LoadingComponent from '@/component/LoadingComponent.vue';
import UserMessageComponent from '@/component/item/UserMessageComponent.vue';

import { useScrollPosition } from '@/use/ScrollPosition.use';
import { useCurrentUser } from '@/use/state/CurrentUser.use';

import { API } from '@/api/API';

import { User } from '@/model/User.model';

export default defineComponent({
    name: 'UserView',

    components: {
        ButtonComponent,
        PageContainerComponent,
        LoadingComponent,
        UserMessageComponent,
    },

    setup() {
        useScrollPosition('UserView');
        const currentUser = useCurrentUser();

        const user = computed<User | null>(() => currentUser.user.value);

        const userMessage = ref<string | null>(null);

        return {
            user,
            userMessage,

            async logOut() {
                userMessage.value = null;

                const logoutResponse = await API.logout(user.value);

                if (logoutResponse instanceof Error) {
                    userMessage.value = logoutResponse.message;
                    return;
                }

                currentUser.user.value = null;
            },
        }
    },
})
</script>

<style lang="scss">
.header-user-view-title {
    margin: 0;
    text-align: center;
}

.user-view {}
</style>