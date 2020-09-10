<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card" v-for="processo in processos" :key="processo.id">
            <q-card flat bordered class="my-card bg-grey-1">
              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6 text-center">{{ processo.processo }}</div>
                    <br><q-separator inset /><br>
                    <div class="text-subtitle2 text-center">
                      Valor: {{ processo.valor | formatValue() }}
                      </div>
                      <br>
                    <div class="text-subtitle2 text-center">
                      Período para compras: {{ processo.data | formatData() }}
                      a {{ processo.data | addDays() }}
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="text-subtitle2">
                  Servidor:
                  {{ processo.responsavel }}</div>
                <div class="text-subtitle2"
                  v-if="processo.status == 1">Situação: ABERTO
                </div>
                <div class="text-subtitle2"
                  v-else>Situação: FECHADO
                </div>
              </q-card-section>

              <q-separator />
            </q-card>
            <q-card-actions align="right">
              <q-btn
                flat
                round
                color="blue"
                icon="remove_red_eye"
                @click="$router.push(`adiantamento/${processo.id}`)"
              />
              <q-btn
                flat
                round
                color="teal"
                icon="edit"
                v-if="processo.status == 1"
              />
              <q-btn
                flat
                round
                color="red"
                icon="delete"
                v-if="processo.status == 1"
                @click="dialogExcluir(processo.id)"
              />
            </q-card-actions>

          </q-card>
            <q-dialog
              v-model="confirm"
              persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="delete" color="red" text-color="white" />
                  <span class="q-ml-sm">Deseja excluir o processo {{ proc.processo }}? <br>
                   Esta ação é irreversível.
                    </span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cancelar"
                    color="negative"
                    v-close-popup
                    />
                  <q-btn
                    flat
                    label="Excluir"
                    color="negative"
                    @click.stop.prevent="excluirProcessos(proc)"
                    v-close-popup
                    />
                </q-card-actions>
              </q-card>
            </q-dialog>

    </div>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" @click="$router.push('cadprocesso')" />
          </q-page-sticky>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Processo',
  data () {
    return {
      processos: [],
      proc: [],
      confirm: false
    }
  },

  mounted () {
    this.getProcessos()
  },

  filters: {
    formatValue (str) {
      return (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(str))
    },
    formatData (value) {
      return date.formatDate(value, 'DD/MM/YYYY')
    },
    addDays (newDate) {
      return date.formatDate(date.addToDate(newDate, { days: 29 }), 'DD/MM/YYYY')
    }
  },

  methods: {
    getProcessos () {
      this.$axios
        .get('http://adiantamento.test/api/adiantamento')
        .then(res => {
          this.processos = res.data.adiantamento
        })
        .catch(err => {
          console.error(err)
        })
    },

    dialogExcluir (id) {
      this.confirm = true
      this.$axios
        .get('http://adiantamento.test/api/adiantamento/' + id)
        .then(res => {
          this.proc = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    excluirProcessos (proc) {
      this.$axios
        .delete('http://adiantamento.test/api/adiantamento/' + proc.id, {
          processo: this.processo,
          responsavel: this.responsavel,
          data: this.data,
          valor: this.valor,
          status: this.status,
          user_id: this.user_id
        })
        .then(res => {
          this.getProcessos()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 250px
  max-width: 300px
</style>
