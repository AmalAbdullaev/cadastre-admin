<template>
  <div>
    <modals-container />
    <section class="container-fluid content__header">
      <h4 class="c-grey-900 mT-10 mB-20">Услуги</h4>
      <div class="card">
        <div class="card-body">
          <div class="row mT-10">
            <div class="col-md-6">
              <button
                class="btn btn-sm btn-primary add-btn"
                v-on:click="openProposalModal(newProposal, 'Создать услугу')"
              >
                Добавить услугу
              </button>
            </div>
            <div class="col-md-6">
              <form name="searchForm" class="search-form">
                <label class="input-group">
                  <input
                    v-model="query.sort"
                    placeholder="Поиск"
                    class="form-control col-5"
                    aria-controls="dataTable"
                  />
                  <button
                    class="btn btn-sm btn-primary"
                    v-on:click.prevent="search()"
                  >
                    Искать
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    v-on:click="clearSearch()"
                  >
                    Очистить
                  </button>
                </label>
              </form>
            </div>
          </div>
          <div class="row">
            <table class="table">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Название</th>
                  <th>Описание</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="proposal in proposals" :key="proposal.id">
                  <th>{{ proposal.id }}</th>
                  <td>
                    {{ proposal.title }}
                  </td>
                  <td>
                    {{ proposal.description }}
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-success btn-sm"
                        v-on:click="
                          openProposalModal(proposal, 'Редактировать услугу')
                        "
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        v-on:click="remove(proposal.id)"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProposalModal from "../Modals/ProposalModal";

export default {
  name: "proposals",
  data() {
    return {
      newProposal: {
        title: null,
        description: null
      },
      query: {
        sort: ""
      }
    };
  },
  computed: {
    ...mapState({
      proposals: state => state.proposal.proposals
    })
  },
  methods: {
    openProposalModal(proposal, title) {
      this.$modal.show(
        ProposalModal,
        {
          title: title,
          proposal: Object.assign({}, proposal)
        },
        {
          width: 600,
          height: 500
        },
        {
          "before-close": () => {
            this.$store.dispatch("proposal/setProposals");
          }
        }
      );
    },
    remove(id) {
      this.$store.dispatch("proposal/removeProposal", { id }).then(() => {
        this.$store.dispatch("proposal/setProposals");
      });
    },
    getProposals() {
      this.$store.dispatch("proposal/setProposals");
    },
    search() {
      this.$store.dispatch("proposal/setProposals", this.query);
    },
    clearSearch() {
      this.query.sort = "";
      this.$store.dispatch("proposal/setProposals");
    }
  },
  mounted() {
    this.$store.dispatch("proposal/setProposals");
  }
};
</script>
