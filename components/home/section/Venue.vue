<template>
  <home-section
    class="is-home-section"
    color="bg-primary"
  >
    <base-image
      customClass="bg-black"
      :image="venue.image"
      height="150"
    >
      <section-image-title
        :title="venue.title"
      />
    </base-image>
    <venue-card
      v-for="v in venue.venues"
      :title="v.title"
      :subtitle="v.subtitle"
      :text="v.dialog"
      :mapUrl="v.mapUrl"
      :address="v.address"
    />
  </home-section>
</template>

<script setup lang="ts">
import HomeSection from '~/components/home/ui/Section.vue'
import BaseImage from '~/components/ui/BaseImage.vue'
import VenueCard from '~/components/home/ui/VenueCard.vue'
import SectionImageTitle from '~/components/home/ui/SectionImageTitle.vue'

import { venue } from  '~/utils/pages/home'
</script>
