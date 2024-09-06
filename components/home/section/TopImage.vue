<template>
  <base-image
    :image="topImage.image"
  >
    <div
      class="d-flex justify-center h-100"
    >
      <div class="d-flex flex-column">
        <div style="height: calc(100%/3);"></div>
        <div class="d-flex align-center" style="height: calc(100%/3);">
          <div>
            <p class="text-h5 text-center">{{ topImage.couple }}</p>
            <p class="text-subtitle-2 text-center">{{ topImage.dateLocation }}</p>
          </div>
        </div>
        <div class="d-flex justify-center align-center" style="height: calc(100%/3);">
          <base-button
            color="accent"
            to="/rsvp"
          >
            {{ topImage.button }}
          </base-button>
        </div>
      </div>
    </div>
  </base-image>
</template>

<script setup lang="ts">
import BaseImage from '~/components/ui/BaseImage.vue'
import BaseButton from '~/components/ui/BaseButton.vue'

import { topImage } from  '~/utils/pages/home'
</script>
