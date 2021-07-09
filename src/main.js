import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from './i18n'
import axios from "axios";

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  async beforeCreate() {
    await this.$store.dispatch("reqApiConfs");
    this.$mount("#app");
  },
  render: h => h(App)
});
