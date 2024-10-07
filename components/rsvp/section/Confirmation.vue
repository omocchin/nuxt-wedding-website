<template>
  <v-container>
    <v-card
      class="mt-2"
      elevation="16"
    >
      <v-card-item>
        <v-card-title class="text-center">
          {{ confirmation.title }}
        </v-card-title>
      </v-card-item>

      <v-card-text>
        {{ confirmation.dialog }}
      </v-card-text>
      <v-btn
        to="/"
        :text="confirmation.buttonText"
        variant="text"
        color="accent"
        nuxt
      />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { confirmation } from '~/utils/pages/rsvp'
</script>
