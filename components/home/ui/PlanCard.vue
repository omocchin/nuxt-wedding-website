<template>
  <v-card>
    <v-card-text>
      <div class="font-weight-bold ms-1 mb-2 text-center text-h6" :class="customClass" v-html="title"></div>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title: string
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  customClass: ''
})
</script>
