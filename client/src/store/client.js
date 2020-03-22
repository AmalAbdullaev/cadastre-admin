import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "@/common/axios";
import api from "@/common/api";
import { setAuthorizationHeader } from "@/common/utilities";

const SET_CLIENTS = "SET_CLIENTS";
const SET_CLIENT = "SET_CLIENT";

const client = {
  namespaced: true,
  state: {
    clients: [],
    client: {}
  },
  mutations: {
    SET_CLIENTS(state, data) {
      state.clients = data;
    },
    SET_CLIENT(state, data) {
      state.client = data;
    }
  },
  actions: {
    async setClients({ commit, rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios
          .get(api.client.fetchClients(), {
            params: {
              page: data.page,
              limit: data.limit
            }
          })
          .then(response => {
            console.log(response.data);
            commit(SET_CLIENTS, response.data);
          });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async saveClient({ rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios.post(api.client.fetchClients(), data.client);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async removeClient({ rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios.delete(api.client.fetchClients() + "/" + data.id);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async updateClient({ rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios.put(
          api.client.fetchClients() + "/" + data.client.id,
          data.client
        );
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async getClient({ commit, rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios
          .get(api.client.fetchClients() + "/" + data.id)
          .then(response => {
            console.log("response", response);
            commit(SET_CLIENT, response.data);
          });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    }
  }
};

export default client;
