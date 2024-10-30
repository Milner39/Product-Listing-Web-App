<script setup lang="ts">
// #region Imports

import CloseSVG from "~/assets/svgs/Close.vue"

// #endregion Imports


const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    close: []
}>()


// Define reference to `open` prop so its value can be changed in this component
const openRef = ref(props.open)

// Open model if initial prop value is true
onMounted(() => { if (props.open === true) open() })

// Watch for changes of `open` prop
watch(() => props.open, (newVal, prevVal) => {
    openRef.value = newVal // update reference

    // Open model if `open` prop value is updated
    if (newVal === true) open() 
})

const open = () => {
    const scrollY = window.scrollY
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
}

const close = () => {
    emit("close")

    const scrollY = document.body.style.top
    document.body.style.position = ""
    document.body.style.top = ""
    window.scrollTo(0, parseInt(scrollY || "0") * -1)
}
</script>

<template>
    <dialog class="modal__wrapper style-reset" :open="openRef"
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

            &::v-deep > svg {
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