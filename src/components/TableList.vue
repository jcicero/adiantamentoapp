<template>
  <div class="q-pa-md">
<div class="q-pa-md">
    <q-table
      title="Notas Fiscais"
      :data="data"
      :columns="columns"
      :filter="filter"
      row-key="name"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
  </div>
</template>

<script>
export default {
  name: 'TableList',
  props: ['titulo', 'data', 'columns', 'filter']
}
</script>
