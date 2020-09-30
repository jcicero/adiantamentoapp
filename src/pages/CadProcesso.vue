<template>
  <q-page padding>
    <q-input
      outlined
      v-model="processo"
      label="Número do Processo"
    />

    <q-input
      outlined
      v-model="responsavel"
      label="Responsável"
    />

    <q-input
      v-model.number="valor"
      type="number"
      outlined
      label="Valor do Adiantamento"
    />
    <q-field
    outlined
    mask="##/##/####"
    :rules="[checkDate]"
    label="Data liberação"
    stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{ data }}</div>
        </template>
      <template v-slot:append>
        <q-icon
          name="event"
          class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale">
            <q-date
              v-model="data"
              @input="() => $refs.qDateProxy.hide()"
              mask="DD/MM/YYYY"
              unmasked-value

            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-field>
    <q-select
      outlined
      v-model="status"
      :options="[
        {label: 'Aberto', value: 1},
        {label: 'Fechado', value: 2}
      ]"
      map-options
      emit-value
      label="Situação" />
      <q-btn
        outlined
        color="primary"
        label="Salvar"
        @click.stop.prevent="postProcessos()"
      />
  </q-page>
</template>

<script>
export default {
  name: 'CadProcesso',
  data () {
    return {
      processo: '',
      responsavel: '',
      data: '',
      valor: '',
      status: '',
      user_id: 1,
      processos: []
    }
  },
  methods: {
    checkDate (val) {
      // eslint-disable-next-line no-undef
      return Quasar.utils.date.isValid(val) || 'Invalid date.'
    },
    postProcessos () {
      console.log(this.processos)
      this.$axios
        .post(this.$axios.baseURL + 'adiantamento', {
          processo: this.processo,
          responsavel: this.responsavel,
          data: this.data,
          valor: this.valor,
          status: this.status,
          user_id: this.user_id
        })
        .then(res => {
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
    }
  }
}
</script>
