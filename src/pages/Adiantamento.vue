<template>
  <q-page padding>

    <card-processo
      :titulo="titulo"
    />

    <form-danfe
      :showcard="showcard"
      v-on:forceRenderer="forceRerender"
      v-on:showcards="showcards"
    />

    <table-list v-if="renderComponent"
      :titulo="titulo"
      :data="data"
      :columns="columns"
      :filter="filter"
      :valorTotal="valorTotal"
    />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click.stop.prevent="showcards()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import CardProcesso from 'components/CardProcesso'
import FormDanfe from 'components/FormDanfe'
import TableList from 'components/TableList'
import { date } from 'quasar'

export default {
  name: 'Adiantamento',
  components: {
    'card-processo': CardProcesso,
    'table-list': TableList,
    'form-danfe': FormDanfe
  },
  data () {
    return {
      titulo: 'Notas Fiscais',
      quantidade: 0,
      renderComponent: true,
      danfe: [],
      showcard: false,
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
          format: val => date.formatDate(`${val}`, 'DD/MM/YYYY'),
          sortable: true
        },
        {
          name: 'nf',
          align: 'center',
          label: 'NF',
          field: 'nf',
          sortable: true
        },
        {
          name: 'nome',
          align: 'center',
          label: 'Fornecedor',
          field: 'nome',
          sortable: true
        },
        {
          name: 'valor',
          field: row => row.valor,
          format: val => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(`${val}`)),
          sortable: true
        }
      ]
    }
  },

  mounted () {
    this.getDanfe()
  },

  computed: {
    valorTotal () {
      return this.data.reduce((sum, data) => {
        return (sum + data.valor)
      }, 0)
    }
  },

  methods: {
    getDanfe () {
      this.$axios
        .get(this.$axios.baseURL + 'adiantamento/' + this.$route.params.id + '/edit')
        .then(res => {
          this.data = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    forceRerender () {
      this.renderComponent = false

      this.$nextTick(() => {
        this.renderComponent = true
        this.getDanfe()
        this.showcards()
      })
    },

    showcards () {
      if (this.showcard === false) {
        this.showcard = true
      } else { this.showcard = false }
    }
  }
}
</script>
