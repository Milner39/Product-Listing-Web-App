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
        selected: new Set(["Google", "Apple", "Sony"]),
        options: new Set()
    },
    {
        title: "Category",
        key: "category",
        selected: new Set(["Tech"]),
        options: new Set()
    },
    {
        title: "Tags",
        key: "tags",
        selected: new Set(["Phone", "Smart Devices"]),
        options: new Set()
    }
])

// Reactive state to control what filter model content is displayed
const selectedFilter: Ref<number> = ref(0)

// Reactive state to control which filter options are displayed
const filterOptionSearch: Ref<string> = ref("")
const filterOptionSearchResults: Ref<string[]> = ref([])


// Watcher to reset search when selected filter changes
watch(selectedFilter, () => {
    filterOptionSearch.value = ""
})

// Watcher to update filter option search results
watch(filterOptionSearch, () => {
    // If search is empty
    if (filterOptionSearch.value === "") {
        // No results, otherwise all options are shown
        filterOptionSearchResults.value = []
        return
    }

    filterOptionSearchResults.value =
        [...filters.value[selectedFilter.value].options].filter((option) =>
            option.toLocaleLowerCase().startsWith(filterOptionSearch.value.toLocaleLowerCase())
        )
})


// Subroutine to remove a tag from a filter
const filterTagBoxRemoveTag = (filterIndex: number, tag: string) => {
    filters.value[filterIndex].selected.delete(tag)
}



// Get every unique option for each filter based on the keys of each product
for (const product of getProductsData.value?.products || []) {
    for (const filter of filters.value) {
        // @ts-ignore: Serialisation type mismatch
        const productKeyVal = product[filter.key] 

        if (typeof productKeyVal === "undefined") continue

        if (Array.isArray(productKeyVal)) {
            productKeyVal.forEach((val) => filter.options.add(val))
        } 
        else {
            filter.options.add(productKeyVal)
        }
    }
}

</script>

<template>
    <template v-if="
        getProductsStatus === 'pending' || 
        (getProductsData && getProductsData.products.length > 0)
    ">
        <div class="filter-sort-buttons__container">
            <button class="filter-sort-buttons__button button--dot style-reset" type="button"
                @click="() => filterModalOpen = true"
            >
                <FilterSVG/>
            </button>
            <button class="filter-sort-buttons__button button--dot style-reset" type="button"
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
                                    :tags="[...filter.selected]"
                                    @removeTag="(tag) => {
                                        filterTagBoxRemoveTag(filterIndex, tag)
                                    }"
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
                                :tags="[...filters[selectedFilter].selected]"
                                @removeTag="(tag) => {
                                    filterTagBoxRemoveTag(selectedFilter, tag)
                                }"
                            />
                        </div>
                        <div class="content-panel__search-options">
                            <SearchBar placeholder="Search filter options..."
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
                                        <Checkbox/>
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

            </template>
        </Modal>
        <ul class="grid--cards style-reset">
            <li class="product" 
                v-if="
                    getProductsStatus === 'success' &&
                    getProductsData?.products
                " 
                v-for="product in getProductsData.products"
            >
                <!-- @vue-skip: Serialisation type mismatch -->
                <ProductCard :key="product.id" :product="product"/>
            </li>
            <li class="product" 
                v-else
                v-for="_ in Array(32)"
            >
                <ProductCard :loading="true"/>
            </li>
        </ul>
    </template>
    <h6 class="no-results" v-else>No Products Found</h6>
</template>

<style lang="scss" scoped>

.filter-sort-buttons__container {
    padding-top: 1rem;
    padding-inline: 1rem;

    display: flex;
    gap: 1rem;

    > .filter-sort-buttons__button {
        &::v-deep > svg {
            min-width: revert;
            width: calc(var(--browser-fs-scale) * 1.75rem);
        }
    }
}

.filter-modal__content {
    display: flex;
    gap: 1rem;

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

                &::v-deep > svg {
                    min-width: revert;
                    width: calc(var(--browser-fs-scale) * 1.25rem);
                }
            }
        }

        &::v-deep .tag-box__wrapper {
            padding-inline: 0.5em;
            padding-bottom: 0.5em;
        }
    }

    .content-panel__selected-options {
        &::v-deep .tag-box__wrapper {
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

                    &::v-deep > .input--checkbox {
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
}

.no-results {
    padding: 1rem;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

</style>