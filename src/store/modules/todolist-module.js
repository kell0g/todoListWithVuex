import axios from "axios";

const state = {
  items: [],
};

const getters = {
  todoList: (state) => state.items,
};

const actions = {
  async fetchItems({ commit }) {
    const response = await axios.get("http://localhost:3000/todoList");
    commit("setList", response.data);
  },
  async addItem({ commit }, item) {
    const response = await axios.post("http://localhost:3000/todoList", item);
    commit("addNewItem", response.data);
  },
  async deleteItem({ commit, dispatch }, id) {
    await axios.delete(`http://localhost:3000/todoList/${id}`);
    commit("removeItem", id);
    dispatch("fetchItems");
  },
};

const mutations = {
  setList: (state, items) => (state.items = items),
  addNewItem: (state, newItem) => state.items.unshift(newItem),
  removeItem: (state, id) => state.items.filter((item) => item.id !== id),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
