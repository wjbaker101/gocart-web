<template>
    <div class="product-component" v-if="isVisible">
        <div class="image-container">
            <img class="product-image" :src="product.image">
        </div>
        <div class="product-title">
            <h2>{{ product.name }}</h2>
        </div>
        <div class="product-price">
            <span>£{{ product.price.toFixed(2) }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'ProductComponent',

        props: ['product', 'isVisible'],
    })
</script>

<style lang="scss">
    .product-component {
        width: 100vw;
        position: fixed;
        top: 84px;
        bottom: 92px;
        background-color: theme(white);
        z-index: 1;
    }
</style>
