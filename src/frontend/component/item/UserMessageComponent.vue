<template>
    <div class="user-message-component flex align-center" v-if="message !== null">
        <div class="flex-auto">
            <QuestionMarkCircleIcon />
        </div>
        <div class="message text-left">
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import QuestionMarkCircleIcon from '@/component/icon/QuestionMarkCircleIcon.vue';

export default defineComponent({
    name: 'CheckBoxComponent',

    components: {
        QuestionMarkCircleIcon,
    },

    props: {
        message: {
            type: Object as PropType<string | null>,
            required: true,
        },
    },

    setup() {
        return {}
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
