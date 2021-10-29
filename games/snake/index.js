class Snake {
  constructor() {
    this.snake = [{ x: 4, y: 4 }, { x: 3, y: 3 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 }]
    this.wrap = document.getElementsByClassName('game')
    this.unit = 10
    this.init()
  }

  init(speed) {
    this.drawSnake()
    console.log(speed)
  }

  drawSnake() {
    var i = document.createElement('i')

  }
}

export default Snake