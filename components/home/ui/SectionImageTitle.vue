<template>
  <div
    class="d-flex justify-center align-center h-100"
  >
    <p class="text-h5 text-center font-weight-bold">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  title: ''
})
</script>
