import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const initialState = {
  name: '',
  rut: '',
  bank: '',
  account_number: '',
  account_type: '',
  email: ''
};

export default new Vuex.Store({
  state: initialState,
  getters: {
  },
  mutations: {
  },
  actions: {
  },
});
