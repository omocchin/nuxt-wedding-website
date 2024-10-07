<template>
  <base-snack-bar v-model="snackBar.model" :message="snackBar.message" :color="snackBar.color"/>
  <v-form @submit.prevent="onSubmit">
    <div
      v-for="(value, key) in formComponents"
      :key="key"
    >
      <div v-if="value?.dependentValue">
        <rsvp-base-form
          v-if="dependentValues[value.dependentValue]"
          :form-components="value.components"
          :name="value.name"
          :email-title="value.emailTitle"
          :component-order="value.componentOrder"
          :dependent-form="value.dependentForm || undefined"
          :dependent="hasDependentForm(key) ? getDependentValue(key) : undefined"
          @dependent-value="(dependent) => dependentValues[getDependentValue(key)]= dependent"
          ref="forms"
        />
      </div>
      <div v-else>
        <rsvp-base-form
          :form-components="value.components"
          :name="value.name"
          :email-title="value.emailTitle"
          :component-order="value.componentOrder"
          :dependent-form="value.dependentForm || undefined"
          :dependent="hasDependentForm(key) ? getDependentValue(key) : undefined"
          @dependent-value="(dependent) => dependentValues[getDependentValue(key)]= dependent"
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
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';

import { rsvpForm } from '~/utils/pages/rsvp'
import { type SnackBar } from '~/utils/variables/interfaces'
import { barControl, reorderObject } from '~/utils/variables/functions'
import { confirmEmail } from '~/utils/email/info'
import { confirmationTemplate } from '~/utils/email/templates'

const emits = defineEmits(['rsvpConfirmed'])

const formComponents = ref<any>({})
const dependentValues = ref<any>({})
const forms = ref<any>([])

// check if there is a form that depends on another form to show component
const hasDependentForm = (currentKey:string | number) => {
  return Object.values(formComponents.value).some((form: any) => form.dependentForm === currentKey);
}

// Get the dependent value of the form
const getDependentValue = (currentKey: string | number) => {
  const dependentForm: any = Object.values(formComponents.value).find((form:any) => form.dependentForm === currentKey);
  return dependentForm ? dependentForm.dependentValue : null;
}

const snackBar = ref<SnackBar>({} as SnackBar)

const replaceUndefinedWithNull = (obj: Record<string, any>): Record<string, any> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = value === undefined ? '' : value;
    return acc;
  }, {} as Record<string, any>);
}

const sendEmail = async (recipientName: string | null, recipientEmail: string, emailValues: any) => {
  const response = await $fetch('/api/send-email', {
    method: 'POST',
    body: {name: recipientName, email: recipientEmail, info: confirmEmail, template: confirmationTemplate(recipientName, emailValues)},
  });
  return response
};

const addToDatabase = async (path: string, data: any) => {
  const response  = await $fetch('/api/database',{
    method: 'POST',
    body: {path: path, data: data}
  });
  return response
}

const deleteFromDatabase = async (path: string) => {
  const response  = await $fetch('/api/database',{
    method: 'DELETE',
    body: {path: path}
  });
  return response
}


// Validate each base form and submit if all validations are successful
const onSubmit = async() => {
  let allValid = true;
  let dependentForms: Array<string> = []
  let dependentValues: any = {}
  // check if forms are valid
  for (const form of forms.value) {
    if (form) {
      const result = await form.validate();
      if (!result.valid) {
        allValid = false;
      }
      else {
        if (form.props.dependentForm) {
          dependentForms.push(form.props.dependentForm)
        }
      }
    }
  }
  let recipientName = null
  let recipientEmail = null
  let dataSuccess = true
  let emailValues = []
  // write data into database
  if (allValid) {
    for (const form of forms.value) {
      const formValues = reorderObject(replaceUndefinedWithNull(form.values), form.props.componentOrder)
      emailValues.push({
        title: form.props.emailTitle,
        values: formValues
      })
      if (form.props.dependentForm) {
        try {
          let values = {...formValues}
          values[form.props.dependentForm + 'Id'] = dependentValues[form.props.dependentForm]
          await addToDatabase(form.props.name, values);
        } catch (error) {
          // delete the depending value
          await deleteFromDatabase(`${form.props.dependentForm}/${dependentValues[form.props.dependentForm]}`)
          snackBar.value = barControl(snackBar.value, rsvpForm.submitDatabaseFailureError, rsvpForm.errorColor)
          dataSuccess = false
        }
      } else {
        try {
          const response = await addToDatabase(form.props.name, formValues);
          recipientName = formValues?.firstName && formValues?.lastName ? `${formValues.firstName} ${formValues.lastName}` : null
          recipientEmail = formValues?.email || null
          if (dependentForms.includes(form.props.name)) {
            dependentValues[form.props.name] = response.key
          }
        } catch (error) {
          snackBar.value = barControl(snackBar.value, rsvpForm.submitDatabaseFailureError, rsvpForm.errorColor)
          dataSuccess = false
        }
      }
    }
    if (recipientEmail && dataSuccess) {
      const response: any = await sendEmail(recipientName, recipientEmail, emailValues)
      if (response.success) {
        emits('rsvpConfirmed')
      } else {
        snackBar.value = barControl(snackBar.value, response.message, rsvpForm.errorColor)
      }
    }
  } else {
    snackBar.value = barControl(snackBar.value, rsvpForm.submitValidationError, rsvpForm.errorColor)
  }
}

onMounted(() => {
  rsvpForm.formComponents.forEach(formComponent => {
    formComponents.value[formComponent.name] = formComponent
  });
})
</script>
