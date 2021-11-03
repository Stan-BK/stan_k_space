<template>
  <div class="snake clearfix">
    <div class="content">
      <div :class="['game', gameover ? 'gameover' : '']">
        <i
          v-for="(item, index) of snake"
          :class="['snake-body', snake.length - 1 == index ? 'snake-head' : '']"
          :style="{
            left: item.x * 20 + 'px',
            top: item.y * 20 + 'px',
          }"
          :key="item"
        ></i>
        <i
          class="food"
          :style="{ left: food.x * 20 + 'px', top: food.y * 20 + 'px' }"
        ></i>
      </div>
    </div>
    <div class="control">
      速度
      <select name="" id="" v-model="speed">
        <option value="50">超快</option>
        <option value="100">较快</option>
        <option value="200">中等</option>
        <option value="250">较慢</option>
        <option value="300">老年蛇</option>
      </select>
      <button @click="playGame" v-if="gameover === true">开始</button>
      <button @click="pauseGame" v-else-if="pause === false">暂停</button>
      <button @click="continueGame" v-else>继续</button>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "MySnake",
  setup() {
    var speed = ref(200);
    var lastChild = ref(null);
    var dir = ref("RIGHT");
    var changeT = ref(Date.now());
    var gameover = ref(true);
    var time = ref(null);
    var pause = ref(false);
    var snake = ref([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ]);
    var food = ref({
      x: null,
      y: null,
    });
    return {
      speed,
      snake,
      lastChild,
      dir,
      changeT,
      food,
      gameover,
      time,
      pause,
    };
  },
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

      this.gameover = false;
      this.setFood();
      this.time = setTimeout(this.runSnake, this.speed);
    },
    runSnake() {
      var snake = this.snake;
      var head = snake[snake.length - 1];
      var food = this.food;
      var tailX = snake[0].x,
        tailY = snake[0].y;
      for (var i = 0; i < snake.length - 1; i++) {
        snake[i].x = snake[i + 1].x;
        snake[i].y = snake[i + 1].y;
      }
      switch (this.dir) {
        case "UP":
          if (head.y === 0) {
            head.y = 20 - 1;
          } else {
            head.y--;
          }
          break;
        case "DOWN":
          if (head.y === 20 - 1) {
            head.y = 0;
          } else {
            head.y++;
          }
          break;
        case "LEFT":
          if (head.x === 0) {
            head.x = 20 - 1;
          } else {
            head.x--;
          }
          break;
        case "RIGHT":
          if (head.x === 20 - 1) {
            head.x = 0;
          } else {
            head.x++;
          }
      }
      if (head.x === food.x && head.y === food.y) {
        eatFood.call(this, tailX, tailY);
      }
      if (this.gameOver() === true) {
        this.gameover = true;
      } else {
        this.time = setTimeout(this.runSnake, this.speed);
      }
      function eatFood(tailX, tailY) {
        snake.unshift({
          x: tailX,
          y: tailY,
        });
        this.setFood();
      }
    },
    setFood() {
      var food = this.food;
      food.x = Math.floor(Math.random() * 20);
      food.y = Math.floor(Math.random() * 20);
      console.log(food);
    },
    changeDir(e) {
      var code = e.keyCode;
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
    gameOver: function () {
      var snake = this.snake,
        head = snake[snake.length - 1],
        isOver = false;
      for (var i = 0; i < snake.length - 2; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          isOver = true;
        }
      }
      return isOver;
    },
    continueGame: function () {
      this.pause = false;
      this.time = setTimeout(this.runSnake, this.speed);
    },
    pauseGame: function () {
      this.pause = true;
      clearTimeout(this.time);
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
  width: 50%;
  height: 100%;
}
.control {
  float: left;
  width: 50%;
  height: 100%;
  background-color: green;
}
.game {
  position: relative;
  width: 400px;
  height: 400px;
  top: calc(50% - 200px);
  border: 1px solid rgba(44, 44, 44, 0.5);
  border-radius: 2px;
  margin: 0 auto;
}
.gameover::before {
  position: absolute;
  content: "";
  display: block;
  width: 400px;
  height: 400px;
  left: 0;
  top: 0;
  background-color: rgba(44, 44, 44, 0.5);
  z-index: 99;
}
.gameover::after {
  position: absolute;
  content: "game over!";
  display: block;
  width: 100px;
  height: 50px;
  left: 150px;
  top: 175px;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  z-index: 100;
}
.snake-body {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #424242;
  border-radius: 40%;
}
.snake-head {
  background-color: red;
  border-radius: 50%;
}
.food {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #9af184;
  border-radius: 50%;
}
</style>