<template>
    <header>
        <slot name="nav"/>
        <slot/>
    </header>
</template>

<style lang="scss" scoped>

header {
    position: sticky;
    top: 0;

    background-color: white;
    border-bottom: 2px solid black;
}

</style>