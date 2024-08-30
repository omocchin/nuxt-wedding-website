<template>
  <v-row class="no-gutters">
    <v-col
      class="pa-2"
      cols="4"
      :order="order && (order % 2 == 0) ? 'last' : 'first'"
      style="align-content: center;"
    >
      <base-image
        :image="image"
      ></base-image>
    </v-col>
    <v-col
      class="pa-2"
      cols="8"
      :order="order && (order % 2 == 0) ? 'first' : 'last'" 
      style="align-content: center;"
    >
      <v-card
        variant="text"
      >
        <v-card-item class="pa-2">
          <v-card-title>
            {{ title }}
          </v-card-title>
          <v-card-subtitle>
            {{ subtitle }}
          </v-card-subtitle>
        </v-card-item>
        <v-divider
          class="border-opacity-50"
          length="100"
          thickness="2"
          :color="dividerColor"
        />
        <v-card-text class="pa-2">
          {{ text }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <slot/>
</template>

<script setup lang="ts">
import BaseImage from '~/components/ui/BaseImage.vue'

interface Props {
  image: string
  title: string
  subtitle: string
  text: string
  order: number
  dividerColor: string
}

const props = withDefaults(defineProps<Props>(), {
  image: '',
  title: '',
  subtitle: '',
  text: '',
  order: undefined,
  dividerColor: ''
})
</script>
