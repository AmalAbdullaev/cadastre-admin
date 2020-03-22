<template>
  <div>
    <div class="modal-content">
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
              class="form-control-plaintext"
              id="staticEmail"
              v-model="client.fullName"
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
              class="form-control-plaintext"
              id="staticEmail"
              v-model="client.phone"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Почта</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control-plaintext"
              id="staticEmail"
              v-model="client.email"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >Услуги</label
          >
          <div class="col-sm-10">
            <select v-model="client.proposal" required>
              <option value="volvo">Услуга 1</option>
              <option value="saab">Услуга 2</option>
              <option value="fiat">Услуга 3</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"
            >Статус заявки</label
          >
          <div class="col-sm-10">
            <select v-model="client.status" required>
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
        <button type="button" class="btn btn-primary" @click="update">
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
  methods: {
    update() {
      console.log(this.client.id);
      this.$store
        .dispatch("client/updateClient", { client: this.client })
        .then(() => {
          console.log(this.$store.state.client.client);
          this.$emit("close");
        });
    }
  }
};
</script>
