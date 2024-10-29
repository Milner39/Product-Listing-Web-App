<script setup lang="ts">
// #region Imports

import CloseSVG from "~/assets/svgs/Close.vue"

// #endregion Imports


defineProps<{
    tags: string[]
}>()

const emit = defineEmits<{
    removeTag: [index: number]
}>()

</script>

<template>
    <div class="tag-box__wrapper">
        <div class="tag-box__title">
            <slot v-if="$slots.titleSVGLeft" name="titleSVGLeft"/>
            <slot name="titleText"/>
            <slot v-if="$slots.titleSVGRight" name="titleSVGRight"/>
        </div>
        <ul v-if="tags?.length > 0" class="tag-box__tags style-reset">
            <div v-for="tag, index of tags" class="tag-box__tag">
                <p>{{ tag }}</p>
                <button class="style-reset"
                    @click="$emit('removeTag', index)"
                >
                    <CloseSVG/>
                </button>
            </div>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    
.tag-box__wrapper {
    // IMPROVE: Style
    min-width: 30ch;
    max-width: 35ch;

    display: block;
    border: 1px solid gray;
    border-radius: 0.5em;

    padding-inline: 0.5em;

    > .tag-box__title {
        display: flex;
        gap: 0.5em;

        > :not(svg) {
            margin-right: auto;
        }
    }

    > .tag-box__tags {
        display: flex;
        flex-wrap: wrap;

        gap: 0.5rem;

        padding-bottom: 0.5em;

        > .tag-box__tag {
            width: fit-content;
            
            display: flex;
            gap: 0.25em;

            padding: 0.25em 0.75em;

            border-radius: 2em;

            background-color: rgb(218, 232, 255);
        }
    }
}

</style>