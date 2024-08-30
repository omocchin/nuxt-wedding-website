<template>
  <top-image/>
  <couple/>
  <venue/>
  <plan/>
  <rsvps/>
  <contact/>
</template>

<script setup lang="ts">
import TopImage from '~/components/home/section/TopImage.vue'
import Couple from '~/components/home/section/Couple.vue'
import Venue from '~/components/home/section/Venue.vue'
import Plan from '~/components/home/section/Plan.vue'
import Rsvps from '~/components/home/section/Rsvps.vue'
import Contact from '~/components/home/section/Contact.vue'

definePageMeta({
  layout: 'primary'
})
</script>

<style>
.is-home-section img {
  opacity: 0.75;
}
</style>
