<template>
  <v-form @submit.prevent="onSubmit">
    <rsvp-base-form
      :form-components="formComponents"
      dependant="plusOne"
      @dependant-value="(dependant) => plusOne = dependant"
    />
    <rsvp-base-form
      v-if="plusOne"
      :form-components="plusOneFormComponents"
    />
    <v-btn
      class="mt-2"
      text="Submit"
      type="submit"
      block
    ></v-btn>
  </v-form>
</template>

<script setup lang="ts">
import RsvpBaseForm from '~/components/rsvp/ui/ RsvpBaseForm.vue'

import { rsvpForm, type RsvpFormComponent } from '~/utils/pages/rsvp'

const formComponents = ref<Array<RsvpFormComponent>>(rsvpForm.formComponents)
const plusOneFormComponents = ref<Array<RsvpFormComponent>>(rsvpForm.plusOneFormComponents)

const plusOne = ref<boolean>()


const onSubmit = async() => {

}
</script>
