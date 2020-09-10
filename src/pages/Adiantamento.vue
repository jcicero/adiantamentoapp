<template>
  <q-page padding>
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
      v-model="danfe.nf"
      label="Número da Nota Fiscal"
    />
    <q-input
      outlined
      v-model="danfe.valor"
      label="Valor total da NF"
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
    <table-list
      :titulo="titulo"
      :data="data"
      :columns="columns"
      :filter="filter"
    />
  </q-page>
</template>

<script>
import TableList from 'components/TableList'
export default {
  name: 'Adiantamento',
  components: {
    'table-list': TableList
  },
  data () {
    return {
      titulo: 'Notas Fiscais',
      danfe: [],
      data: [
        {
          nf: '',
          nome: '',
          data: '',
          valor: ''
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
        { name: 'nome', align: 'center', label: 'Fornecedor', field: 'nome', sortable: true },
        { name: 'valor', align: 'center', label: 'Valor', field: 'valor', sortable: true }
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
          valor: this.danfe.valor,
          fornecedor_id: this.danfe.fornecedor_id,
          adiantamento_id: this.$route.params.id,
          user_id: this.danfe.user_id
        })
        .then(res => {})
        .catch(err => {
          console.error(err)
        })
    },

    getDanfe () {
      this.$axios
        .get('http://adiantamento.test/api/adiantamento/' + this.$route.params.id + '/edit')
        .then(res => {
          this.data = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    getFornecedor () {
      this.$axios
        .get('http://adiantamento.test/api/fornecedor')
        .then(res => {
          this.fornecedor = res.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
