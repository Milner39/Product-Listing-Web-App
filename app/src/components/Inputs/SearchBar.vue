<script setup lang="ts">
// #region Imports

import SearchSVG from "~/assets/svgs/Search.vue"

// #endregion Imports


defineProps<{
    placeholder?: string
}>()

</script>

<template>
    <div class="search-bar__wrapper">
        <input class="search-bar__input style-reset" type="text" :placeholder="placeholder"/>
        <button class="search-bar__svg__wrapper button--dot style-reset">
            <SearchSVG/>
        </button>
    </div>
</template>

<style lang="scss" scoped>

.search-bar__wrapper {
    display: grid;
    grid-auto-flow: column;

    background-color: white;
    border-radius: 9999rem;

    .search-bar__input {
        width: 100%;
        min-width: 32ch;
        padding-left: 1em;
        padding-block: 0.5em;
    }

    .search-bar__svg__wrapper {
        margin-block: auto;
        margin-right: 0.5rem;
        height: 75%;

        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1/1;
    }

    &:focus-within {
        outline: 1px solid gray;
    }
}

</style>