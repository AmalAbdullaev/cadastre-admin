import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import user from "@/store/user";
import client from "@/store/client";
import proposal from "@/store/proposal";

const store = new Vuex.Store({
  modules: {
    user,
    client,
    proposal
  }
});

export default store;
