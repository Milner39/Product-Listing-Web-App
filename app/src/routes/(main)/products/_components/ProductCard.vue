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
        <p>{{ product?.title }}</p>
    </div>
</template>