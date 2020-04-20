import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import { imgBaseUrl } from '@/utils'
Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$imgUrl = imgBaseUrl;
Vue.config._mpTrace = true;


const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
Vue.prototype.globalData = getApp().globalData;
