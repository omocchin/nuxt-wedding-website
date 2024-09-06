<template>
  <v-form @submit.prevent="onSubmit">
    <div
      v-for="(value, key) in formComponents"
      :key="key"
    >
      <div v-if="value?.dependantValue">
        <rsvp-base-form
          v-if="dependantValues[value.dependantValue]"
          :form-components="value.components"
          :dependant="hasDependantForm(key) ? getDependantValue(key) : undefined"
          @dependant-value="(dependant) => dependantValues[getDependantValue(key)]= dependant"
          ref="forms"
        />
      </div>
      <div v-else>
        <rsvp-base-form
          :form-components="value.components"
          :dependant="hasDependantForm(key) ? getDependantValue(key) : undefined"
          @dependant-value="(dependant) => dependantValues[getDependantValue(key)]= dependant"
          ref="forms"
        />
      </div>
    </div>
    <v-container
      class="d-flex"
    >
      <div class="w-50 pr-2">
        <base-button
          class="w-100"
          color="accent2"
          size="large"
          type="submit"
          to="/"
        >
          {{ rsvpForm.backButton }}
        </base-button>
      </div>
      <div class="w-50 pl-2">
        <base-button
          class="w-100"
          color="accent"
          size="large"
          type="submit"
        >
        {{ rsvpForm.submitButton }}
        </base-button>
      </div>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import RsvpBaseForm from '~/components/rsvp/ui/ RsvpBaseForm.vue'
import BaseButton from '~/components/ui/BaseButton.vue'

import { rsvpForm, type RsvpFormComponents } from '~/utils/pages/rsvp'

const formComponents = ref<any>({})
const dependantValues = ref<any>({})
const forms = ref<any>([])

// check if there is a form that depends on another form to show component
const hasDependantForm = (currentKey:string | number) => {
  return Object.values(formComponents.value).some((form: any) => form.dependantForm === currentKey);
}

// Get the dependant value of the form
const getDependantValue = (currentKey: string | number) => {
  const dependantForm: any = Object.values(formComponents.value).find((form:any) => form.dependantForm === currentKey);
  return dependantForm ? dependantForm.dependantValue : null;
}

// Validate each base form and submit if all validations are successful
const onSubmit = async() => {
  let allValid = true;
  for (const form of forms.value) {
    if (form) {
      const result = await form.validate();
      if (!result.valid) {
        allValid = false;
      }
    }
  }
  if (allValid) {
    console.log('All forms are valid, proceed with submission');
  } else {
    console.log('Some forms are invalid, please fix the errors');
  }
}

onMounted(() => {
  rsvpForm.formComponents.forEach(formComponent => {
    formComponents.value[formComponent.name] = formComponent
  });
})
</script>
