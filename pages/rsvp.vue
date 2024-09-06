<template>
  <top-image/>
  <rsvp-form/>
</template>

<script setup lang="ts">
import TopImage from '~/components/rsvp/section/TopImage.vue'
import RsvpForm from '~/components/rsvp/section/RsvpForm.vue'

definePageMeta({
  layout: 'primary'
})
</script>
