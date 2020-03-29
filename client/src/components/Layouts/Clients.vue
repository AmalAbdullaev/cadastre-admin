<template>
  <div>
    <modals-container />
    <section class="container-fluid content__header">
      <h4 class="c-grey-900 mT-10 mB-20">Пользователи</h4>
      <div class="card">
        <div class="card-body">
          <div class="row mT-10">
            <div class="col-md-6">
              <button
                class="btn btn-sm btn-primary add-btn"
                v-on:click="openClientModal(newClient, 'Создать клиента')"
              >
                Добавить клиента
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
                  <th>ФИО</th>
                  <th>Телефон</th>
                  <th>Почта</th>
                  <th>Статус заявки</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="client in clients" :key="client.id">
                  <th>{{ client.id }}</th>
                  <td>
                    {{ client.fullName }}
                  </td>
                  <td>
                    {{ client.phone }}
                  </td>
                  <td>
                    {{ client.email }}
                  </td>
                  <th>
                    <a
                      href="#"
                      class="btn btn-sm"
                      :class="{
                        'btn-warning': client.status === 'NEW',
                        'btn-danger': client.status === 'IN_PROGRESS',
                        'btn-success': client.status === 'DONE'
                      }"
                      >{{ status[client.status] }}</a
                    >
                  </th>
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
                          openClientModal(client, 'Редактировать клиента')
                        "
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        v-on:click="remove(client.id)"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav>
            <paginate
              v-model="page"
              :page-count="pageCount"
              :click-handler="getClients"
              :prev-text="'Предыдущий'"
              :next-text="'Следующий'"
              :container-class="'pagination justify-content-center'"
              :page-class="'page-item'"
              :page-link-class="'page-link'"
              :prev-class="'page-item'"
              :prev-link-class="'page-link'"
              :next-class="'page-item'"
              :next-link-class="'page-link'"
            >
            </paginate>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClientModal from "../Modals/ClientModal";

export default {
  name: "clients",
  data() {
    return {
      query: {
        sort: "",
        order: "desc",
        page: 0,
        limit: 5
      },
      newClient: {
        fullName: null,
        phone: null,
        email: null,
        status: "NEW",
        proposals: []
      },
      status: {
        NEW: "Новый",
        IN_PROGRESS: "В прогрессе",
        DONE: "Выполнен"
      },
      page: 1
    };
  },
  watch: {
    page: function(currentPage) {
      this.query.page = currentPage - 1;
    }
  },
  computed: {
    ...mapState({
      clients: state => state.client.clients
    }),
    pageCount() {
      return Math.ceil(this.$store.state.client.total / this.query.limit);
    }
  },
  methods: {
    openClientModal(client, title) {
      this.$modal.show(
        ClientModal,
        {
          title: title,
          client: Object.assign({}, client)
        },
        {
          width: 600,
          height: 500
        },
        {
          "before-close": () => {
            this.$store.dispatch("client/setClients", this.query);
          }
        }
      );
    },
    remove(id) {
      this.$store.dispatch("client/removeClient", { id }).then(() => {
        this.$store.dispatch("client/setClients", this.query);
      });
    },
    getClients() {
      this.$store.dispatch("client/setClients", this.query);
    },
    search() {
      this.page = 1;
      this.$store.dispatch("client/setClients", this.query);
    },
    clearSearch() {
      this.query.sort = "";
      this.$store.dispatch("client/setClients", this.query);
    }
  },
  mounted() {
    this.$store.dispatch("client/setClients", this.query);
  }
};
</script>
