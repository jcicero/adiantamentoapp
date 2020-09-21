import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

axios.baseURL = 'http://adiantamento-laravel.herokuapp.com/api/'
