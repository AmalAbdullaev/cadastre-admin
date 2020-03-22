import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "@/common/axios";
import api from "@/common/api";
import { setAuthorizationHeader } from "@/common/utilities";

const SET_PROPOSALS = "SET_PROPOSALS";
const SET_PROPOSAL = "SET_PROPOSAL";

const proposal = {
  namespaced: true,
  state: {
    proposals: [],
    proposal: {}
  },
  mutations: {
    SET_PROPOSALS(state, data) {
      state.proposals = data;
    },
    SET_PROPOSAL(state, data) {
      state.proposal = data;
    }
  },
  actions: {
    async setProposals({ commit, rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      const query = {
        params: {
          sort: data ? data.sort : null
        }
      };
      try {
        return await axios
          .get(api.proposal.fetchProposals(), query)
          .then(response => {
            commit(SET_PROPOSALS, response.data);
          });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async saveProposal({ rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios.post(api.proposal.fetchProposals(), data.proposal);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async removeProposal({ rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios.delete(
          api.proposal.fetchProposals() + "/" + data.id
        );
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async updateProposal({ rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios.put(
          api.proposal.fetchProposals() + "/" + data.proposal.id,
          data.proposal
        );
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async getProposal({ commit, rootGetters }, data) {
      setAuthorizationHeader(rootGetters["user/accessToken"]);
      try {
        return await axios
          .get(api.proposal.fetchProposals() + "/" + data.id)
          .then(response => {
            commit(SET_PROPOSAL, response.data);
          });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    }
  }
};

export default proposal;
