<script setup lang="ts">
// #region Imports

import CloseSVG from "~/assets/svgs/Close.vue"

// #endregion Imports


defineProps<{
    tags: string[]
}>()

const emit = defineEmits<{
    removeTag: [value: string, index: number]
}>()

</script>

<template>
    <div class="tag-box__wrapper">
        <div class="tag-box__title">
            <div v-if="$slots.titleSVGLeft" class="title-svg__wrapper">
                <slot name="titleSVGLeft"/>
            </div>
            <slot name="titleText"/>
            <div v-if="$slots.titleSVGRight" class="title-svg__wrapper">
                <slot name="titleSVGRight"/>
            </div>
        </div>
        <ul v-if="tags.length > 0" class="tag-box__tags style-reset">
            <li v-for="tag, index of tags" class="tag-box__tag">
                <p class="tag__text">{{ tag }}</p>
                <button class="tag__remove-button style-reset"
                    @click="$emit('removeTag', tag, index)"
                >
                    <CloseSVG/>
                </button>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    
.tag-box__wrapper {
    max-width: 48ch;

    border: 1px solid gray;
    border-radius: 0.5em;

    //padding-inline: 0.5em;

    > .tag-box__title {
        display: flex;
        //gap: 0.5em;

        > :not(.title-svg__wrapper) {
            flex-grow: 1;
            text-align: left;
            margin-inline: 0.5em;
        }

        .title-svg__wrapper {
            flex-grow: 0;

            display: flex;
            justify-content: center;
            align-items: center;
            aspect-ratio: 1/1;

            padding: 0.5rem;

            &::v-deep > svg {
                min-width: revert;
                width: calc(var(--browser-fs-scale) * 1rem);
            }
        }
    }

    > .tag-box__tags {
        display: flex;
        flex-wrap: wrap;

        gap: 0.5rem;

        padding-inline: 0.5em;
        padding-bottom: 0.5em;

        > .tag-box__tag {
            max-width: fit-content;
            
            display: grid;
            grid-auto-flow: column;

            padding-block: 0.25em;

            border-radius: 2em;
            background-color: rgb(218, 232, 255);

            > .tag__text {
                margin-left: 0.75em;
            }

            > .tag__remove-button {
                display: flex;
                justify-content: center;
                align-items: center;
                aspect-ratio: 1/1;

                // Add to 0.75em
                padding: 0.5em;
                margin-right: 0.25em;

                &::v-deep > svg {
                    min-width: revert;
                    height: 100%;
                }
            }
        }
    }
}

</style>