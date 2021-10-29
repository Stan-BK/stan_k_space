<template>
  <div class="wrap">
    <my-header></my-header>
    <div class="content">
      <component :is="hash"></component>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import MyHeader from "../layout/header/index.vue";
import config from "../data/config";

export default {
  components: {
    MyHeader,
  },
  setup() {
    var { games } = config;
    var hash = ref(location.hash.slice(1));
    window.onhashchange = function () {
      hash.value = location.hash.slice(1);
    };
    return {
      games,
      hash,
    };
  },
  watch: {
    hash(oldValue, newValue) {
      console.log(oldValue, newValue);
    },
  },
};
</script>
<style scoped>
.clearfix::after {
  content: "";
  display: "table";
  clear: both;
}
.wrap {
  height: 100%;
  overflow: auto;
}
.content {
  height: calc(100% - 180px);
  padding: 30px;
  margin-top: 60px;
}
</style>