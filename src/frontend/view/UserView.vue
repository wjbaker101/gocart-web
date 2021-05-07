<template>
    <PageContainerComponent>
        <template #header-bottom v-if="user !== null">
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
                    <ButtonComponent>Log In</ButtonComponent>
                </p>
            </section>
            <div v-else>
                <section class="background">
                    <h2>Details</h2>
                    <p>
                        <strong>Your Username:</strong>
                        <span>{{ user.username }}</span>
                    </p>
                </section>
                <section class="background">
                    <h2>Log Out</h2>
                    <p>
                        <ButtonComponent>Log Out</ButtonComponent>
                    </p>
                </section>
            </div>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import PageContainerComponent from '@/component/PageContainerComponent.vue';
import LoadingComponent from '@/component/LoadingComponent.vue';

import { UseScrollPosition } from '@/use/ScrollPosition.use';

import { AppState } from '@/store/type/AppState.model';
import { User } from '@/model/User.model';

export default {
    name: 'UserView',

    components: {
        ButtonComponent,
        PageContainerComponent,
        LoadingComponent,
    },

    setup() {
        const store = useStore<AppState>();

        const user = computed<User | null>(() => store.getters.user);

        UseScrollPosition('UserView');

        return {
            user,
        }
    },
}
</script>

<style lang="scss">
.header-user-view-title {
    margin: 0;
    text-align: center;
}

.user-view {}
</style>