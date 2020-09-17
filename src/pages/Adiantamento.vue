<template>
  <q-page padding>
    <q-card v-if="showcard" class="my-card">
      <q-card-section>
        <b>Dados da Nota/Cupom Fiscal</b>
      </q-card-section>

        <q-separator />

      <q-card-section>
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
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-input
          outlined
          v-model="danfe.nf"
          label="Número da Nota Fiscal"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-input
          outlined
          v-model="danfe.valor"
          label="Valor total da NF"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
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
      </div>
    </div>

      </q-card-section>

        <q-separator />

      <q-card-section>
        <b>Incluir itens da Nota/Cupom Fiscal</b>
      </q-card-section>
        <q-separator />

      <q-card-section>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6">
          <q-input
            outlined
            v-model="danfe.nf"
            label="Descrição do produto"
          />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-2">
          <q-input
            v-model.number="danfe.nf"
            type="number"
            outlined
            label="Quantidade"
          />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-2">
          <q-input
            v-model.number="danfe.nf"
            type="number"
            outlined
            label="Valor Total"
          />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-1">
      <q-field
        outlined
        label="R$ Unitário"
        stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0"></div>
        </template>
      </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-1">
        <q-btn
          size="16px"
          round
          color="primary"
          icon="add"
        />
      </div>
    </div>
      </q-card-section>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Descrição</th>
            <th class="text-right">Quantidade</th>
            <th class="text-right">Valor Unitário</th>
            <th class="text-right">Valor Total</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">1</td>
            <td class="text-left">Frozen Yogurt</td>
            <td class="text-right">10</td>
            <td class="text-right">6</td>
            <td class="text-right">60</td>
            <td class="text-center">X</td>
          </tr>
        </tbody>
      </q-markup-table>

    <q-separator />
    <q-card-actions>
      <q-btn
        outlined
        color="primary"
        label="Salvar"
        @click.stop.prevent="postDanfe()"
      />
    </q-card-actions>
    </q-card>

    <table-list v-if="renderComponent"
      :titulo="titulo"
      :data="data"
      :columns="columns"
      :filter="filter"
      :valorTotal="valorTotal"
    />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click.stop.prevent="showcard = true" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import TableList from 'components/TableList'
import { date } from 'quasar'

export default {
  name: 'Adiantamento',
  components: {
    'table-list': TableList
  },
  data () {
    return {
      titulo: 'Notas Fiscais',
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
        { name: 'nf', align: 'center', label: 'NF', field: 'nf', sortable: true },
        { name: 'nome', align: 'center', label: 'Fornecedor', field: 'nome', sortable: true },
        {
          name: 'valor',
          align: 'center',
          label: 'Valor',
          field: 'valor',
          format: val => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(`${val}`)),
          sortable: true
        }
      ]
    }
  },

  mounted () {
    this.getDanfe()
    this.getFornecedor()
  },

  computed: {
    valorTotal () {
      return this.data.reduce((sum, data) => {
        return (sum + data.valor)
      }, 0)
    }
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
          user_id: '1'
        })
        .then(res => {
          this.danfe.nf = ''
          this.danfe.data = ''
          this.danfe.valor = ''
          this.danfe.fornecedor_id = ''
          this.danfe.user_id = ''
          this.showcard = false
          this.forceRerender()
          this.triggerPositive()
        })
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
    },

    forceRerender () {
      this.renderComponent = false

      this.$nextTick(() => {
        this.renderComponent = true
        this.getDanfe()
      })
    },

    triggerPositive () {
      this.$q.notify({
        type: 'positive',
        message: 'Cadastrado com sucesso.'
      })
    }
  }
}
</script>
