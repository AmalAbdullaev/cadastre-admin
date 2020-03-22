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
            <select v-model="client.proposal" class="form-control" required>
              <option value="" disabled selected>Выберите услугу</option>
              <option value="volvo">Услуга 1</option>
              <option value="saab">Услуга 2</option>
              <option value="fiat">Услуга 3</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
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
export default {
  name: "client-modal",
  props: ["title", "client"],
  data() {
    return {
      errors: [],
      showAlert: false
    };
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
          this.validEmail(this.client.email) &&
          this.client.status
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
          this.errors.push("Enter correct client");
        }
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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
  }
};
</script>
