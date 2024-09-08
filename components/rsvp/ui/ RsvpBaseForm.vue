<template>
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
      v-model:model="component.value"
      :error-message="fieldErrorMessages(component.label)"
    />
    <base-text-area
      v-else-if="component.type == 'text-area'"
      :component="component"
      v-model:model="component.value"
      :error-message="fieldErrorMessages(component.label)"
    />
  </div>
</template>

<script setup lang="ts">
import BaseTextField from '~/components/ui/BaseTextField.vue'
import BaseTextArea from '~/components/ui/BaseTextArea.vue'
import BaseRadioButton from '~/components/ui/BaseRadioButton.vue'

import { rsvpForm, type RsvpFormComponent } from '~/utils/pages/rsvp'

const emits = defineEmits(['dependentValue'])

interface Props {
  formComponents: Array<RsvpFormComponent>
  name: string
  dependentForm?: string
  dependent?: string
}

const props = withDefaults(defineProps<Props>(), {
  formComponents: undefined,
  name: undefined,
  dependentForm: undefined,
  dependent: undefined
})

// Create validation schema
const validationSchema = createTypedSchema(props.formComponents)

// Define form and validation schema
const { validate, values, errors } = useForm({
  validationSchema: computed(() => validationSchema),
});

// Define value and error message in each form component
props.formComponents.forEach((field) => {
  const { value, errorMessage } = useField(field.label);
  field.value = value;
  field.errorMessage = errorMessage;
});

// Get the error value for the guest form component
const fieldErrorMessages = (fieldName: string) => errors.value[fieldName] || [];

// Get the depending value of another form which is a value to wether show the other form or not
const dependentValue = computed(() => {
  return props.dependent ? props.formComponents.find(component => component.label === props.dependent)?.value : false
})

defineExpose({
  validate,
  values,
  props
});

watch((dependentValue), () => {
  emits('dependentValue', dependentValue.value)
})
</script>
