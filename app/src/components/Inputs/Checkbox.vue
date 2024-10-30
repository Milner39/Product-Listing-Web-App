<script setup lang="ts">
// #region Imports

import CheckmarkSVG from "~/assets/svgs/Checkmark.vue"

// #endregion Imports


// Reactive state to control if checkbox is checked
const checked = defineModel<boolean>("checked", { default: false })

</script>

<template>
    <button class="input--checkbox style-reset" type="button" :checked="checked"
        @click.stop="checked = !checked"
    >
        <CheckmarkSVG v-if="checked"/>
    </button>
</template>