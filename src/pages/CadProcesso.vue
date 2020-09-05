<template>
  <q-page padding>
     <q-input outlined v-model="processo" label="Número do Processo" />
     <q-input outlined v-model="processo" label="Responsável" />
      <q-input outlined v-model="data" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="data" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </q-page>
</template>

<script>
export default {
  name: 'CadProcesso',
  data () {
    return {
      processo: '',
      responsavel: '',
      data: ''
    }
  }
}
</script>
