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
            <i :class="`bi bi-${item.icon}`" class="me-1"></i>
            {{ item.label }}
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto">
          <b-nav-item> asd </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import logo from "@/assets/logo.webp";
import { menuItems } from "@/assets/constants";

export default {
  name: "MainNavbar",
  data() {
    return {
      logo,
      menuItems,
    };
  },
};
</script>
