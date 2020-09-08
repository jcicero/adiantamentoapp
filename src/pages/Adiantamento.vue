<template>
  <q-page padding>
    <q-input
      outlined
      v-model="danfe.nf"
      label="Número da Nota Fiscal"
    />
    <q-input
      outlined
      v-model="danfe.data"
      mask="####/##/##"
      label="Data">
        <template v-slot:append>
          <q-icon
            name="event"
            class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale">
              <q-date
                v-model="danfe.data"
                @input="() => $refs.qDateProxy.hide()"
                mask="YYYY/MM/DD"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
    </q-input>

    <q-select
      outlined
      v-model="danfe.fornecedor_id"
      :options="fornecedor"
      option-value="id"
      option-label="nome"
      label="Fornecedor"
      emit-value
      map-options
      />
    <q-input
      outlined
      v-model="danfe.adiantamento_id"
      label="Adiantamento"
    />
    <q-input
      outlined
      v-model="danfe.user_id"
      label="Usuario"
    />

      <q-btn
        outlined
        color="primary"
        label="Salvar"
        @click.stop.prevent="postDanfe()"
      />

  <div class="q-pa-md">
    <q-table
      title="Notas Fiscais"
      :data="danfes"
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
  </q-page>
</template>

<script>
export default {
  name: 'Adiantamento',
  data () {
    return {
      danfe: [],
      danfes: [
        {
          nf: '',
          nome: '',
          data: ''
        }
      ],
      fornecedor: [],
      filter: '',
      columns: [
        {
          name: 'data',
          required: true,
          label: 'Data',
          align: 'left',
          field: row => row.data,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'nf', align: 'center', label: 'NF', field: 'nf', sortable: true },
        { name: 'nome', align: 'center', label: 'Fornecedor', field: 'nome', sortable: true }
      ]
    }
  },

  mounted () {
    this.getDanfe()
    this.getFornecedor()
  },

  methods: {
    postDanfe () {
      this.$axios
        .post('http://adiantamento.test/api/danfe', {
          nf: this.danfe.nf,
          data: this.danfe.data,
          fornecedor_id: this.danfe.fornecedor_id,
          adiantamento_id: this.danfe.adiantamento_id,
          user_id: this.danfe.user_id
        })
        .then(res => {})
        .catch(err => {
          console.error(err)
        })
    },

    getDanfe () {
      this.$axios
        .get('http://adiantamento.test/api/danfe')
        .then(res => {
          this.danfes = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    getFornecedor () {
      this.$axios
        .get('http://adiantamento.test/api/fornecedor')
        .then(res => {
          this.fornecedor = res.data.fornecedor
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
