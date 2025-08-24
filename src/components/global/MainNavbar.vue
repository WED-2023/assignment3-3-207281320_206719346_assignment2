<template>
  <div>
    <b-navbar toggleable="lg" fixed="top" class="bg-dark">
      <b-img :src="logo" alt="Logo" height="60" class="me-lg-4" />

      <!-- for mobile toggle -->
      <b-navbar-toggle target="nav-collapse" class="bg-light" />

      <!-- collapsible content -->
      <b-collapse id="nav-collapse" is-nav>
        <!-- left aligned nav items -->
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
          <b-nav-item-dropdown v-if="store.username" class="btn-menu">
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
            <b-dropdown-item href="/family-recipes">
              <i class="bi bi-people me-2"></i>
              Family Recipes
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- New Recipe -->
          <b-nav-item
            v-if="store.username"
            @click="showNewRecipeModal"
            href="#"
          >
            <i class="bi bi-plus-circle me-2"></i> New Recipe
          </b-nav-item>

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

    <!-- New Recipe Modal -->
    <NewRecipeModal
      :show="showModal"
      @update:show="showModal = $event"
      @recipe-created="handleRecipeCreated"
    />
  </div>
</template>

<script>
import logo from "@/assets/logo.webp";
import { menuItems, loggedOutMenuItems } from "@/assets/constants";
import NewRecipeModal from "@/components/forms/NewRecipeModal.vue";

export default {
  name: "MainNavbar",
  components: {
    NewRecipeModal,
  },
  data() {
    return {
      logo,
      menuItems,
      loggedOutMenuItems,
      showModal: false,
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
    showNewRecipeModal() {
      this.showModal = true;
    },
    handleRecipeCreated(recipe) {
      // Emit event to parent component or handle as needed
      this.$emit("recipe-created", recipe);
      // Recipe creation handled by the modal component itself
    },
  },
};
</script>
<style scoped>
.btn-menu {
  background-color: #fff;
}
</style>
