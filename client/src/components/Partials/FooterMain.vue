<template>
  <section class="footer-main">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span>Copyright ©</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "footer-main",
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";

//This is just a blank div that sits about footer-main. This is needed
//because footer-main is absolutely positioned.
.sticky-footer-spacing {
  height: 40px;
}

.footer-main {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: $light-grey;
  padding: 20px 0;
  text-align: center;
  color: lighten($black, 25%);

  a {
    color: lighten($black, 5%);
    text-decoration: underline;

    &:hover {
      color: lighten($black, 25%);
    }
  }

  &__left {
    margin-bottom: 15px;
  }

  &__middle {
    &__image {
      max-height: 60px;
      margin-bottom: 15px;
    }
  }
}
</style>
