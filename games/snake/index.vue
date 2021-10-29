<template>
  <div class="snake clearfix">
    <div class="content">
      <div class="game">
        <i
          v-for="item of snake"
          class="snake-body"
          :style="{
            left: item.x * 10 + 'px',
            top: item.y * 10 + 'px',
          }"
          :key="item"
        ></i>
      </div>
    </div>
    <div class="control">
      速度
      <select name="" id="" v-model="speed">
        <option value="200">200</option>
        <option value="400">400</option>
      </select>
      <button @click="playGame">开始</button>
      <button>暂停</button>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Snake from "./index";

export default {
  name: "MySnake",
  setup() {
    var speed = ref(200);
    var lastChild = ref(null);
    var dir = ref("RIGHT");
    var changeT = ref(Date.now());
    var snake = ref([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ]);
    return {
      speed,
      snake,
      lastChild,
      dir,
      changeT,
    };
  },
  // mounted() {
  //   this.snake = new Snake();
  // },
  methods: {
    playGame() {
      var _self = this;

      document.addEventListener("keydown", function (e) {
        var e = e || window.event,
          now = Date.now();
        if (now - _self.changeT >= 100) {
          _self.changeDir(e);
          _self.changeT = now;
        } else {
          return;
        }
      });

      setInterval(this.runSnake, this.speed);
    },
    runSnake() {
      var snake = this.snake;
      var head = snake[snake.length - 1];
      for (var i = 0; i < snake.length - 1; i++) {
        snake[i].x = snake[i + 1].x;
        snake[i].y = snake[i + 1].y;
      }
      switch (this.dir) {
        case "UP":
          if (head.y === 0) {
            head.y = 30 - 1;
          } else {
            head.y--;
          }
          break;
        case "DOWN":
          if (head.y === 30 - 1) {
            head.y = 0;
          } else {
            head.y++;
          }
          break;
        case "LEFT":
          if (head.x === 0) {
            head.x = 30 - 1;
          } else {
            head.x--;
          }
          break;
        case "RIGHT":
          if (head.x === 30 - 1) {
            head.x = 0;
          } else {
            head.x++;
          }
      }
    },
    changeDir(e) {
      var code = e.keyCode;
      console.log(this.dir);
      switch (code) {
        case 37:
          if (this.dir !== "LEFT" && this.dir !== "RIGHT") {
            this.dir = "LEFT";
          }
          break;
        case 38:
          if (this.dir !== "UP" && this.dir !== "DOWN") {
            this.dir = "UP";
          }
          break;
        case 39:
          if (this.dir !== "LEFT" && this.dir !== "RIGHT") {
            this.dir = "RIGHT";
          }
          break;
        case 40:
          if (this.dir !== "UP" && this.dir !== "DOWN") {
            this.dir = "DOWN";
          }
          break;
      }
    },
  },
};
</script>
<style scoped>
.snake {
  width: 100%;
  height: 100%;
  min-width: 600px;
  position: relative;
}
.content {
  float: left;
  display: flex;
  width: 50%;
  height: 100%;
  background-color: orange;
  align-items: center;
  justify-content: center;
}
.control {
  float: left;
  width: 50%;
  height: 100%;
  background-color: green;
}
.game {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid black;
}
.snake-body {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #424242;
  border-radius: 5px;
}
</style>