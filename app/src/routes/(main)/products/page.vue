<script setup lang="ts">
// #region Imports

import Modal from "~/components/Modal.vue"
import ProductCard from "./_components/ProductCard.vue"
import ListPanel from "./_components/ModelContent/ListPanel.vue"
import ContentPanel from "./_components/ModelContent/ContentPanel.vue"
import TagBox from "~/components/TagBox.vue"
import SearchBar from "~/components/Inputs/SearchBar.vue"
import Checkbox from "~/components/Inputs/Checkbox.vue"

import FilterSVG from "~/assets/svgs/Filter.vue"
import SortSVG from "~/assets/svgs/Sort.vue"
import ArrowRightSVG from "~/assets/svgs/ArrowRight.vue"

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





// Reactive state to control if model is open and what content to display
const filterModalOpen = ref(false)
const sortModalOpen = ref(false)





// Reactive state for filtering products
const filters: Ref<{ 
    title: string, 
    key: string,
    selected: Set<string>,
    options: Set<string>
}[]> = ref([
    {
        title: "Brand",
        key: "brand",
        selected: new Set(),
        options: new Set()
    },
    {
        title: "Category",
        key: "category",
        selected: new Set(),
        options: new Set()
    },
    {
        title: "Tags",
        key: "tags",
        selected: new Set(),
        options: new Set()
    }
])

// Reactive state to control what filter model content is displayed
const selectedFilter: Ref<number> = ref(0)

// Reactive state to control which filter options are displayed
const filterOptionSearch: Ref<string> = ref("")
const filterOptionSearchResults: Ref<string[]> = ref([])


// Watcher to reset search when selected filter changes
watch(selectedFilter, () => { filterOptionSearch.value = "" })

// Watcher to update search results when filter option search changes
watch(filterOptionSearch, () => {
    
    /*
        If search is empty, no results
        Otherwise all options would be show since all strings start with ""
    */
    if (filterOptionSearch.value === "") {
        filterOptionSearchResults.value = []
        return
    }

    // Iterate over options returning an Array of options that start with search value
    filterOptionSearchResults.value =
        [...filters.value[selectedFilter.value].options].filter((option) =>
            // Not case sensitive
            option.toLocaleLowerCase().startsWith(filterOptionSearch.value.toLocaleLowerCase())
        )
})



// Get every unique option for each filter based on the keys of each product
for (const product of getProductsData.value?.products || []) {
    for (const filter of filters.value) {
        // @ts-ignore: Serialisation type mismatch
        const productKeyVal = product[filter.key] 

        // Handle different data types
        if (typeof productKeyVal === "undefined") continue

        else if (Array.isArray(productKeyVal)) {
            for (const val of productKeyVal) filter.options.add(val)
        } 
        else {
            filter.options.add(productKeyVal)
        }


        /*
            A Set is used for filter options so we don't need to check the 
            options for duplicate values since Sets only contain unique values
            and `Set.prototype.add(val)` will just do nothing if the set already
            contains `val`
        */
    }
}


// Computed state for filtered products
const filteredProducts = computed(() => {

    // Get every product key to filter by
    const filteredKeys = filters.value.map(filter => filter.key)

    /*
        Get only the products that filtered keys contain one or more
        of the filter options
    */
    // @ts-ignore: Parameter 'product' implicitly has an 'any' type.
    return getProductsData?.value.products.filter(product =>

        // For each filtered key
        filteredKeys.every((key, index) => {
            // Get filter for key
            const filter = filters.value[index]

            // If no filter options selected
            if (filter.selected.size < 1) return true

            // If value of key in object is Array
            else if (Array.isArray(product[key])) {

                // Check any of the values in the array are one of the selected filter options
                for (const val of product[key]) if (filter.selected.has(val)) return true
            }
            
            // Check the value of the key is one of the selected filter options
            else if (filter.selected.has(product[key])) return true
        })
    )
    /* Performance:
        O(nk)
        - n: number of products
        - k: number of filters
    */
})





// Reactive state for sorting products
const sort: Ref<{
    options: {
        title: string,
        key: string
    }[],
    mode: "acc" | "dec"
}> = ref({
    options: [
        {
            title: "Price",
            key: "price"
        },
        {
            title: "Rating",
            key: "rating"
        },
        {
            title: "Stock",
            key: "stock"
        }
    ],
    mode: "acc"
})
</script>

<template>
    <div class="filter-sort-buttons__container">
        <button class="filter-sort-buttons__button button--dot style-reset" type="button" title="Filter"
            @click="() => filterModalOpen = true"
        >
            <FilterSVG/>
        </button>
        <button class="filter-sort-buttons__button button--dot style-reset" type="button" title="Sort"
            @click="() => sortModalOpen = true"
        >
            <SortSVG/>
        </button>
    </div>
    <Modal 
        :open="filterModalOpen || sortModalOpen"
        @update:open="(state) => {
            // Need to use `@update` because :open is not bound to a single ref
            if (state === false) {
                filterModalOpen = false
                sortModalOpen = false
            }
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
            <div class="filter-modal__content">
                <ListPanel>
                    <template #title>
                        <h6>Filters</h6>
                    </template>
                    <li class="flex-col list-panel__filter-select"
                        v-for="filter, filterIndex in filters"
                    >
                        <button class="style-reset" type="button"
                            @click="() => { selectedFilter = filterIndex }"
                        >
                            <div class="filter-select__title">
                                <p class="title__text">{{ filter.title }}</p>
                                <div class="title__svg__wrapper">
                                    <ArrowRightSVG/>
                                </div>
                            </div>
                            <TagBox 
                                v-if="filter.selected.size > 0"
                                v-model:tags="filter.selected"
                            >
                                <template #titleText>
                                    <p>{{ filter.title }}</p>
                                </template>
                                <template #titleSVGRight>
                                    <ArrowRightSVG/>
                                </template>
                            </TagBox>
                        </button>
                    </li>
                </ListPanel>
                <ContentPanel>
                    <template #title>
                        <h6>{{ filters[selectedFilter].title }}</h6>
                    </template>
                    <div class="content-panel__selected-options">
                        <p>Look for: <strong>{{ filters[selectedFilter].selected.size === 0 ? "All" : "" }}</strong></p>
                        <TagBox 
                            v-if="filters[selectedFilter].selected.size > 0"
                            v-model:tags="filters[selectedFilter].selected"
                        />
                    </div>
                    <div class="content-panel__search-options">
                        <SearchBar 
                            placeholder="Search filter options..." 
                            v-model:value="filterOptionSearch"
                        />
                        <ul class="search-options__options style-reset"
                            v-if="
                                filterOptionSearch !== '' &&
                                filterOptionSearchResults.length > 0
                            " 
                        >
                            <li class="search-options__option"
                                v-for="option in filterOptionSearchResults"
                            >
                                <button class="option__button style-reset" type="button">
                                    <p class="option__button__text">{{ option }}</p>
                                    <Checkbox 
                                        :checked="filters[selectedFilter].selected.has(option)"
                                        @update:checked="(checked) => {
                                            if (!checked) filters[selectedFilter].selected.delete(option)
                                            else filters[selectedFilter].selected.add(option)
                                        }"
                                    />
                                </button>
                            </li>
                        </ul>
                        <div class="search-options__no-results"
                            v-else-if="
                                filterOptionSearch !== '' &&
                                filterOptionSearchResults.length === 0
                            "
                        >
                            <p class="bold">No Results</p>
                        </div>
                    </div>
                </ContentPanel>
            </div>
        </template>
        <template v-if="sortModalOpen">
            <div class="sort-modal__content">
                <ListPanel>
                    <template #title>
                        <h6>Sort by</h6>
                    </template>
                    <li
                        v-for="option, optionIndex in sort.options"
                    >
                        {{ option.title }}
                    </li>
                </ListPanel>
            </div>
        </template>
    </Modal>
    <ul class="grid--cards style-reset"
        v-if="
            getProductsStatus === 'pending' ||
            getProductsData?.products?.length > 0
        "
    >
        <li class="product" 
            v-if="
                getProductsStatus === 'success' &&
                getProductsData?.products?.length > 0
            " 
            v-for="product in filteredProducts"
        >
            <NuxtLink class="style-reset"
                :to="`/products/${product.id}`"
            >
                <!-- @vue-skip: Serialisation type mismatch -->
                <ProductCard :key="product.id" :product="product"/>
            </NuxtLink>
        </li>
        <li class="product" 
            v-else
            v-for="_ in Array(32)"
        >
            <ProductCard :loading="true"/>
        </li>
    </ul>
    <h6 class="no-results" 
        v-else
    >
        No Products Found
    </h6>
</template>

<style lang="scss" scoped>

.filter-sort-buttons__container {
    padding-top: 1rem;
    padding-inline: 1rem;

    display: flex;
    gap: 1rem;

    > .filter-sort-buttons__button {
        &:deep(> svg) {
            min-width: revert;
            width: calc(var(--browser-fs-scale) * 1.75rem);
        }
    }
}

.filter-modal__content {
    display: flex;
    gap: 1rem;

    .list-panel {
        flex-grow: 1;
    }
    .content-panel {
        flex-grow: 1.5;
    }

    .list-panel__filter-select {
        border: 1px solid gray;
        border-radius: 0.5em;

        .filter-select__title {
            display: flex;
            align-items: center;

            > :not(.title__svg__wrapper) {
                flex-grow: 1;
                text-align: left;
                margin-inline: 0.5em;
            }

            > .title__svg__wrapper {
                flex-grow: 0;

                display: flex;
                justify-content: center;
                align-items: center;
                aspect-ratio: 1/1;

                padding: 0.5em;

                &:deep(> svg) {
                    min-width: revert;
                    width: calc(var(--browser-fs-scale) * 1.25rem);
                }
            }
        }

        &:deep(.tag-box__wrapper) {
            padding-inline: 0.5em;
            padding-bottom: 0.5em;
        }
    }

    .content-panel__selected-options {
        &:deep(.tag-box__wrapper) {
            border: 1px solid gray;
            border-radius: 0.5em;
            padding: 0.5em
        }
    }

    .content-panel__search-options {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        > .search-options__options {
            background-color: white;
            border-radius: 1.5rem;

            padding-block: 0.5rem;

            > .search-options__option {
                margin-left: 1rem;

                > .option__button {
                    width: 100%;

                    display: grid;
                    grid-template-columns: 1fr auto;

                    align-items: center;
                    gap: 0.5rem;

                    > .option__button__text {
                        margin-right: auto
                    }

                    &:deep(> .input--checkbox) {
                        margin-right: 0.85rem; // Weird alignment
                    }
                }
            }
        }

        > .search-options__no-results {
            @extend .search-options__options;
            text-align: center;
        }
    }
}

.grid--cards {
    padding: 1rem
}



.product {
    background-color: rgb(245, 245, 245);

    border-radius: 1rem;
    overflow: hidden;

    transition: scale ease-in-out 300ms;
}

.product:has(~ .product:hover) {
    scale: 0.9875;
}

.product:hover ~ .product {
    scale: 0.975;
}


.no-results {
    padding: 1rem;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

</style>