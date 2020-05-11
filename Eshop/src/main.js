// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import animated from 'animate.css'
import axios from 'axios'
import VueParticles from 'vue-particles'
import VDistpicker from 'v-distpicker'
import {currency} from '../util/currency'
import {util} from '../util/util'
import store from '@/vuex/store' 

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/font/iconfont.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

Vue.config.productionTip = false
Vue.filter("currency",currency);
Vue.filter("util",util);
Vue.use(animated)
Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.component('v-distpicker', VDistpicker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
