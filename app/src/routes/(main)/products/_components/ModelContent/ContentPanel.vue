<template>
    <div class="content-panel">
        <slot name="title"/>
        <div class="content">
            <slot/>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.content-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: rgb(245, 245, 245);

    margin-block: -1rem;
    margin-right: -1rem;
    padding: 1rem;

    border-left: 1px solid gray;

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}

</style>