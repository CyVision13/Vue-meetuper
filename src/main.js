import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AppDropdown from "./components/shared/AppDropdown";
import AppHero from "./components/shared/AppHero";
import AppSpinner from "./components/shared/AppSpinner.vue";
import vuelidate from "vuelidate";
import io from 'socket.io-client'

import moment from "moment";
import Toasted from "vue-toasted";

Vue.config.productionTip = false;

Vue.component("AppHero", AppHero);
Vue.component("AppDropdown", AppDropdown);
Vue.component("AppSpinner", AppSpinner);

Vue.use(vuelidate);
Vue.use(Toasted);

Vue.filter("capitalize", function(value) {
  if (value && typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return "";
});
Vue.filter("formatTime", function(value, formatType = "LL") {
  if (!value) return "";
  return moment(value).format(formatType);
});

const socket = io('http://localhost:3001')


new Vue({
  router,
  store,
  vuelidate,
  socket,
  render: h => h(App)
}).$mount("#app");
