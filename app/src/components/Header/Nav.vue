<script setup lang="ts">
// #region Imports

import MenuSVG from "~/assets/svgs/Menu.vue"
import CloseSVG from "~/assets/svgs/Close.vue"

// #endregion Imports

let dropdownOpen = ref(false)
let navMainShown = ref(false)

</script>

<template>
    <nav role="navigation">
        <button class="nav__dropdown-toggle style-reset" type="button" 
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
                    <NuxtLink to="/products" class="nav__main__link style-reset">
                        <p>Explore</p>
                    </NuxtLink>
                </li>
                <li class="nav__main__item">
                    <NuxtLink to="/about" class="nav__main__link style-reset">
                        <p>About</p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div class="nav__actions__container">
            <NuxtLink to="/" class="nowrap bold grid-center style-reset">
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
    gap: 1rem;
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
    gap: 1rem;

    margin-left: auto;
}

</style>