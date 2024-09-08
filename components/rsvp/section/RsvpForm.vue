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
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';

import { rsvpForm, type RsvpFormComponents } from '~/utils/pages/rsvp'
import { type SnackBar } from '~/utils/variables/interfaces'
import { barControl } from '~/utils/variables/functions'
import { useFirebaseActions } from '~/composables/useDatabase'

const { addItemWithUniqueId, deleteDataFromFirebase } = useFirebaseActions();
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
  // write data into database
  if (allValid) {
    for (const form of forms.value) {
      const formValues = replaceUndefinedWithNull(form.values)
      if (form.props.dependentForm) {
        try {
          let values = {...formValues}
          values[form.props.dependentForm + '_id'] = dependentValues[form.props.dependentForm]
          await addItemWithUniqueId(form.props.name, values);
        } catch (error) {
          // delete the depending value
          await deleteDataFromFirebase(`${form.props.dependentForm}/${dependentValues[form.props.dependentForm]}`)
          snackBar.value = barControl(snackBar.value, rsvpForm.submitDatabaseFailureError, rsvpForm.errorColor)
        }
      } else {
        try {
          const id = await addItemWithUniqueId(form.props.name, formValues);
          if (dependentForms.includes(form.props.name)) {
            dependentValues[form.props.name] = id.key
          }
        } catch (error) {
          snackBar.value = barControl(snackBar.value, rsvpForm.submitDatabaseFailureError, rsvpForm.errorColor)
        }
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
