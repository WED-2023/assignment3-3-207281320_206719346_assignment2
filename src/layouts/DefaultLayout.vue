<template>
  <div class="layout-container">
    <!-- Fixed Navigation Bar -->
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="primary"
      fixed="top"
      class="navbar-custom"
    >
      <b-container>
        <b-navbar-brand href="/" class="brand-text">
          Grandma's Recipes
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="me-auto">
            <b-nav-item to="/" exact>
              <b-icon-house></b-icon-house> Home
            </b-nav-item>
            <b-nav-item to="/search">
              <b-icon-search></b-icon-search> Search
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto">
            <template v-if="store.username">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <b-icon-person-circle></b-icon-person-circle>
                  {{ store.username }}
                </template>
                <b-dropdown-item @click="logout">
                  <b-icon-box-arrow-right></b-icon-box-arrow-right> Logout
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </template>
            <template v-else>
              <b-nav-item to="/login">
                <b-icon-box-arrow-in-right></b-icon-box-arrow-in-right> Login
              </b-nav-item>
              <b-nav-item to="/register">
                <b-icon-person-plus></b-icon-person-plus> Register
              </b-nav-item>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!-- Main Content Area -->
    <main class="main-content">
      <b-container fluid class="py-4">
        <slot></slot>
      </b-container>
    </main>
  </div>
</template>

<script>
import {
  BIconHouse,
  BIconSearch,
  BIconPersonCircle,
  BIconBoxArrowRight,
  BIconBoxArrowInRight,
  BIconPersonPlus,
} from "bootstrap-vue-3";

export default {
  name: "DefaultLayout",
  components: {
    BIconHouse,
    BIconSearch,
    BIconPersonCircle,
    BIconBoxArrowRight,
    BIconBoxArrowInRight,
    BIconPersonPlus,
  },
  computed: {
    store() {
      return this.$store || this.$root.store;
    },
  },
  methods: {
    logout() {
      if (this.store && this.store.logout) {
        this.store.logout();
        this.$router.push("/login");
      }
    },
  },
};
</script>
