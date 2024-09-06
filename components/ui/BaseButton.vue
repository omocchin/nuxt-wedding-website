<template>
  <v-btn
    elevation="16"
    :size="size || undefined"
    :width="width"
    :height="height"
    :color="color"
    :to="link"
    :href="hrefLink"
    :type="type"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
interface Props {
  size?: string
  width?: string
  height?: string
  color?: string
  link?: string
  hrefLink?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '',
  width: '',
  height: '',
  color: undefined,
  link: undefined,
  hrefLink: '',
  type: undefined
})
</script>
