import Vue from "vue";
import Vuex from "vuex";

import TodoListModule from "../store/modules/todolist-module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    TodoListModule,
  },
});
