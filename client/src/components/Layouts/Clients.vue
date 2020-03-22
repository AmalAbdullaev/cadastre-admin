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
                v-on:click="addNewClient"
                :disabled="editTable"
              >
                Добавить клиента
              </button>
              <div
                v-if="showAlert"
                v-for="error in errors"
                :key="error"
                class="alert alert-danger"
                role="alert"
              >
                {{ error }}
              </div>
            </div>
            <div class="col-md-6">
              <form name="searchForm" class="search-form">
                <label class="input-group">
                  <input placeholder="Поиск" aria-controls="dataTable" />
                  <button class="btn btn-sm btn-primary">Искать</button>
                </label>
              </form>
            </div>
          </div>
          <div class="row">
            <!-- {{ clients }} -->
            <table class="table">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>ФИО</th>
                  <th>Телефон</th>
                  <th>Почта</th>
                  <th>Услуги</th>
                  <th>Статус заявки</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="editTable">
                  <th></th>
                  <td>
                    <input type="text" v-model="newClient.fullName" required />
                  </td>
                  <td>
                    <input type="text" v-model="newClient.phone" required />
                  </td>
                  <td>
                    <input type="email" v-model="newClient.email" required />
                  </td>
                  <td>
                    <select v-model="newClient.proposal" required>
                      <option value="volvo">Услуга 1</option>
                      <option value="saab">Услуга 2</option>
                      <option value="fiat">Услуга 3</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="newClient.status" required>
                      <option value="NEW">Новый</option>
                      <option value="IN_PROGRESS">В прогрессе</option>
                      <option value="DONE">Закончен</option>
                    </select>
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-success"
                        v-on:click="save"
                      >
                        Сохранить
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        v-on:click="close"
                      >
                        Закрыть
                      </button>
                    </div>
                  </td>
                </tr>
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
                  <td>
                    Услуга
                  </td>
                  <th>
                    <span class="badge badge-pill badge-warning">{{
                      client.status
                    }}</span>
                  </th>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-success"
                        v-on:click="showModal(client)"
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
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
      errors: [],
      query: {
        sort: "",
        order: "desc",
        page: 0,
        limit: 20
      },
      newClient: {
        fullName: null,
        phone: null,
        email: null,
        status: null
      },
      editTable: false,
      showAlert: false,
      isEditClient: {}
    };
  },
  computed: {
    ...mapState({
      clients: state => state.client.clients
    })
  },
  methods: {
    showModal(client) {
      // this.$router.push({ name: "clientEdit", params: { id: client.id } });
      this.$modal.show(
        ClientModal,
        {
          title: "Редактировать клиента",
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
    addNewClient() {
      this.editTable = true;
    },
    save() {
      this.errors = [];
      if (
        this.newClient.fullName &&
        this.newClient.phone &&
        this.newClient.email &&
        this.validEmail(this.newClient.email) &&
        this.newClient.status
      ) {
        this.$store
          .dispatch("client/saveClient", this.newClient)
          .then(() => {
            this.editTable = false;
            this.$store.dispatch("client/setClients", this.query);
            this.newClient = {};
          })
          .catch(err => {
            console.log(err);
            this.errors.push("Ошибка запроса " + err.data.message);
          });
      } else {
        this.errors.push("Enter correct client");
      }
    },
    remove(id) {
      this.$store.dispatch("client/removeClient", { id }).then(() => {
        this.$store.dispatch("client/setClients", this.query);
      });
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    close() {
      this.editTable = false;
    },
    editClient(id) {
      this.isEditClient[id] = true;
    }
  },
  watch: {
    errors(newValue) {
      this.showAlert = true;
      if (newValue.length) {
        setTimeout(
          function() {
            this.showAlert = false;
          }.bind(this),
          3000
        );
      }
    }
  },
  mounted() {
    this.$store.dispatch("client/setClients", {
      sort: "",
      order: "desc",
      page: 0,
      limit: 20
    });
  }
};
</script>
