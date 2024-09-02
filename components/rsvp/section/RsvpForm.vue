<template>
  <v-form @submit.prevent="">
    <div
      v-for="component in formComponents"
      class="px-4 pt-4"
      :key="component.title"
    >
      <base-text-field
        v-if="component.type == 'text-field'"
        :component="component"
        v-model:model="component.value"
        :error-message="fieldErrorMessages(component.label)"
      />
      <base-radio-button
        v-else-if="component.type == 'radio'"
        :component="component"
        v-model:model="formValues[component.title]"
        :error-message="fieldErrorMessages(component.label)"
      />
      <base-text-area
        v-else-if="component.type == 'text-area'"
        :component="component"
        v-model:model="formValues[component.title]"
        :error-message="fieldErrorMessages(component.label)"
      />
    </div>
    <div
      class="px-4 pt-4"
    >
      <base-radio-button
        :component="rsvpForm.plusOne"
        v-model:model="plusOne"
      />
    </div>
    <div
      v-if="plusOne"
      v-for="component in plusOneFormComponents"
      class="px-4 pt-4"
    >
      <base-text-field
        v-if="component.type == 'text-field'"
        :component="component"
        v-model:model="formValues[component.title]"
      />
      <base-radio-button
        v-else-if="component.type == 'radio'"
        :component="component"
        v-model:model="formValues[component.title]"
      />
      <base-text-area
        v-else-if="component.type == 'text-area'"
        :component="component"
        v-model:model="formValues[component.title]"
      />
    </div>
  </v-form>
</template>

<script setup lang="ts">
import BaseTextField from '~/components/ui/BaseTextField.vue'
import BaseTextArea from '~/components/ui/BaseTextArea.vue'
import BaseRadioButton from '~/components/ui/BaseRadioButton.vue'

import { rsvpForm, type RsvpFormComponent } from '~/utils/pages/rsvp'
import { useForm, Form, Field } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { createTypedSchema } from '~/utils/validation'

const formComponents = ref<Array<RsvpFormComponent>>(rsvpForm.formComponents)
const plusOneFormComponents = ref<Array<RsvpFormComponent>>(rsvpForm.plusOneFormComponents)

const formValues = ref(
  Object.fromEntries(formComponents.value.map((field) => [field.label, '']))
);

console.log(formValues.value)

const plusOne = ref<boolean>()

const validationSchema = createTypedSchema(formComponents.value)
console.log('validation', validationSchema)

const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: computed(() => validationSchema),
});

formComponents.value.forEach((field) => {
  const { value, errorMessage, handleChange, handleBlur } = useField(field.label);
  field.value = value;
  field.errorMessage = errorMessage;
});

const fieldErrorMessages = (fieldName: string) => errors.value[fieldName] || [];

const isFormValid = computed(() => Object.keys(errors.value).length === 0);

// Submit form
const submitForm = (values) => {
  console.log('Form submitted with:', values);
};

handleSubmit(submitForm);

console.log('errors', errors)
console.log('ddd', formValues.value)
</script>
