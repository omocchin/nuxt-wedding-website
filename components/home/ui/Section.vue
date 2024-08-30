<template>
  <v-container
    :class="color"
  >
    <p v-if="title" class="text-h5 text-center mb-4">{{ title }}</p>
    <slot/>
  </v-container>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  color: ''
})
</script>
