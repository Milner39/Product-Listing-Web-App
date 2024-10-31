<template>
    <header>
        <slot name="nav"/>
        <slot/>
    </header>
</template>

<style lang="scss" scoped>

header {
    position: sticky;
    z-index: 1;
    top: 0;

    background-color: white;
    border-bottom: 1px solid gray;
}

</style>