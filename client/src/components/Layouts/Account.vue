<template>
  <div id="content" :class="[{ collapsed: collapsed }]">
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      :show-one-child="true"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    >
      <span slot="toggle-icon"
        ><i class="fa fa-arrows-h" aria-hidden="true"></i
      ></span>
    </sidebar-menu>
    <navbar></navbar>
    <router-view></router-view>
    <footer-main></footer-main>
  </div>
</template>

<script>
import Navbar from "@/components/Partials/Navbar";
import FooterMain from "@/components/Partials/FooterMain";
import { SidebarMenu } from "vue-sidebar-menu";
import { mapGetters } from "vuex";

export default {
  name: "account",
  components: {
    Navbar,
    FooterMain,
    SidebarMenu
  },
  data() {
    return {
      completedFirstPass: false,
      okToLoadMore: false,
      query: {
        sort: "",
        order: "desc",
        page: 0,
        limit: 5
      },
      menu: [
        {
          href: "/account/clients",
          title: "Клиенты",
          icon: "fa fa-user"
        },
        {
          href: "/account/proposals",
          title: "Услуги",
          icon: "fa fa-tasks"
        }
      ],
      collapsed: true,
      themes: [
        {
          name: "Default theme",
          input: ""
        },
        {
          name: "White theme",
          input: "white-theme"
        }
      ]
    };
  },
  methods: {
    onToggleCollapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
    onItemClick(event, item) {
      console.log("onItemClick");
      console.log(event);
      console.log(item);
    }
  },
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";

.note-block {
  &__note {
    background: lighten($light-grey, 2%);
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 20px;
    border: 1px solid $grey;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}

#content {
  padding-left: 350px;
}
#content.collapsed {
  padding-left: 50px;
}
</style>
