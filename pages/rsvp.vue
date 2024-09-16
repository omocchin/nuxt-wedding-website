<template>
  <top-image/>
  <rsvp-form
    v-if="!confirmation"
    @rsvp-confirmed="confirmation = !confirmation"
  />
  <confirmation
    v-if="confirmation"
  />
</template>

<script setup lang="ts">
import Confirmation from '~/components/rsvp/section/Confirmation.vue'
import TopImage from '~/components/rsvp/section/TopImage.vue'
import RsvpForm from '~/components/rsvp/section/RsvpForm.vue'

definePageMeta({
  layout: 'primary'
})

const confirmation = ref<boolean>(true)
</script>
