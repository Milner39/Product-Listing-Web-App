<script setup lang="ts">
// #region Imports

import SearchSVG from "~/assets/svgs/Search.vue"

// #endregion Imports


// Reactive state to control input placeholder
const placeholder = defineModel<string>("placeholder", { default: ""})

// Reactive state to control input value
const value = defineModel<string>("value", { default: ""})

</script>

<template>
    <div class="search-bar__wrapper">
        <input class="search-bar__input style-reset" type="text" 
            :placeholder="placeholder"
            v-model="value"
        />
        <button class="search-bar__svg__wrapper button--dot style-reset" type="button">
            <SearchSVG/>
        </button>
    </div>
</template>

<style lang="scss" scoped>

.search-bar__wrapper {
    display: grid;
    grid-template-columns: 1fr auto;

    background-color: white;
    border-radius: 9999rem;

    .search-bar__input {
        width: 100%;
        min-width: 32ch;
        padding-inline: 1em;
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