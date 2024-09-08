<template>
  <v-snackbar
    v-model="model"
    timeout="4000"
    location="center"
    :color="color"
  >
    {{ message }}
    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        icon="mdi-close-circle-outline"
        @click="model = false"
      />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
interface Props {
  message: string
  color: string
}

const props = withDefaults(defineProps<Props>(), {
  message: '',
  color: ''
})

const model = defineModel<boolean>()
</script>