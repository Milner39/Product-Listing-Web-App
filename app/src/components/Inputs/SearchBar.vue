<script setup lang="ts">

defineProps<{
    placeholder?: string
}>()

</script>

<template>
    <div class="search-bar__wrapper">
        <input class="search-bar__input style-reset" type="text" :placeholder="placeholder"/>
    </div>
</template>

<style lang="scss" scoped>

.search-bar__wrapper {
    background-color: white;
    border-radius: 1em;

    .search-bar__input {
        width: 100%;
        min-width: 32ch;
        padding-left: 1rem;
    }
}

</style>