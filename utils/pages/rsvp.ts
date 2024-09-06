import * as yup from 'yup';

interface Options {
  label: string;
  value: boolean | string;
}

export interface RsvpFormComponent {
  title: string;
  label: string;
  type?: string;
  dependant?: string;
  required?: boolean;
  validationType?: string;
  options?: Array<Options>;
  value?: any;
  errorMessage?: any;

}

export const topImage = {
  title: 'RSVP',
  image: 'https://cdn.pixabay.com/photo/2016/11/23/00/31/bouquet-1851462_1280.jpg'
}

export const rsvpForm = {
  title: 'ADD YOUR DETAILS',
  formComponents: [
    {
      title: 'First Name',
      label: 'firstName',
      type: 'text-field',
      required: true,
      validationType: 'text'
    },
    {
      title: 'Last Name',
      label: 'lastName',
      type: 'text-field',
      required: true,
      validationType: 'text'
    },
    {
      title: 'Email Address',
      label: 'email',
      type: 'text-field',
      required: true,
      validationType: 'email'
    },
    {
      title: 'Will you be able to attend?',
      label: 'attendance',
      type: 'radio',
      required: true,
      validationType: 'boolean',
      options: [
        {
          label: 'YES',
          value: true
        },
        {
          label: 'NO',
          value: false
        }
      ]
    },
    {
      title: 'Food Allergies / Preferences',
      label: 'food',
      type: 'text-area',
      required: false,
      validationType: 'text'
    },
    {
      title: 'Song Suggestions',
      label: 'song',
      type: 'text-area',
      required: false,
      validationType: 'text'
    },
    {
      title: 'Are you bringing a plus one?',
      label: 'plusOne',
      type: 'radio',
      required: true,
      validationType: 'boolean',
      options: [
        {
          label: 'YES',
          value: true
        },
        {
          label: 'NO',
          value: false
        }
      ]
    }
  ],
  plusOneFormComponents: [
    {
      title: 'First Name',
      label: 'plusOneFirstName',
      type: 'text-field',
      dependant: 'plusOne',
      required: true,
      validationType: 'text'
    },
    {
      title: 'Last Name',
      label: 'plusOneLastName',
      type: 'text-field',
      dependant: 'plusOne',
      required: true,
      validationType: 'text'
    },
    {
      title: 'Food Allergies / Preferences',
      label: 'plusOneFood',
      type: 'text-field',
      dependant: 'plusOne',
      required: false,
      validationType: 'text'
    }
  ]
}