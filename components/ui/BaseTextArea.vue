<template>
  <div class="text-subtitle-1">{{ component?.title }}</div>

  <v-textarea
    density="comfortable"
    variant="outlined"
    v-model="model"
    :error-messages="errorMessage"
    auto-grow
    rows="2"
  ></v-textarea>
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
