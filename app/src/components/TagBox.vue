<script setup lang="ts">
// #region Imports

import CloseSVG from "~/assets/svgs/Close.vue"

// #endregion Imports


// Reactive state to hold tags to display
const tags = defineModel< Set<string> | string[] >("tags", { default: new Set() })

// Computed refs to get / set `tags` information depending on if `tags` is an Array or Set
const tagsLength = computed(() => {
    if (tags.value instanceof Set) return tags.value.size
    else return tags.value.length
})
const tagsDelete = computed(() => (value: string, index: number) => {
    if (tags.value instanceof Set) tags.value.delete(value)
    else tags.value.splice(index, 1)
})

</script>

<template>
    <div class="tag-box__wrapper">
        <ul v-if="tagsLength > 0" class="tag-box__tags style-reset">
            <li v-for="tag, index of tags" class="tag-box__tag">
                <p class="tag__text">{{ tag }}</p>
                <button class="tag__remove-button style-reset" type="button"
                    @click.stop="() => tagsDelete(tag, index)"
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

    > .tag-box__tags {
        display: flex;
        flex-wrap: wrap;

        gap: 0.5rem;

        > .tag-box__tag {
            max-width: fit-content;
            
            display: grid;
            grid-auto-flow: column;

            padding-block: 0.25em;

            border-radius: 2em;
            background-color: black;
            color: white;

            > .tag__text {
                margin-left: 0.75em;

                text-wrap: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            > .tag__remove-button {
                display: flex;
                justify-content: center;
                align-items: center;
                aspect-ratio: 1/1;

                // Add to 0.75em
                padding: 0.5em;
                margin-right: 0.25em;

                &:deep(> svg) {
                    min-width: revert;
                    height: 100%;
                }
            }
        }
    }

    > .tag-box__no-tags {
        margin-left: 0.75em;
    }
}

</style>