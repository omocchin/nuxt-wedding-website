<template>
  <v-card
    class="mt-2"
    elevation="16"
    :color="color || undefined"
  >
    <v-card-item>
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-subtitle>
        {{ subtitle }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{ text }}
    </v-card-text>
    <v-container class="pt-0">
      <v-row align="center">
        <v-col cols="2">
          <v-btn
            icon="mdi-map-marker-radius-outline"
            size="default"
            density="comfortable"
            color="accent"
            :href="mapUrl"
            target="_blank"
          />
        </v-col>
        <v-col>
          <p>{{ address }}</p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  text: string
  color?: string
  mapUrl: string
  address: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  text: '',
  color: '',
  mapUrl: '',
  address: ''
})
</script>
