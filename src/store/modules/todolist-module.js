import axios from "axios";

const state = {
  tasks: [],
};

const getters = {
  todoList: (state) => state.tasks,
};

const actions = {
  async fetchTasks({ commit }) {
    const response = await axios.get("http://localhost:3000/tasks");
    commit("setList", response.data);
  },
  async addTask({ dispatch }, task) {
    await axios.post("http://localhost:3000/tasks", task);
    dispatch("fetchTasks");
  },
  async deleteTask({ dispatch }, id) {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    dispatch("fetchTasks");
  },
};

const mutations = {
  setList: (state, tasks) => (state.tasks = tasks),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
