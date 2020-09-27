<template>
    <q-card v-if="showcard" class="my-card">
      <q-card-section>
        <b>Dados da Nota/Cupom Fiscal</b>
      </q-card-section>

        <q-separator />

      <q-card-section>
    <q-select
      outlined
      v-model="danfe.fornecedor_id"
      :options="fornecedors"
      option-value="id"
      option-label="nome"
      label="Fornecedor"
      emit-value
      map-options
      use-input
      hide-selected
      fill-input
      @filter="filterFn"
      input-debounce="0"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            Sem resultados...
          </q-item-section>
        </q-item>
      </template>
    </q-select>

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
            v-model="descricaoField"
            label="Descrição do produto"
          />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-2">
          <q-input
            v-model.number="quantidadeField"
            type="number"
            outlined
            label="Quantidade"
          />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-2">
          <q-input
            v-model.number="valorField"
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
          <div class="self-center full-width no-outline" tabindex="0">{{ calcUnitario }}</div>
        </template>
      </q-field>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-1">
        <q-btn
          size="14px"
          round
          color="primary"
          icon="add"
          @click.stop.prevent="addProdutos"
        />
      </div>
    </div>
      <div class="q-pa-md">
        <q-table dense
          :data="produtos"
          :columns="columns"
          row-key="name"
        />
      </div>
      </q-card-section>

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
</template>

<script>
export default {
  name: 'FormDanfe',
  props: {
    showcard: {
      type: Boolean
    }
  },

  data () {
    return {
      danfe: [],
      fornecedors: [],
      produtos: [],
      descricaoField: '',
      quantidadeField: 0,
      valorField: 0,
      numero: 1,
      columns: [
        {
          name: 'numero',
          align: 'center',
          label: '#',
          field: 'numero',
          sortable: true
        },
        {
          name: 'descricao',
          align: 'center',
          label: 'Descrição',
          field: 'descricao',
          sortable: true
        },
        {
          name: 'quantidade',
          align: 'center',
          label: 'Quantidade',
          field: 'quantidade',
          sortable: true
        },
        {
          name: 'valor',
          align: 'center',
          field: 'valor',
          label: 'Valor',
          sortable: true
        },
        {
          name: 'unitario',
          align: 'center',
          field: 'unitario',
          label: 'Valor Unitário',
          sortable: true
        }
      ]
    }
  },

  mounted () {
    this.getFornecedor()
  },

  computed: {
    calcUnitario () {
      if (this.valorField > 0 && this.quantidadeField > 0) {
        return (this.valorField / this.quantidadeField).toFixed(2)
      } else {
        return 0
      }
    }
  },

  methods: {
    getFornecedor () {
      this.$axios
        .get(this.$axios.baseURL + 'fornecedor')
        .then(res => {
          this.fornecedor = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    postDanfe () {
      this.$axios
        .post(this.$axios.baseURL + 'danfe', {
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
          this.$emit('forceRenderer')
          this.$emit('showcards')
          this.triggerPositive()
        })
        .catch(err => {
          console.error(err)
        })
    },

    triggerPositive () {
      this.$q.notify({
        type: 'positive',
        message: 'Cadastrado com sucesso.'
      })
    },

    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.fornecedors = this.fornecedor.filter(v => v.nome.toLowerCase().indexOf(needle) > -1)
      })
    },

    addProdutos () {
      console.log(this.produtos)
      this.produtos.unshift({
        numero: this.numero++,
        descricao: this.descricaoField,
        quantidade: this.quantidadeField,
        valor: this.valorField,
        unitario: this.calcUnitario,
        id: Date.now()
      })
      this.descricaoField = ''
      this.quantidadeField = ''
      this.valorField = ''
    }
  }
}
</script>
