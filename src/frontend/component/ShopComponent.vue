<template>
    <div class="shop-component" @click="onSelect" :class="{ 'is-open': isOpen }">
        <div class="flex align-center">
            <div class="flex-auto">
                <ShopIcon />
            </div>
            <div class="shop-name flex-1">
                {{ shop.name }}
            </div>
        </div>
        <div class="open-group" v-if="isOpen">
            <p>{{ displayDistance }}</p>
            <ButtonComponent
                class="full-width"
                @click.stop="onChoose"
            >
                Choose
            </ButtonComponent>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, SetupContext } from 'vue';
import { useRouter } from 'vue-router';

import ButtonComponent from '@/component/item/ButtonComponent.vue';
import ShopIcon from '@/component/icon/ShopIcon.vue';

import { useAppStore } from '@/use/appStore/AppStore.use';

import { Shop } from '@/model/Shop.model';
import { API } from '@/api/API';

interface ShopComponentProps {
    shop: Shop,
    isOpen: Boolean,
}

export default defineComponent({
    name: 'ShopComponent',

    components: {
        ButtonComponent,
        ShopIcon,
    },

    props: {
        shop: {
            type: Object as PropType<Shop>,
            required: true,
        },
        isOpen: Boolean,
    },

    setup(props: ShopComponentProps, context: SetupContext) {
        const router = useRouter();
        const appStore = useAppStore();

        const displayDistance = computed<string>(
            () => `${props.shop.distance.value.toFixed(1)} ${props.shop.distance.unit} away`);

        return {
            displayDistance,

            onSelect() {
                context.emit(props.isOpen ? 'close' : 'open', props.shop.name);
            },

            async onChoose() {
                const { longitude, latitude } = props.shop.location;
                const previewImage = await API.getStaticMapLocation(longitude, latitude);
                if (previewImage instanceof Error)
                    return;

                props.shop.location.mapImage = previewImage;

                await appStore.shop.set(props.shop);
                router.push({ path: '/shop', });
            },
        }
    }
})
</script>

<style lang="scss">
.shop-component {
    position: relative;
    padding: 1rem 0.5rem;
    background-color: theme(white);
    cursor: pointer;

    &:hover,
    &.is-open {
        box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.1);
        z-index: 1;
    }

    &.is-open {
        .shop-name {
            font-weight: bold;
        }
    }

    &:first-child {
        border-top-right-radius: layout(border-radius);
        border-top-left-radius: layout(border-radius);
    }

    &:last-child {
        border-bottom-right-radius: layout(border-radius);
        border-bottom-left-radius: layout(border-radius);
    }

    .icon-shop {
        margin-right: 0.5rem;
    }

    .open-group {
        padding: 0 1.5rem;
    }
}
</style>