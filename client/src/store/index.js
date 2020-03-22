import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import user from "@/store/user";
import client from "@/store/client";

const store = new Vuex.Store({
  modules: {
    user,
    client
  }
});

export default store;
