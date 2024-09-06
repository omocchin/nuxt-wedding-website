<template>
  <div class="text-subtitle-1">{{ component?.title }}</div>

  <v-text-field
    density="comfortable"
    variant="outlined"
    v-model="model"
    :error-messages="errorMessage"
  ></v-text-field>
</template>

<script setup lang="ts">
import { type RsvpFormComponent } from '~/utils/pages/rsvp'

interface Props {
  component: RsvpFormComponent
  errorMessage: string | undefined
}

const props = withDefaults(defineProps<Props>(), {
  component: undefined,
  errorMessage: undefined
})

const model = defineModel('model', {required: true})
</script>
