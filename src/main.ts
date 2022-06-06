import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import router from './router'
// table
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-table.css'
import 'element-plus/theme-chalk/el-checkbox.css'
import 'element-plus/theme-chalk/el-tag.css'
import 'element-plus/theme-chalk/el-tooltip.css'
import 'element-plus/theme-chalk/el-popper.css'

createApp(App).use(router).mount('#app')
