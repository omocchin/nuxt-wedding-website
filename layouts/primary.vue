<template>
  <div :id="deviceId">
    <slot/>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const deviceId = ref<string>('mobile')

onMounted(() => {
  console.log(mobile.value)
  if (!mobile.value) {
    deviceId.value = 'non-mobile'
  }
})
</script>

<style>
#non-mobile {
  max-width: 100rem;
  margin: auto;
}
</style>
