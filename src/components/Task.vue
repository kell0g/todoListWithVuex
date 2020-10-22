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
