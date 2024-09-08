import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { type RsvpFormComponent } from '~/utils/pages/rsvp'

// Creates the validation schema for the form
export const createTypedSchema = (fields: Array<RsvpFormComponent>, dependentForm: any = null) => {
  const shape: Record<string, yup.AnySchema> = {};

  fields.forEach((field) => {
    if (dependentForm) {        
      if (field.validationType == 'text' && field?.dependent) {
        if (dependentForm.find((component: RsvpFormComponent) => component.label === field?.dependent)?.value && field?.required) {
          shape[field.label] = yup.string().required(`${field.title} is required`);
        } else {
          shape[field.label] = yup.string();
        }
      }
    }
    else {
      if (field.required) {
        if (field.validationType == 'text') {
          shape[field.label] = yup.string().required(`${field.title} is required`);
        } else if (field.validationType == 'email') {
          shape[field.label] = yup.string().email('Invalid email address').required(`${field.title} is required`);
        } else if (field.validationType == 'boolean') {
          shape[field.label] = yup.boolean().required(`${field.title} is required`);
        }
      } else {
        if (field.validationType == 'text') {
          shape[field.label] = yup.string();
        } else if (field.validationType == 'email') {
          shape[field.label] = yup.string().email('Invalid email address');
        }
      }
    }
  });

  return toTypedSchema(yup.object().shape(shape));
}