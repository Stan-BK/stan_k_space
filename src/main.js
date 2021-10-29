import App from './App.vue'
import MySnake from '../games/snake/index.vue'
import My2048 from '../games/2048/index.vue'

const { createApp } = Vue
const app = createApp(App)

//注册组件
app.component('MySnake', MySnake)
app.component('My2048', My2048)


app.mount('#app')

