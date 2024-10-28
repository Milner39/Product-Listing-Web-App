<script setup lang="ts">

import type { Product } from "types/product.d.ts"

defineProps<{
    product?: Product
    loading?: Boolean
}>()

</script>

<template>
    <div class="product__image__wrapper">
        <img :src="product?.thumbnail"/>
    </div>
    <div class="product__details">
        <p class="product__details__title">{{ product?.title }}</p>
    </div>
</template>

<style lang="scss" scoped>

.product__image__wrapper {
    display: grid;
    place-content: center;
}

.product__details {
    padding: 0.25rem 1rem;

    > .product__details__title {
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

</style>