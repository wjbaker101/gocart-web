<template>
    <div class="place-items-center grid h-full">
        <div class="w-full max-w-sm">
            <div class="bg-primary shadow-lg mb-2 px-4 py-8 rounded-xl w-full max-w-sm text-text-light">
                <h1 class="mb-4 text-4xl">Log In</h1>
                <div class="mb-4">
                    <label class="inline-block mb-1 ml-1 font-bold">Email</label>
                    <input ref="emailEl" v-focus v-model="form.email" type="email" placeholder="your@email.com" class="block bg-slate-100 shadow-sm px-4 py-2 rounded-xl w-full text-slate-600">
                </div>
                <div class="mb-4">
                    <label class="inline-block mb-1 ml-1 font-bold">Password</label>
                    <input ref="passwordEl" v-model="form.password" type="password" class="block bg-slate-100 shadow-sm px-4 py-2 rounded-xl w-full text-slate-600">
                </div>
                <div>
                    <SecondaryButtonComponent @click="logIn()">
                        <CircleCheckBigIcon class="inline-block mr-2 size-4 align-middle" />
                        <span class="align-middle">Log In</span>
                    </SecondaryButtonComponent>
                </div>
            </div>
            <p class="text-sm text-center">
                <NuxtLink to="/sign-up">
                    <span class="align-middle">Or sign up</span>
                    <ArrowBigRightIcon class="inline-block ml-1 size-4 align-middle" />
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CircleCheckBigIcon, ArrowBigRightIcon } from '@lucide/vue';

definePageMeta({
    layout: 'minimal',
    middleware: ['require-no-auth'],
});

const route = useRoute();
const toast = useToast();

const form = ref({
    email: '',
    password: '',
});

async function logIn() {
    const response = await authClient.signIn.email({
        email: form.value.email,
        password: form.value.password,
    });

    if (response.error) {
        toast.pop({
            type: 'error',
            message: response.error.message ?? 'Something went wrong, please try again later.',
        });
        return;
    }

    await navigateTo(route.query.go?.toString() ?? '/', { external: true });
}

useNextInput([
    useTemplateRef('emailEl'),
    useTemplateRef('passwordEl'),
], async () => {
    await logIn();
});
</script>