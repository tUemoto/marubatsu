import Vue from 'vue';
import Vuex from 'vuex';
import gameControl from './gameControl';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/',
  },
  modules: {
    gameControl,
  },
  mutations: {},
  actions: {},
});
