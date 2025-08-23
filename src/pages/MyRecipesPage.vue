<template>
  <DefaultLayout title="My Recipes">
    <div class="my-recipes-container">
      <!-- Header with Create Button -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>My Recipes</h2>
        <b-button variant="primary" @click="showNewRecipeModal">
          <i class="bi bi-plus-circle me-2"></i>
          Create New Recipe
        </b-button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center my-5">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
        <p class="mt-2">Loading your recipes...</p>
      </div>

      <!-- Results Section -->
      <div v-else>
        <!-- Results Count -->
        <div class="results-info mb-3">
          <h5 v-if="recipes.length > 0">
            You have {{ recipes.length }} recipe{{
              recipes.length !== 1 ? "s" : ""
            }}
          </h5>
        </div>

        <!-- No Recipes State -->
        <div v-if="recipes.length === 0" class="no-recipes text-center my-5">
          <i class="bi bi-journal-text display-1 text-muted"></i>
          <h3 class="mt-3">No recipes yet</h3>
          <p class="text-muted">Start creating your own recipes!</p>
          <b-button variant="primary" @click="showNewRecipeModal" class="mt-3">
            <i class="bi bi-plus-circle me-2"></i>
            Create Your First Recipe
          </b-button>
        </div>

        <!-- Recipe Cards -->
        <div v-else class="recipes-grid">
          <div v-for="recipe in recipes" :key="recipe.recipe_id" class="mb-4">
            <RecipeCard :recipe="recipe" :fullWidth="true" />
          </div>
        </div>
      </div>

      <!-- New Recipe Modal -->
      <NewRecipeModal
        :show="showModal"
        @update:show="showModal = $event"
        @recipe-created="handleRecipeCreated"
      />
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import RecipeCard from "@/components/global/RecipeCard.vue";
import NewRecipeModal from "@/components/forms/NewRecipeModal.vue";

export default {
  name: "MyRecipesPage",
  components: {
    DefaultLayout,
    RecipeCard,
    NewRecipeModal,
  },
  data() {
    return {
      recipes: [],
      loading: true,
      showModal: false,
    };
  },
  async mounted() {
    await this.loadMyRecipes();
  },
  methods: {
    async loadMyRecipes() {
      try {
        this.loading = true;
        const response = await window.axios.get(
          `${this.$root.store.server_domain}/simple/myrecipes?username=${this.$root.store.username}`
        );
        this.recipes = response.data;
      } catch (error) {
        console.error("Error loading my recipes:", error);
      } finally {
        this.loading = false;
      }
    },
    showNewRecipeModal() {
      this.showModal = true;
    },
    async handleRecipeCreated() {
      await this.loadMyRecipes();
    },
  },
};
</script>

<style scoped>
.my-recipes-container {
  padding: 20px 0;
}

.no-recipes {
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
