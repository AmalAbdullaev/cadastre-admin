<template>
  <div>
    <div class="modal-content">
      <div
        v-if="showAlert"
        v-for="error in errors"
        :key="error"
        class="alert alert-danger"
        role="alert"
      >
        {{ error }}
      </div>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">{{ title }}</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="$emit('close')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">ФИО</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="staticEmail"
              v-model="client.fullName"
              placeholder="Введите фио"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >Телефон</label
          >
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="staticEmail"
              v-model="client.phone"
              placeholder="Введите телефон"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Почта</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="staticEmail"
              v-model="client.email"
              placeholder="Введите почту"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >Услуги</label
          >
          <div class="col-sm-10">
            <multiselect
              v-model="client.proposals"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="title"
              track-by="title"
              :options="proposals"
              :multiple="true"
              :taggable="true"
              @tag="addTag"
            ></multiselect>
          </div>
        </div>
        <div class="form-group row" v-if="client.id">
          <label class="col-sm-2 col-form-label">Статус заявки</label>
          <div class="col-sm-10">
            <select v-model="client.status" class="form-control" required>
              <option value="" disabled selected>Выставите статус</option>
              <option value="NEW">Новый</option>
              <option value="IN_PROGRESS">В прогрессе</option>
              <option value="DONE">Закончен</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$emit('close')"
        >
          Отмена
        </button>
        <button type="button" class="btn btn-primary" @click="save">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "client-modal",
  props: ["title", "client"],
  data() {
    return {
      errors: [],
      showAlert: false
    };
  },
  computed: {
    ...mapState({
      proposals: state => state.proposal.proposals
    })
  },
  methods: {
    save() {
      this.errors = [];
      if (this.client.id) {
        this.$store
          .dispatch("client/updateClient", { client: this.client })
          .then(() => {
            this.$emit("close");
          });
      } else {
        if (
          this.client.fullName &&
          this.client.phone &&
          this.client.email &&
          this.validEmail(this.client.email)
        ) {
          this.$store
            .dispatch("client/saveClient", { client: this.client })
            .then(() => {
              this.$emit("close");
            })
            .catch(err => {
              console.log(err);
              this.errors.push("Ошибка запроса " + err.data.message);
            });
        } else {
          this.errors.push("Введите корректного клиента");
        }
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.client.status.push(tag);
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
    this.$store.dispatch("proposal/setProposals");
  }
};
</script>
