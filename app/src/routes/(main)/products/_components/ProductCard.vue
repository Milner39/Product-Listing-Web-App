<script setup lang="ts">
// #region Imports

import type { Product } from "types/product.d.ts"

// #endregion Imports


defineProps<{
    product?: Product
    loading?: Boolean
}>()

</script>

<template>
    <div class="product__image__wrapper" 
        :class="{ skeleton: loading === true }"
    >
        <img class="product__image":src="product?.thumbnail"/>
    </div>
    <div class="product__details" 
        :class="{ skeleton: loading === true }"
    >
        <p class="product__details__title">{{ product?.title || "title placeholder" }}</p>
        <p class="product__details__price">£{{ product?.price }}</p>
    </div>
</template>

<style lang="scss" scoped>

.product__image__wrapper {
    display: flex;
    place-content: center;
    aspect-ratio: 1/1;

    > .product__image {
        width: 100%;
    }

    &.skeleton {
        visibility: hidden
    }
}

.product__details {
    border-top: 1px solid gray;

    padding: 0.5rem 1rem;

    display: flex;
    gap: 1rem;

    > .product__details__title {
        margin-right: auto;

        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &.skeleton {
        visibility: hidden;
    }
}

</style>