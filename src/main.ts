import { createApp } from 'vue'
import App from './App.vue'
import YhTable from './YHTable.vue'
import 'element-plus/dist/index.css'

// 全局注册组件
const app = createApp(App)
app.component('YhTable', YhTable)
app.mount('#app')