<template>
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

      <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">
            TOTAL: {{ valorTotal | formatValue() }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'TableList',
  props: ['titulo', 'data', 'columns', 'filter', 'valorTotal'],
  filters: {
    formatValue (str) {
      return (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(str))
    }
  }
}
</script>
