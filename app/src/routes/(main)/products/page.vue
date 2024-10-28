<script setup lang="ts">
// #region Imports

import ProductCard from "./_components/ProductCard.vue"

// #endregion Imports


// Define subroutine to lazily get products data
const getProducts = async () => {
    return await useLazyAsyncData(() => 
        $fetch("/api/products", {
            method: "GET"
        })
    )
}

// Get products data
const { status: getProductsStatus, data: getProductsData } = await getProducts()
const products = getProductsData.value?.products

</script>

<template>
	<ul class="grid--cards style-reset">
        <li class="product" 
            v-if="getProductsStatus === 'success'" 
            v-for="product in products"
        >
            <!-- @vue-skip -->
            <ProductCard :key="product.id" :product="product"/>
        </li>
        <li class="product" 
            v-else
            v-for="_ in Array(30)"
        >
            <ProductCard :loading="true"/>
        </li>
    </ul>
</template>

<style lang="scss" scoped>

.grid--cards {
    padding: 1rem
}

.product {
    background-color: rgb(245, 245, 245);

    border-radius: 1rem;
    overflow: hidden;
}

</style>