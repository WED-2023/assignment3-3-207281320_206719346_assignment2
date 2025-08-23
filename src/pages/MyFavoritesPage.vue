<template>
  <DefaultLayout title="My Favorites">
    <div class="my-favorites-container">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>My Favorites</h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center my-5">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
        <p class="mt-2">Loading your favorite recipes...</p>
      </div>

      <!-- Results Section -->
      <div v-else>
        <!-- Results Count -->
        <div class="results-info mb-3">
          <h5 v-if="recipes.length > 0">
            You have {{ recipes.length }} favorite recipe{{
              recipes.length !== 1 ? "s" : ""
            }}
          </h5>
        </div>

        <!-- No Favorites State -->
        <div v-if="recipes.length === 0" class="no-favorites text-center my-5">
          <i class="bi bi-heart display-1 text-muted"></i>
          <h3 class="mt-3">No favorites yet</h3>
          <p class="text-muted">
            Start exploring recipes and add them to your favorites!
          </p>
          <router-link to="/search" class="btn btn-primary mt-3">
            <i class="bi bi-search me-2"></i>
            Explore Recipes
          </router-link>
        </div>

        <!-- Recipe Cards -->
        <div v-else class="recipes-grid">
          <div v-for="recipe in recipes" :key="recipe.id" class="mb-4">
            <RecipeCard :recipe="recipe" :fullWidth="true" />
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import RecipeCard from "@/components/global/RecipeCard.vue";

export default {
  name: "MyFavoritesPage",
  components: {
    DefaultLayout,
    RecipeCard,
  },
  data() {
    return {
      recipes: [],
      loading: true,
    };
  },
  async mounted() {
    await this.loadMyFavorites();
  },
  methods: {
    async loadMyFavorites() {
      try {
        this.loading = true;
        const response = await window.axios.get(
          `${this.$root.store.server_domain}/users/favorites?username=${this.$root.store.username}`
        );
        this.recipes = response.data;
      } catch (error) {
        console.error("Error loading my favorites:", error);
        if (error.response?.status === 404) {
          // No favorites found
          this.recipes = [];
        } else {
          // Other error
          console.error("Failed to load favorites:", error);
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.my-favorites-container {
  padding: 20px 0;
}

.no-favorites {
  padding: 60px 20px;
}

.recipes-grid {
  margin-top: 20px;
}

.results-info h5 {
  color: #6c757d;
  font-weight: 500;
}
</style>
