<template>
  <base-dialog
    v-model:model="dialog"
    :title="dialogTitle"
    :body="dialogBody"
    action-text="DELETE"
    @action="deleteItem()"
  ></base-dialog>
  <v-container>
    <v-card>
      <v-tabs
        v-model="tab"
        align-tabs="center"
        color="deep-purple-accent-4"
      >
        <v-tab
          v-for="(tab, index) in database.tabNames"
          :key="tab"
          :value="index"
        >
          {{ tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item
          v-for="tab in database.tabNames"
          :key="tab"
          :value="tab"
          item-value="id"
        >
          <v-data-table
            :headers="tableHeader"
            :items="tableItem"
            item-value="id"
            class="elevation-1"
          >
            <template v-slot:[`item.index`]="{ index }">
              {{ index + 1 }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="error" @click="deleteItem(item)">
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </v-tabs-window-item>
      </v-tabs-window>

      <!-- Vuetify Data Table -->
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import BaseDialog from '~/components/ui/BaseDialog.vue'
import { database } from '~/utils/pages/admin/data'

definePageMeta({
  middleware: 'auth'
});

const items = ref()
const tab = ref<number>(0)
const dialog = ref<boolean>(false)
const dialogTitle = ref<string>(database.dialog.title)
const dialogBody = ref<string>('')
const deleteingItem = ref()

const tableHeader = computed(() => {
  return database.headers[tab.value]
})

const tableItem = computed(() => {
  return items.value ? items.value[tab.value] : []
})

const restructureData = (input: any) => {
  const data = input.data;
  const result = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      let userData = data[key];
      userData['id'] = key
      result.push(userData);
    }
  }

  return result;
}

const fetchFromDatabase = async (path: string) => {
  const response  = await $fetch('/api/get-database',{
    method: 'GET',
    params: {
      path: path
    }
  });
  return response
}

const getDatas = async () => {
  let values = []
  for (const data in database.dataComponents) {
    const dataValue = await fetchFromDatabase(database.dataComponents[data].name)
    values.push(restructureData(dataValue))
  }
  let all = []
  values.forEach(value => {
    all.push(...value)
  })
  
  values.push(all)
  items.value = values
}

onMounted( async () => {
  await getDatas()
})

const deleteItem = async (item = null) => {
  if (item) {
    deleteingItem.value = item
    dialog.value = true
    dialogBody.value = `${database.dialog.body} ${deleteingItem.value[database.dialog.bodyAttribute]}?`
  }
  else {
    const dbName = database.dataComponents[tab.value].name
    const path = `${dbName}/${deleteingItem.value.id}`
    const response  = await $fetch('/api/database',{
      method: 'DELETE',
      body: {path: path}
    });
    dialog.value = false
    getDatas()
  }
}
</script>