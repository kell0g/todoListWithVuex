<template>
  <div>
    <ul class="list-group mt-5">
      <li
        class="list-group-item list-group-item-action"
        v-for="item in todoList"
        :key="item.id"
      >
        <div class="d-flex w-100 justify-content-between">
          <h3>{{ item.item }}</h3>
          <small class="text-danger delete" @click="deleteItem(item.id)"
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
  name: "Item",
  methods: {
    ...mapActions(["fetchItems", "deleteItem"]),
  },
  computed: mapGetters(["todoList"]),
  created() {
    this.fetchItems();
  },
};
</script>

<style>
.delete {
  font-size: 1rem;
  cursor: pointer;
}
</style>
