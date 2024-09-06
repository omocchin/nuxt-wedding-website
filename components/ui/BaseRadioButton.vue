<template>
  <div class="text-subtitle-1">{{ component?.title }}</div>

  <v-radio-group
    v-model="model"
    :error-messages="errorMessage"
    inline
  >
    <v-radio
      v-for="option in component?.options"
      :label="option.label"
      :value="option.value"
    />
  </v-radio-group>
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
