<template>
  <div>
    <b-navbar toggleable="lg" fixed="top">
      <b-img :src="logo" alt="Logo" height="60" class="me-4" />

      <!-- Use a method to toggle -->
      <b-navbar-toggle @click="toggleCollapse"></b-navbar-toggle>

      <!-- v-model handles the state -->
      <b-collapse is-nav v-model="collapsed">
        <!-- Left aligned nav items -->
        <b-navbar-nav class="me-auto">
          <b-nav-item
            v-for="item in menuItems"
            :key="item.label"
            :href="item.path"
            @click="closeCollapse"
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
      collapsed: false,
    };
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    closeCollapse() {
      this.collapsed = true;
    },
  },
};
</script>
