<script setup lang="ts">

// Get route params
const route = useRoute()

// Define subroutine to get product data
const getProduct = async () => {
    // Don't use lazyAsync because page should only load when data has
    return await useAsyncData(() => 
        $fetch(`/api/products?id=${route.params.id}`, {
            method: "GET"
        })
    )
}

// Get product data
const { data: productData } = await getProduct()

</script>

<template>
    {{ productData }}
</template>