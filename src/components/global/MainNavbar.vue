<template>
  <div>
    <b-navbar toggleable="lg" fixed="top" class="bg-dark">
      <b-img :src="logo" alt="Logo" height="60" class="me-lg-4" />

      <!-- Toggle links collapse on small screens -->
      <b-navbar-toggle target="nav-collapse" class="bg-light" />

      <!-- Collapsible content -->
      <b-collapse id="nav-collapse" is-nav>
        <!-- Left aligned nav items -->
        <b-navbar-nav class="me-auto">
          <b-nav-item
            v-for="item in menuItems"
            :key="item.label"
            :href="item.path"
          >
            <i :class="`bi bi-${item.icon}`" class="me-2"></i>
            {{ item.label }}
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto">
          <!-- Logged user -->
          <b-nav-item-dropdown
            v-if="store.username"
            text="Account"
            class="drop-down-menu"
          >
            <template #button-content>
              <i class="bi bi-emoji-smile-fill me-2"></i>
              {{ store.username }}'s Account
            </template>
            <b-dropdown-item href="/my-recipes">
              <i class="bi bi-journal-text me-2"></i>
              My Recipes
            </b-dropdown-item>
            <b-dropdown-item href="/my-favorites">
              <i class="bi bi-heart me-2"></i>
              My Favorites
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="store.username" @click="logout" href="#">
            <i class="bi bi-box-arrow-in-right me-2"></i> Logout
          </b-nav-item>
          <!-- Not logged user -->
          <b-nav-item
            v-else
            v-for="item in loggedOutMenuItems"
            :key="item.label"
            :href="item.path"
          >
            <div v-if="item.label !== 'Hello Guest,'">
              <i :class="`bi bi-${item.icon}`" class="me-2"></i>
            </div>
            {{ item.label }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import logo from "@/assets/logo.webp";
import { menuItems, loggedOutMenuItems } from "@/assets/constants";

export default {
  name: "MainNavbar",
  data() {
    return {
      logo,
      menuItems,
      loggedOutMenuItems,
    };
  },
  computed: {
    store() {
      return this.$root.store;
    },
  },
  methods: {
    logout() {
      this.store.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
