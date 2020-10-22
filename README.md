# TODOLIST

## Pre-requirements

- 간단한 JSON 응답을 위한 설치

```bash
npm install -g json-server
```

- json-server 에서 사용할 json 파일 생성(database.json)

```json
{
  "todoList": [
    {
      "id": 1,
      "item": "숨쉬기"
    },
    {
      "id": 2,
      "item": "밥 먹기"
    },
    {
      "id": 3,
      "item": "자기"
    },
    {
      "id": 4,
      "item": "공부하기"
    }
  ]
}
```

- json-server 기동

```bash
json-server --watch database.json
```

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
    name: "User",
    component: () => import("../components/Users"),
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
    <AddUser />
    <Users />
  </div>
</template>

<script>
import AddUser from "../src/components/AddUser";
import Users from "../src/components/Users";
export default {
  name: "App",
  components: {
    AddUser,
    Users
  }
};
</script>

<style>
.container {
  max-width: 1200px;
  padding-top: 100px;
}
</style>
```

- AddUser.vue

```js
<template>
  <!-- 페이지 리로드를 막기 위해서 prevent 넣어주어야 함, 빼면 페이지 새로고침 됨 -->
  <form @submit.prevent="onItemSubmit">
    <div class="form-group">
      <input type="text" class="form-control" v-model="item" />
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
      item: ""
    };
  },
  methods: {
    ...mapActions(["addItem"]),
    onItemSubmit() {
      this.addItem({
        item: this.item
      }).then((this.item = ""));
    }
  }
};
</script>
```

- Item.vue

```js
<template>
  <div>
    <ul class="list-group mt-5">
      <li class="list-group-item list-group-item-action" v-for="item in todoList" :key="item.id">
        <div class="d-flex w-100 justify-content-between">
          <h3>{{ item.item }}</h3>
          <small class="text-danger delete" @click="deleteItem(item.id)">삭제</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Item",
  methods: {
    ...mapActions(["fetchItems", "deleteItem"])
  },
  computed: mapGetters(["todoList"]),
  created() {
    this.fetchItems();
  }
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
