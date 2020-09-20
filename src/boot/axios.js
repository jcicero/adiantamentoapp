import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

axios.baseURL = 'http://adiantamento.test/api/'
