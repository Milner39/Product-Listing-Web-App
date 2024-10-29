<script setup lang="ts">
// #region Imports

import CloseSVG from "~/assets/svgs/Close.vue"

// #endregion Imports


defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    close: []
}>()

const close = () => {
    emit("close")
}
</script>

<template>
    <dialog class="modal__wrapper style-reset" :open="open"
        @click.self="close"
    >
        <div class="modal">
            <div class="modal__header">
                <slot name="title"/>
                <button class="modal__close-button style-reset" type="button"
                    @click="close"
                >
                    <CloseSVG/>
                </button>
            </div>
            <slot/>
        </div>
    </dialog>
</template>

<style lang="scss" scoped>

.modal__wrapper[open] {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;

    padding: 1rem;

    background-color: rgba($color: #000000, $alpha: 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    --padding: 1rem;

    display: flex;
    flex-direction: column;

    overflow-y: auto;

    padding: var(--padding);
    gap: calc(var(--padding) * 2);

    background-color: white;
    border-radius: 1rem;

    > .modal__header {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1rem;

        > *:not(button) {
            text-wrap: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        > .modal__close-button {
            display: flex;
            justify-content: center;
            align-items: center;
            aspect-ratio: 1/1;

            > svg {
                padding: 0.45rem;
            }
        }
    }

    > * {
        position: relative;
    }

    > * + *::before {
        content: "";

        position: absolute;
        top: calc(-1 * var(--padding));
        left: calc(-1 * var(--padding));
        right: calc(-1 * var(--padding));

        height: 1px;
        background-color: gray;
    }
}

</style>