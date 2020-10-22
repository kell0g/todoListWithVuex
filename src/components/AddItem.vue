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
      item: "",
    };
  },
  methods: {
    ...mapActions(["addItem"]),
    onItemSubmit() {
      this.addItem({
        item: this.item,
      }).then((this.item = ""));
    },
  },
};
</script>
