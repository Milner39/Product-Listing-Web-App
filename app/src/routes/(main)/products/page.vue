<script setup lang="ts">

const getProducts = async () => {
    return await useLazyAsyncData(() => 
        $fetch("/api/products", {
            method: "GET"
        })
    )
}
const { status: getProductsStatus, data: getProductsData } = await getProducts()
const products = getProductsData.value.products

</script>

<template>
	<ul class="grid--cards style-reset">
        <li 
            v-if="getProductsStatus === 'success'" 
            v-for="product in products"
        >
            <p>{{ product.title }}</p>
        </li>
        <li
            v-else
            v-for="_ in Array(30)"
        >
            <p>...</p>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
    .grid--cards {
        padding-left: 1rem;
        padding-right: 1rem;
    }
</style>