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
