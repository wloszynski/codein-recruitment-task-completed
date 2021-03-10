import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    tasks: [],
    selectedTask: null,
  },
  actions: {
    updateTasks: ({ commit }, payload) => {
      commit("updateTasks", payload);
    },
    updateSelectedTask: ({ commit }, payload) => {
      commit("updateSelectedTask", payload);
    },
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTasks: (state, payload) => {
      state.tasks = payload;
    },
    updateSelectedTask: (state, payload) => {
      state.selectedTask = payload;
    },
  },
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
