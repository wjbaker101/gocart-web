<template>
    <div class="mx-auto py-4 w-[calc(100%-1rem)] max-w-4xl">
        <h1 class="mb-4 text-2xl text-center">Settings</h1>
        <div class="text-center">
            <PrimaryButtonComponent @click="logOut()">
                <LogOutIcon class="inline-block mr-2 size-4 align-middle" />
                <span class="align-middle">Log Out</span>
            </PrimaryButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LogOutIcon } from '@lucide/vue';

async function logOut() {
    await authClient.signOut();

    await navigateTo('/log-in', { external: true });
}
</script>