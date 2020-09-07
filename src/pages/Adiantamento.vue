<template>
  <q-page padding>
  <div class="q-pa-md">
    <q-table
      title="Notas Fiscais"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Adiantamento',
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Data',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'nf', label: 'NF', field: 'nf', sortable: true }
      ],
      data: [
        {
          name: '10/09/2020'
        }
      ]
    }
  }
}
</script>
