<template>
  <home-section
    class="is-home-section"
    color="bg-primary"
  >
    <base-image
      custom-class="bg-black"
      :image="rsvps.image"
      height="150"
    >
      <section-image-title
        :title="rsvps.title"
      />
    </base-image>
    <div class="text-subtitle-1 text-center mt-4">
      <p>{{ rsvps.dialog }}</p>
      <base-button
        class="my-4"
        color="accent"
        size="large"
      >
        {{ rsvps.button }}
      </base-button>
    </div>
  </home-section>
</template>

<script setup lang="ts">
import HomeSection from '~/components/home/ui/Section.vue'
import BaseImage from '~/components/ui/BaseImage.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import SectionImageTitle from '~/components/home/ui/SectionImageTitle.vue'

import { rsvps } from  '~/utils/pages/home'
</script>