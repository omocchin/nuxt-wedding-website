<template>
  <home-section
    class="is-home-section"
  >
    <base-image
      customClass="bg-black"
      :image="plan.image"
      height="150"
    >
      <section-image-title
        :title="plan.title"
      />
    </base-image>
    <v-card class="mt-4">
      <v-card-text>
        <plan-schedule></plan-schedule>
        <plan-questions></plan-questions>
      </v-card-text>
    </v-card>
  </home-section>
</template>

<script setup lang="ts">
import HomeSection from '~/components/home/ui/Section.vue'
import BaseImage from '~/components/ui/BaseImage.vue'
import PlanSchedule from '~/components/home/ui/PlanSchedule.vue'
import PlanQuestions from '~/components/home/ui/PlanQuestions.vue'
import SectionImageTitle from '~/components/home/ui/SectionImageTitle.vue'

import { plan } from '~/utils/pages/home'
</script>
