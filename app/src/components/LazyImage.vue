<script setup lang="ts">

const props = defineProps<{
    imageSrc?: string
}>()


const imgElement: Ref<HTMLImageElement | undefined> = ref()
const inView: Ref<boolean> = ref(false)


let observer: IntersectionObserver | undefined

const handleIntersection = () => {
    inView.value = true
    observer?.disconnect()
    // console.log(imgElement.value)
}

onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, { threshold: 1 })
    if (imgElement.value) observer.observe(imgElement.value)
})
onBeforeUnmount(() => observer?.disconnect())


// ISSUE: This doesn't not work and I don't know why
// Intersection observer thinks all images are in view

</script>

<template>
    <img ref="imgElement" :src="inView ? props.imageSrc : ''"/>
</template>