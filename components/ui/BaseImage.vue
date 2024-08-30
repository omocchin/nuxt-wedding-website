<template>
  <div>
    <v-img
      class="is-section-image"
      :class="customClass"
      cover
      :src="image"
      :height="height"
      :width="width"
    >
      <slot></slot>
    </v-img>
  </div>
</template>

<script setup lang="ts">
interface Props {
  customClass?: string
  image: string
  height?: string
  width?: string
  divClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  image: '',
  height: undefined,
  width: undefined,
  divClass: '',
  ratio: ''
})
</script>
