<template>
  <div
    v-for="question in plan.questions"
    class="font-weight-bold ms-1 mb-6 text-center text-h6"
  >
    {{ question.title }}
    <div class="text-subtitle-1 text-center" v-html="question.explanation" />
  </div>
</template>

<script setup lang="ts">
import { plan } from '~/utils/pages/home'
</script>