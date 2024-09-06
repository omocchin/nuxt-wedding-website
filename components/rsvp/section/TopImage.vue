<template>
  <base-image
    customClass="bg-black rsvp-top"
    :image="topImage.image"
    height="150"
  >
    <section-image-title
      :title="topImage.title"
    />
  </base-image>
</template>

<script setup lang="ts">
import BaseImage from '~/components/ui/BaseImage.vue'
import SectionImageTitle from '~/components/home/ui/SectionImageTitle.vue'

import { topImage } from '~/utils/pages/rsvp'
</script>

<style>
.rsvp-top img {
  opacity: 0.75;
}
</style>