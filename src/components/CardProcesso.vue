<template>
  <div class="q-pa-md">
          <q-card class="my-card">
            <q-card flat bordered class="my-card bg-grey-1">
              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6 text-center">{{ processos.processo }}</div>
                    <br><q-separator inset /><br>
                    <div class="text-subtitle2 text-center">
                      Valor: {{ processos.valor | formatValue() }}
                      </div>
                      <br>
                    <div class="text-subtitle2 text-center">
                      Período para compras: {{ processos.data | formatData() }}
                      a {{ processos.data | addDays() }}
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-card>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Processo',

  data () {
    return {
      processos: [],
      proc: []
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
        .get(this.$axios.baseURL + 'adiantamento/' + this.$route.params.id)
        .then(res => {
          this.processos = res.data
        })
        .catch(err => {
          console.error(err)
        })
    }

  }
}
</script>
