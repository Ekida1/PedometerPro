import Vue from 'vue';
import Vuex from 'vuex';
import homeModule from './modules/home.js'
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    home: homeModule,
  },
})
