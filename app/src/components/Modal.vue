<script setup lang="ts">
// #region Imports

import CloseSVG from "~/assets/svgs/Close.vue"

// #endregion Imports


// Reactive state to control modal is open or closed
const open = defineModel<boolean>("open", { default: false })


// Open modal if it is mounted with `:open="true"`
onMounted(() => { if (open.value === true) openModal() })

// Watcher to open modal
watch(open, () => { if (open.value === true) openModal() })


// Subroutine to open modal
const openModal = () => {
    // Prevent body scroll while preserving scroll distance
    const scrollY = window.scrollY
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`

    open.value = true
}

// Subroutine to close modal
const closeModal = () => {
    // Enable body scroll while preserving scroll distance
    const scrollY = document.body.style.top
    document.body.style.position = ""
    document.body.style.top = ""
    window.scrollTo(0, parseInt(scrollY || "0") * -1)

    open.value = false
}
</script>

<template>
    <!-- 
        Clicking outside modal closes the modal
        @click.self ensures only wrapper clicks cause the modal to close
    -->
    <dialog class="modal__wrapper style-reset" :open="open"
        @click.self="closeModal"
    >
        <div class="modal">
            <div class="modal__header">
                <slot name="title"/>
                <button class="modal__close-button style-reset" type="button"
                    @click="closeModal"
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
    z-index: 2;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100dvh;

    overflow: hidden;

    padding: 1rem;

    background-color: rgba($color: #000000, $alpha: 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    max-height: 100%;
    min-height: 75%;
    width: min(96ch, 100%);

    overflow: hidden;

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

            &:deep(> svg) {
                padding: 0.45rem;
            }
        }
    }

    > :not(.modal__header) {
        flex-grow: 1;
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