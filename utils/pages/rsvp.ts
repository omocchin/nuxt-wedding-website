interface Options {
  label: string;
  value: boolean | string;
}

export interface RsvpFormComponent {
  title: string;
  label: string;
  type?: string;
  dependent?: string;
  required?: boolean;
  validationType?: string;
  options?: Array<Options>;
  value?: any;
  errorMessage?: any;
}

export interface RsvpFormComponents {
  name: string;
  emailTitle: string;
  componentOrder: string[]
  dependentForm?: string;
  dependentValue?: string;
  components: Array<RsvpFormComponent>
}

export const topImage = {
  title: 'RSVP',
  image: 'https://cdn.pixabay.com/photo/2016/11/23/00/31/bouquet-1851462_1280.jpg'
}

export const rsvpForm = {
  title: 'ADD YOUR DETAILS',
  backButton: 'BACK',
  submitButton: 'SUBMIT',
  submitValidationError: 'Please input all required fields to submit.',
  submitDatabaseFailureError: 'Sorry something went wrong please try again.',
  errorColor: 'error',
  formComponents: [
    {
      name: 'guests',
      emailTitle: 'Guest Info',
      // The data in the db and email will appear in this order.
      // If any components are added make sure to add the label here.
      componentOrder: ['firstName', 'lastName', 'email', 'attendance', 'food', 'song', 'plusOne'],
      components: [
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
      ]
    },
    {
      name: 'plusOnes',
      emailTitle: 'Plus One Info',
      // The data in the db and email will appear in this order.
      // If any components are added make sure to add the label here.
      componentOrder:['firstName', 'lastName', 'food'],
      dependentForm: 'guests',
      dependentValue: 'plusOne',
      components: [
        {
          title: 'First Name',
          label: 'firstName',
          type: 'text-field',
          dependent: 'plusOne',
          required: true,
          validationType: 'text'
        },
        {
          title: 'Last Name',
          label: 'lastName',
          type: 'text-field',
          dependent: 'plusOne',
          required: true,
          validationType: 'text'
        },
        {
          title: 'Food Allergies / Preferences',
          label: 'food',
          type: 'text-field',
          dependent: 'plusOne',
          required: false,
          validationType: 'text'
        }
      ]
    }
  ]
}

export const confirmation = {
  title: 'RSVP RECEIVED',
  dialog: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  buttonText: 'Back to home'
}