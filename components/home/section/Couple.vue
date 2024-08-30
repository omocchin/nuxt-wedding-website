<template>
  <home-section
    :title="couple.title"
  >
    <profile
      v-for="(profile, index) in couple.profiles"
      :image="profile.image"
      :title="profile.name"
      :subtitle="profile.subtitle"
      :text="profile.dialog"
      :order="profile.order"
      :dividerColor="profile.backgroundColor"
    >
      <v-divider v-if="index == 0" class="my-4"></v-divider>
    </profile>
  </home-section>
</template>

<script setup lang="ts">
import HomeSection from '~/components/home/ui/Section.vue'
import Profile from '~/components/home/ui/Profile.vue'

import { couple } from  '~/utils/pages/home'
</script>
