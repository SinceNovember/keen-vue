// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import ElementUI from 'element-ui'
import * as echarts from 'echarts'

import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'font-awesome/css/font-awesome.min.css'

import '@/assets/css/style.bundle.scss'
import '@/styles/index.scss'

import '@/utils'
import globalComponents from '@/utils/globalComponents'
import socketApi from '@/utils/socket'
import { getEmoji } from './utils/emoji'

Vue.config.productionTip = false
Vue.prototype.$socketApi = socketApi
Vue.prototype.$echarts = echarts
Vue.prototype.getEmoji = getEmoji

Vue.use(ElementUI)
Vue.use(globalComponents)

// 滚动加载更多
Vue.directive('loadMore', {
  bind(el, binding) {
    // 获取element，定义scroll
    const select_dom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    select_dom.addEventListener('scroll', function() {
      const height = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (height) {
        binding.value()
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
