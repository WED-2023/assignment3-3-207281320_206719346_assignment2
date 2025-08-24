<template>
  <DefaultLayout title="My Recipes">
    <div class="my-recipes-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <b-button variant="primary" class="w-100" @click="showNewRecipeModal">
          <i class="bi bi-plus-circle me-2"></i>
          Create New Recipe
        </b-button>
      </div>

      <div>
        <!-- No Recipes -->
        <div v-if="recipes.length === 0" class="text-center my-5">
          <h3 class="mt-3">No recipes</h3>
        </div>

        <!-- Recipe Cards -->
        <div v-else>
          <div v-for="recipe in recipes" :key="recipe.recipe_id" class="mb-3">
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
      showModal: false,
    };
  },
  async mounted() {
    await this.loadMyRecipes();
  },
  methods: {
    async loadMyRecipes() {
      try {
        const response = await window.axios.get(
          `${this.$root.store.server_domain}/simple/myrecipes?username=${this.$root.store.username}`
        );
        this.recipes = response.data;
      } catch (error) {
        console.error("Error loading my recipes:", error);
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
