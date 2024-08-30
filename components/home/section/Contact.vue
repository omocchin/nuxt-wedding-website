<template>
  <home-section
    class="is-home-section"
  >
    <base-image
      custom-class="bg-black"
      :image="contact.image"
      height="150"
    >
      <section-image-title
        :title="contact.title"
      />
    </base-image>
    <div class="text-subtitle-1 text-center mt-4">
      <p>{{ contact.dialog }}</p>
      <base-button
        class="my-4"
        color="accent"
        :href-link="'mailto:' + contact.email"
      >
        {{ contact.button }}
      </base-button>
    </div>
  </home-section>
</template>

<script setup lang="ts">
import HomeSection from '~/components/home/ui/Section.vue'
import BaseImage from '~/components/ui/BaseImage.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import SectionImageTitle from '~/components/home/ui/SectionImageTitle.vue'

import { contact } from  '~/utils/pages/home'
</script>
