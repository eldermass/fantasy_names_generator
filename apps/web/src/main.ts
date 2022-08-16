import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import antd from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())

app.use(antd)

app.mount('#app')
