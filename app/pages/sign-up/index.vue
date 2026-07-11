<template>
    <div class="place-items-center grid h-full">
        <div class="w-full max-w-sm">
            <div class="bg-primary shadow-lg mb-2 px-4 py-8 rounded-xl w-full max-w-sm text-text-light">
                <h1 class="mb-4 text-4xl">Sign Up</h1>
                <div class="mb-4">
                    <label class="inline-block mb-1 ml-1 font-bold">Email</label>
                    <input ref="emailEl" v-focus v-model="form.email" type="email" placeholder="your@email.com" class="block bg-slate-100 shadow-sm px-4 py-2 rounded-xl w-full text-slate-600">
                </div>
                <div class="mb-4">
                    <label class="inline-block mb-1 ml-1 font-bold">Password</label>
                    <input ref="passwordEl" v-model="form.password" type="password" class="block bg-slate-100 shadow-sm px-4 py-2 rounded-xl w-full text-slate-600">
                </div>
                <div class="mb-4">
                    <label class="inline-block mb-1 ml-1 font-bold">Confirm Password</label>
                    <input ref="confirmPasswordEl" v-model="form.confirmPassword" type="password" class="block bg-slate-100 shadow-sm px-4 py-2 rounded-xl w-full text-slate-600">
                </div>
                <div>
                    <SecondaryButtonComponent @click="signUp()">
                        <CircleCheckBigIcon class="inline-block mr-2 size-4 align-middle" />
                        <span class="align-middle">Sign Up</span>
                    </SecondaryButtonComponent>
                </div>
            </div>
            <p class="text-sm text-center">
                <NuxtLink to="/log-in">
                    <ArrowBigLeftIcon class="inline-block mr-1 size-4 align-middle" />
                    <span class="align-middle">To Login</span>
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowBigLeftIcon, CircleCheckBigIcon } from '@lucide/vue';

definePageMeta({
    layout: 'minimal',
    middleware: ['require-no-auth'],
});

const route = useRoute();

const form = ref({
    email: '',
    password: '',
    confirmPassword: '',
});

async function signUp() {
    if (form.value.password !== form.value.confirmPassword) {
        return;
    }

    const response = await authClient.signUp.email({
        name: form.value.email,
        email: form.value.email,
        password: form.value.password,
    });

    if (response.error) {
        return;
    }


    await navigateTo(route.query.go?.toString() ?? '/', { external: true });
}

useNextInput([
    useTemplateRef('emailEl'),
    useTemplateRef('passwordEl'),
    useTemplateRef('confirmPasswordEl'),
], async () => {
    await signUp();
});
</script>