<template>
  <v-dialog
    v-model="model"
    width="auto"
    :persistent="!closable"
  >
    <v-card>
      <v-card-title class="d-flex justify-center font-weight-bold text-clearyellow w-100">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-body-1">
        {{ body }}
      </v-card-text>
      <v-card-actions>
        <div class="d-flex justify-space-around text-subtitle-1 w-100">
          <v-btn
            variant="elevated"
            color="accent2"
            width="40%"
            @click="model = !model"
          >
            CLOSE
          </v-btn>
          <v-btn
            variant="elevated"
            color="accent"
            width="40%"
            @click="model = !model"
          >
            {{ actionText }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue';

interface Props {
  title: string
  body: string
  actionText: string
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  body: '',
  actionText: '',
  closable: true,
})

const model = defineModel('model', {required: true})

const emits = defineEmits(['close', 'action'])
</script>
