<template>
  <base-snack-bar v-model="snackBar.model" :message="snackBar.message" :color="snackBar.color"/>
  <v-container class="h-100 d-flex flex-column justify-center align-center">
    <v-card
      class="w-100 text-center"
      :title="admin.title"
    >
      <template v-slot:actions>
        <v-btn
          class="bg-red-lighten-2"
          prepend-icon="mdi-google"
          :text="admin.google_login"
          elevation="16"
          size="large"
          block
          @click="login"
        ></v-btn>
      </template>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import BaseSnackBar from '~/components/ui/BaseSnackBar.vue';

import { useAuth } from '~/composables/useAuth';
import { type SnackBar } from '~/utils/variables/interfaces'
import { barControl, reorderObject } from '~/utils/variables/functions'
import { admin } from '~/utils/pages/admin'

const { loginWithGoogle } = useAuth();
const router = useRouter()
const snackBar = ref<SnackBar>({} as SnackBar)

const login = async () => {
  const result = await loginWithGoogle();

  if (result.success) {
    router.push({ path: "/admin/data"})
  } else {
    snackBar.value = barControl(snackBar.value, result.message, admin.errorColor)
  }
};
</script>