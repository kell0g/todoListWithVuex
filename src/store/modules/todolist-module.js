import axios from "axios";

const state = {
  tasks: [],
};

const getters = {
  todoList: (state) => state.tasks,
};

const actions = {
  async fetchTasks({ commit }) {
    const response = await axios.get("http://localhost:3000/todoList");
    commit("setList", response.data);
  },
  async addTask({ commit }, task) {
    const response = await axios.post("http://localhost:3000/todoList", task);
    commit("addNewTask", response.data);
  },
  async deleteTask({ commit, dispatch }, id) {
    await axios.delete(`http://localhost:3000/todoList/${id}`);
    commit("removeTask", id);
    dispatch("fetchTasks");
  },
};

const mutations = {
  setList: (state, tasks) => (state.tasks = tasks),
  addNewTask: (state, newTask) => state.tasks.unshift(newTask),
  removeTask: (state, id) => state.tasks.filter((task) => task.id !== id),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
