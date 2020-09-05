<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            v-for="(adiantamento, id) in processos"
            :key="id"
          >
            <q-card flat bordered class="my-card bg-grey-1">
              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6">{{ adiantamento.processo }}</div>
                    <div class="text-subtitle2">{{ adiantamento.valor }}</div>
                    <div class="text-subtitle2">
                       <q-btn flat round icon="event" />
                        <q-btn flat>
                          {{ adiantamento.data }}
                        </q-btn>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="text-subtitle2">{{ adiantamento.responsavel }}</div>
                <div class="text-subtitle2" v-if="adiantamento.status == 1">
                  Situação: ABERTO
                </div>
                <div class="text-subtitle2" v-else>Situação: FECHADO</div>
              </q-card-section>

              <q-separator />
            </q-card>
            <q-card-actions align="right">
              <q-btn flat round color="blue" icon="remove_red_eye" />
              <q-btn
                flat
                round
                color="teal"
                icon="edit"
                v-if="adiantamento.status == 1"
              />
              <q-btn
                flat
                round
                color="red"
                icon="delete"
                v-if="adiantamento.status == 1"
              />
            </q-card-actions>
          </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Processo',
  data () {
    return {
      processos: []
    }
  },
  mounted () {
    this.getProcessos()
  },
  methods: {
    getProcessos () {
      this.$axios
        .get('http://adiantamento.test/api/adiantamento')
        .then(res => {
          this.processos = res.data.data
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
