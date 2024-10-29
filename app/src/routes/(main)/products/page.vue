<script setup lang="ts">
// #region Imports

import Modal from "~/components/Modal.vue"
import ProductCard from "./_components/ProductCard.vue"
import ListPanel from "./_components/ModelContent/ListPanel.vue"
import TagBox from "~/components/TagBox.vue"

import FilterSVG from "~/assets/svgs/Filter.vue"
import SortSVG from "~/assets/svgs/Sort.vue"

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


const filterModalOpen = ref(false)
const sortModalOpen = ref(false)

</script>

<template>
    <template v-if="
        getProductsStatus === 'pending' || 
        (getProductsData && getProductsData.products.length > 0)
    ">
        <div class="filter-sort__wrapper">
            <button class="filter-sort__button button--dot style-reset" type="button"
                @click="() => filterModalOpen = true"
            >
                <FilterSVG/>
            </button>
            <button class="filter-sort__button button--dot style-reset" type="button"
                @click="() => sortModalOpen = true"
            >
                <SortSVG/>
            </button>
        </div>
        <Modal 
            :open="filterModalOpen || sortModalOpen" 
            @close="() => {
                filterModalOpen = false
                sortModalOpen = false
            }"
        >
            <template #title>
                <h5 v-if="filterModalOpen">
                    Apply Filters
                </h5>
                <h5 v-if="sortModalOpen">
                    Apply Sort Rules
                </h5>
            </template>
            <template v-if="filterModalOpen">
                <div>
                    <ListPanel>
                        <template #title>
                            <h6>Filters</h6>
                        </template>
                        <button class="style-reset">
                            <TagBox :tags="['Apple', 'Sony', 'Google']">
                                <template #titleText>
                                    <p>Brand</p>
                                </template>
                                <template #titleSVGRight>
                                    >
                                </template>
                            </TagBox>
                        </button>
                        <button class="style-reset">
                            <TagBox :tags="[]">
                                <template #titleText>
                                    <p>Category</p>
                                </template>
                                <template #titleSVGRight>
                                    >
                                </template>
                            </TagBox>
                        </button>
                        <button class="style-reset">
                            <TagBox :tags="[]">
                                <template #titleText>
                                    <p>Tags</p>
                                </template>
                                <template #titleSVGRight>
                                    >
                                </template>
                            </TagBox>
                        </button>
                    </ListPanel>
                </div>
            </template>
            <template v-if="sortModalOpen">

            </template>
        </Modal>
        <ul class="grid--cards style-reset">
            <li class="product" 
                v-if="getProductsStatus === 'success'" 
                v-for="product in getProductsData?.products"
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
    <h6 class="no-results" v-else>No Products Found</h6>
</template>

<style lang="scss" scoped>

.filter-sort__wrapper {
    padding-top: 1rem;
    padding-inline: 1rem;

    display: flex;
    gap: 1rem;

    > .filter-sort__button {
        > svg {
            min-width: revert;
            width: calc(var(--browser-fs-scale) * 1.75rem);
        }
    }
}

.filter-modal__wrapper {
    border: 0;
    background-color: rgba($color: #000000, $alpha: 0.75);

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
}

.grid--cards {
    padding: 1rem
}

.product {
    background-color: rgb(245, 245, 245);

    border-radius: 1rem;
    overflow: hidden;
}

.no-results {
    padding: 1rem;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

</style>