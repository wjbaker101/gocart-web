<template>
    <div class="place-items-center grid h-full">
        <div class="w-full max-w-sm">
            <div class="bg-primary shadow-lg mb-1 px-4 py-8 rounded-xl w-full max-w-sm text-text-light">
                <h1 class="mb-4 text-4xl">Sign Up</h1>
                <div class="mb-4">
                    <label class="inline-block mb-1 ml-1 font-bold">Email</label>
                    <input type="email" placeholder="your@email.com" class="block bg-slate-100 shadow-sm px-4 py-2 rounded-xl w-full text-slate-600">
                </div>
                <div class="mb-4">
                    <label class="inline-block mb-1 ml-1 font-bold">Password</label>
                    <input type="password" class="block bg-slate-100 shadow-sm px-4 py-2 rounded-xl w-full text-slate-600">
                </div>
                <div class="mb-4">
                    <label class="inline-block mb-1 ml-1 font-bold">Confirm Password</label>
                    <input type="password" class="block bg-slate-100 shadow-sm px-4 py-2 rounded-xl w-full text-slate-600">
                </div>
                <div>
                    <PrimaryButtonComponent>
                        Confirm
                    </PrimaryButtonComponent>
                </div>
            </div>
            <p class="text-sm text-center">
                <NuxtLink to="/log-in">
                    <ArrowLeftIcon class="inline-block mr-1 size-4 align-middle" />
                    <span>To Login</span>
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@lucide/vue';

definePageMeta({
    layout: 'minimal',
});
</script>