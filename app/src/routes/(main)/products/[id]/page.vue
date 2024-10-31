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
const { data: productData, status } = await getProduct()

</script>

<template>
    <div v-if="status !== 'error'" class="product__wrapper">
        <div class="product">
            <div class="product__image__wrapper">
                <img class="product__image" :src="productData?.thumbnail"/>
            </div>
            <div class="product__title">
                <h4>{{ productData?.title }}</h4>
                <p v-if="productData?.brand">{{ productData.brand }}</p>
            </div>
            <p class="product__price"><strong>Retails at:</strong> £{{ productData?.price }}</p>
            <p class="product__description">{{ productData?.description }}</p>
            <div class="product__reviews__wrapper">
                <h5>Reviews:</h5>
                <ul class="product__reviews style-reset">
                    <li v-for="review in productData?.reviews" class="reviews__review__wrapper">
                        <div class="reviews__review">
                            <p class="review__reviewer-name"><strong>{{ review.reviewerName }}</strong></p>
                            <p class="review__text">{{ review.comment }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else class="no-product">
        <h5>Product with that ID does not exist</h5>
    </div>
</template>

<style lang="scss" scoped>

.no-product {
    padding: 1rem;
    text-align: center;
}

.product__wrapper {
    padding: 1rem;

    > .product {
        display: flex;
        gap: 1rem;
        flex-direction: column;

        width: min(64ch, 100%);

        margin-inline: auto;

        > .product__image__wrapper {
            > .product__image {
                width: 100%;

                aspect-ratio: 1/1; // Until image loads
            }
        }

        > .product__title {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 1ch;
            align-items: center;

            p {
                margin-top: 0.2rem; // Weird alignment 
            }
        }

        > .product__reviews__wrapper {
            display: flex;
            gap: 0.5rem;
            flex-direction: column;

            > .product__reviews {
                display: flex;
                gap: 0.75rem;
                flex-direction: column;
            }
        }

        > * {
            position: relative;
            z-index: -1;
        }

        > * + *::before {
            content: "";
            position: absolute;
            top: -0.5rem;
            width: 100%;
            height: 1px;
            background-color: gray;
        }
    }
        
}

</style>