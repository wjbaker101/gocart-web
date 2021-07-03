<template>
    <div class="search-component flex align-center">
        <div class="flex-1">
            <input
                ref="searchTermInput"
                :placeholder="placeholder"
                v-model="searchTerm"
                @keyup.enter="onSearch"
            >
        </div>
        <div class="flex-auto">
            <ButtonComponent class="search-button" @click="onSearch">
                <SearchIcon />
            </ButtonComponent>
        </div>
    </div>
    <UserMessageComponent v-if="hasUserMessage" :message="onSearchMessage" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import UserMessageComponent from '@/component/item/UserMessageComponent.vue';
import SearchIcon from '@/component/icon/SearchIcon.vue';

import { useUserMessage } from '@/use/UserMessage.use';

export default defineComponent({
    name: 'SearchComponent',

    props: {
        prePopulatedSearchTerm: {
            type: String,
            required: false,
            default: '',
        },
        hasUserMessage: {
            type: Boolean,
            required: false,
            default: false,
        },
        placeholder: {
            type: String,
            required: false,
        },
    },

    emits: [
        'search',
    ],

    components: {
        ButtonComponent,
        UserMessageComponent,
        SearchIcon,
    },

    setup(props, { emit }) {
        const userMessage = useUserMessage();

        const searchTermInput = ref<HTMLInputElement | null>(null);

        const onSearchMessage = ref<string>('');
        const searchTerm = ref<string>(props.prePopulatedSearchTerm);

        return {
            searchTermInput,
            onSearchMessage,
            searchTerm,

            onSearch() {
                if (searchTerm.value.length < 3) {
                    userMessage.set(onSearchMessage, 'Search term is too short, please try another.');
                    return;
                }

                emit('search', searchTerm.value);
            },

            focus() {
                searchTermInput.value?.focus();
            },

            blur() {
                searchTermInput.value?.blur();
            },
        }
    },
})
</script>

<style lang="scss">
.search-component {
    .search-button {
        margin-left: 0.5rem;
    }

    .icon {
        vertical-align: middle;
    }
}
</style>
