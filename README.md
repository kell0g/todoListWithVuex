# TODOLIST

## Vuex 생성

- store/index.js 파일 생성

```js
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
```

- store/modules/todolist-module.js 파일 생성

```js
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
```

## Router 설정

- router/index.js 생성

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Task",
    component: () => import("../components/Task"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
```

## Component 구성

- App.vue

```js
<template>
  <div class="container">
    <AddTask />
    <Task />
  </div>
</template>

<script>
import AddTask from "../src/components/AddTask";
import Task from "../src/components/Task";

export default {
  name: "App",
  components: {
    AddTask,
    Task,
  },
};
</script>

<style>
.container {
  max-width: 500px;
  padding-top: 50px;
}
</style>
```

- AddTask.vue

```js
<template>
  <!-- 페이지 리로드를 막기 위해서 prevent 넣어주어야 함, 빼면 페이지 새로고침 됨 -->
  <form @submit.prevent="onItemSubmit">
    <div class="form-group">
      <input type="text" class="form-control" v-model="description" />
    </div>
    <button type="submit" class="btn btn-block btn-dark">할 일 추가</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddItem",
  data() {
    return {
      description: "",
    };
  },
  methods: {
    ...mapActions(["addTask"]),
    onItemSubmit() {
      this.addTask({
        description: this.description,
      }).then((this.description = ""));
    },
  },
};
</script>
```

- Task.vue

```js
<template>
  <div>
    <ul class="list-group mt-5">
      <li
        class="list-group-item list-group-item-action"
        v-for="task in todoList"
        :key="task.id"
      >
        <div class="d-flex w-100 justify-content-between">
          <h3>{{ task.description }}</h3>
          <small class="text-danger delete" @click="deleteTask(task.id)"
            >삭제</small
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Task",
  methods: {
    ...mapActions(["fetchTasks", "deleteTask"]),
  },
  computed: mapGetters(["todoList"]),
  created() {
    this.fetchTasks();
  },
};
</script>

<style>
.delete {
  font-size: 1rem;
  cursor: pointer;
}
</style>
```

## main.js 및 index.html(bootstrap cdn)

- main.js

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= htmlWebpackPlugin.options.title %></title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
