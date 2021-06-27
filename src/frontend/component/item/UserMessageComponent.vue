<template>
    <div class="user-message-component flex align-center" v-if="message.length > 0">
        <QuestionMarkCircleIcon />
        <div class="message text-left">
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import QuestionMarkCircleIcon from '@/component/icon/QuestionMarkCircleIcon.vue';

export default defineComponent({
    name: 'UserMessageComponent',

    components: {
        QuestionMarkCircleIcon,
    },

    props: {
        message: {
            type: String,
            required: true,
        },
    },
})
</script>

<style lang="scss">
.user-message-component {
    margin-top: 1rem;
    padding: 1rem;
    background-color: transparentize(theme('negative'), 0.85);
    color: theme('negative');
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);

    .icon {
        margin-right: 1rem;
    }
}
</style>
