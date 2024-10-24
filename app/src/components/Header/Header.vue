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
}

</style>