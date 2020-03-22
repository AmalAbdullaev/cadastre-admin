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
          <label class="col-sm-2 col-form-label">Название</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              v-model="proposal.title"
              placeholder="Введите название услуги"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Описание</label>
          <div class="col-sm-10">
            <textarea
              class="form-control"
              v-model="proposal.description"
              rows="3"
              placeholder="Введите описание услуги"
            ></textarea>
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
  name: "proposal-modal",
  props: ["title", "proposal"],
  data() {
    return {
      errors: [],
      showAlert: false
    };
  },
  methods: {
    save() {
      this.errors = [];
      if (this.proposal.id) {
        this.$store
          .dispatch("proposal/updateProposal", { proposal: this.proposal })
          .then(() => {
            this.$emit("close");
          });
      } else {
        if (this.proposal.title && this.proposal.description) {
          this.$store
            .dispatch("proposal/saveProposal", { proposal: this.proposal })
            .then(() => {
              this.$emit("close");
            })
            .catch(err => {
              console.log(err);
              this.errors.push("Ошибка запроса " + err.data.message);
            });
        } else {
          this.errors.push("Введите корректную услугу");
        }
      }
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
