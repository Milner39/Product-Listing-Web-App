<script setup lang="ts">
// #region Imports

import CheckmarkSVG from "~/assets/svgs/Checkmark.vue"

// #endregion Imports


const checked: Ref<boolean> = ref(false)


</script>

<template>
    <button class="input--checkbox style-reset" type="button" :checked="checked"
        @click.stop="checked = !checked"
    >
        <CheckmarkSVG v-if="checked"/>
    </button>
</template>

<style lang="scss" scoped>

</style>