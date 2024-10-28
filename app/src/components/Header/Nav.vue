<script setup lang="ts">
// #region Imports

import MenuSVG from "~/assets/svgs/Menu.vue"
import CloseSVG from "~/assets/svgs/Close.vue"

// #endregion Imports


// Reactive state
let dropdownOpen = ref(false) // Whether the dropdown is open
let navMainCollapsed = ref(false) // Whether `nav` is collapsed


// Get a reference to the `nav` element
const nav = useTemplateRef("nav")

// Define resize subroutine to control `navMainCollapsed`
const onResize = () => {
    if (nav.value) {
        const navStyles = getComputedStyle(nav.value)
        const navInternalWidth = 
            parseFloat(navStyles.width.slice(0, -2)) -
            parseFloat(navStyles.paddingLeft.slice(0, -2)) -
            parseFloat(navStyles.paddingRight.slice(0, -2))

        
        const onlyNavCollapsedElements = nav.value.querySelectorAll(".nav--collapsed")
        const onlyNavExpandedElements = nav.value.querySelectorAll(".nav--expanded")
       

        
    }
}


// Set up a resize observer to call `onResize` when `nav` changes size
let resizeObserver: ResizeObserver | null = null
const setupResizeObserver = () => {
    resizeObserver = new ResizeObserver(_ => {
        onResize()
    })
    if (nav.value) resizeObserver.observe(nav.value)
}
onMounted(() => setupResizeObserver())
onBeforeUnmount(() => { if (resizeObserver) resizeObserver.disconnect() })

</script>

<template>
    <nav role="navigation" ref="nav">
        <button class="nav__dropdown-toggle style-reset nav--collapsed" type="button" 
            :title="(dropdownOpen ? 'Close' : 'Open') + ' dropdown'"
            @click="() => {dropdownOpen = !dropdownOpen}"
        >
            <MenuSVG v-if="!dropdownOpen"/>
            <CloseSVG v-else/>
        </button>
        <NuxtLink to="/" class="nav__logo__wrapper style-reset">
            <h5 class="nav__logo--text">Product Lister</h5>
        </NuxtLink>
        <div class="nav__main__wrapper">
            <ul class="nav__main__list style-reset">
                <li class="nav__main__item">
                    <NuxtLink to="/products" class="nav__main__link nowrap style-reset">
                        <p>Find Products</p>
                    </NuxtLink>
                </li>
                <li class="nav__main__item">
                    <NuxtLink to="/about" class="nav__main__link nowrap style-reset">
                        <p>About</p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div class="nav__actions__container">
            <NuxtLink to="/" class="nowrap bold grid-center style-reset nav--expanded">
                <p>List Product</p>
            </NuxtLink>
            <NuxtLink to="/" class="button--pill style-reset">
                <p>Contact</p>
            </NuxtLink>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

nav {
    padding: 1rem;

    display: flex;
    align-items: center;
    column-gap: 1rem;
}


.nav__dropdown-toggle {
    flex-shrink: 0;
    padding: 0.5rem;

    > :global(svg) {
        min-width: revert;
        width: calc(var(--browser-fs-scale) * 1.25rem);
    }
}


.nav__logo__wrapper {
    .nav__logo--text {
        text-wrap: nowrap;
    }
}


.nav__main__wrapper {
    > .nav__main__list {
        display: flex;

        > .nav__main__item {
            > .nav__main__link {
                display: block;
                padding: 0 1rem;
            }
        }
    }
}

.nav__actions__container {
    display: flex;
    column-gap: 1rem;

    margin-left: auto;
}

</style>