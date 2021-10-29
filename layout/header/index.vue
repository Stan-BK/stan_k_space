<template>
  <div class="header">
    <ul>
      <li class="hd-item" v-for="item of routes" :key="item">
        {{ item.name }}
        <template v-if="item.child">
          <div
            class="hd-item-child"
            v-for="child of item.child"
            :key="child"
            @click="changeGame(child)"
          >
            {{ child }}
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import config from "../../data/config";
import { ref } from "vue";

export default {
  name: "MyHeader",
  setup() {
    const routes = ref(config.routes);
    return {
      routes,
    };
  },
  methods: {
    changeGame(game) {
      location.href = "#" + game;
    },
  },
};
</script>
<style scoped>
.header {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  background-color: lightpink;
  box-shadow: 0 1px 2px grey;
  z-index: 99;
}
ul {
  list-style: none;
  margin: 0;
}
ul li {
  float: left;
  width: 80px;
  text-align: center;
  line-height: 60px;
  transition: background-color 0.5s;
  overflow: hidden;
}
.hd-item:hover {
  background-color: rgb(214, 146, 156);
}
.hd-item:first-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.hd-item-child {
  display: none;
  background-color: rgb(214, 146, 156);
  transition: background-color 0.5s;
}
.hd-item:hover .hd-item-child {
  display: block;
}
.hd-item-child:hover {
  background: lightpink radial-gradient(rgb(214, 146, 156), lightpink 80%);
  animation: translate 0.2s linear;
}
@keyframes translate {
  0% {
    background: rgb(214, 146, 156);
  }
  20% {
    background: radial-gradient(rgb(214, 146, 156), lightpink 20%);
  }
  40% {
    background: radial-gradient(rgb(214, 146, 156), lightpink 40%);
  }
  60% {
    background: radial-gradient(rgb(214, 146, 156), lightpink 60%);
  }
  80% {
    background: radial-gradient(rgb(214, 146, 156), lightpink 80%);
  }
  100% {
    background: radial-gradient(rgb(214, 146, 156), lightpink 80%);
  }
}
</style>