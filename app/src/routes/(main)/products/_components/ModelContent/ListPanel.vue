<template>
    <div class="list-panel">
        <slot name="title"/>
        <ul class="list-panel__list style-reset">
            <slot/>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

.list-panel {
    display: flex;
    flex-direction: column;

    > .list-panel__list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
}

</style>