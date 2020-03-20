<template>
  <div id="content" :class="[{ collapsed: collapsed }]">
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      :show-one-child="true"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    >
      <nav slot="header">Head</nav>
      <span slot="toggle-icon"
        ><i class="fa fa-arrows-h" aria-hidden="true"></i
      ></span>
    </sidebar-menu>
    <navbar></navbar>
    <section class="main-content pb-5">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <!-- This is where the main content goes. -->
          <div class="col-md-6">
            <router-link
              :to="{ name: 'createNote' }"
              class="btn btn-primary mb-3"
              >Create Note</router-link
            >
            <div v-if="!notes.length && completedFirstPass">
              Hmm, you don't have any notes.
            </div>

            <div class="note-block">
              <div v-for="note in notes" :key="note.id" class="row">
                <div class="col-12">
                  <div class="note-block__note" @click="editNote(note)">
                    <h3>
                      <strong>{{ note.title }}</strong>
                    </h3>
                    <p>{{ note.content }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              v-if="okToLoadMore"
              @click="loadNotes"
              class="btn btn-primary"
            >
              <i class="fa fa-chevron-down fa-fw"></i>
              Load More
            </button>
          </div>
        </div>
      </div>
    </section>
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
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user"
        },
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user"
        },
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user"
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
    async loadNotes() {
      try {
        const response = await this.$store.dispatch(
          "note/getUsersNotes",
          this.query
        );
        if (response.length === this.query.limit) {
          this.okToLoadMore = true;
          this.query.page = this.query.page + 1;
        } else {
          this.okToLoadMore = false;
        }
      } catch (error) {
        this.$toasted.error("There was an error connecting to the server.");
      } finally {
        if (this.completedFirstPass === false) {
          this.completedFirstPass = true;
        }
      }
    },
    editNote(note) {
      let i = this.notes.map(note => note.id).indexOf(note.id);
      this.$router.push({ name: "editNote", query: { id: this.notes[i].id } });
    },
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
      user: "user/user",
      notes: "note/notes"
    })
  },
  created() {
    this.loadNotes();
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
