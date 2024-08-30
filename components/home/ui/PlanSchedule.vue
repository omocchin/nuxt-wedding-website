<template>
  <div
    class="font-weight-bold ms-1 mb-2 text-center text-h6"
    v-html="plan.timelineTitle"
  />
  <v-timeline align="start" class="mb-6">
    <v-timeline-item
      v-for="(event, index) in plan.timeline"
      :key="event.time"
      :dot-color="(index % 2 == 0) ? 'deep-purple-lighten-1' : 'green'"
      size="x-small"
    >
      <div>
        <p :class="`text-${(index % 2 == 0) ? 'deep-purple-lighten-1' : 'green text-right'}`">{{ event.time }} </p>
        <p :class="(index % 2 == 0) ? '' : 'text-right'">{{ event.title }}</p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import { plan } from '~/utils/pages/home';
</script>
