<template>
  <div class="container">
    <AddItem />
    <Item />
  </div>
</template>

<script>
import AddItem from "../src/components/AddItem";
import Item from "../src/components/Item";

export default {
  name: "App",
  components: {
    Item,
    AddItem,
  },
};
</script>

<style>
.container {
  max-width: 500px;
  padding-top: 50px;
}
</style>
