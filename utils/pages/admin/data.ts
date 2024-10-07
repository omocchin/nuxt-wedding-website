import { rsvpForm } from '~/utils/pages/rsvp'

export const database = {
  title: 'GUESTS',
  headers: [
    [
      { title: "Index", value: "index" },
      { title: "First Name", value: "firstName" },
      { title: "Last Name", value: "lastName" },
      { title: "Email", value: "email" },
      { title: "Food Preferences", value: "food" },
      { title: "Song Requests", value: "song" },
      { title: "Attendance", value: "attendance" },
      { title: "Plus One", value: "plusOne" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    [
      { title: "Index", value: "index" },
      { title: "First Name", value: "firstName" },
      { title: "Last Name", value: "lastName" },
      { title: "Guest ID", value: "guestsId" },
      { title: "Food Preferences", value: "food" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    [
      { title: "Index", value: "index" },
      { title: "First Name", value: "firstName" },
      { title: "Last Name", value: "lastName" },
      { title: "Email", value: "email" },
      { title: "Attendance", value: "attendance" },
      { title: "Plus One", value: "plusOne" },
    ]
    
  ],
  tabNames: ['GUESTS', 'PLUS ONES', 'ALL'],
  dataComponents: rsvpForm.formComponents,
  dialog: {
    title: 'CONFIRMATION',
    body: 'Are you sure you want to delete',
    bodyAttribute: 'firstName'
  },
}