<template>
  <div class="container">
    <div v-if="recipes.length === 0" class="text-center">
      <p class="text-muted">None</p>
    </div>

    <div v-else class="row">
      <div class="col" v-for="r in recipes" :key="r.id">
        <RecipeCard :recipe="r" fullWidth="true" class="mb-3" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from "./global/RecipeCard.vue";

export default {
  name: "RecipeLastViewed",
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.loadLastViewedRecipes();
  },
  methods: {
    async loadLastViewedRecipes() {
      try {
        const lastViewed = localStorage.getItem("viewedRecipes");
        if (!lastViewed) {
          this.recipes = [];
          return;
        }

        const recipeIds = JSON.parse(lastViewed);
        const recentIds = recipeIds.slice(0, 3);

        this.recipes = [];

        // Fetch each recipe from the backend
        for (const recipeId of recentIds) {
          try {
            const response = await this.axios.get(
              this.$root.store.server_domain + `/recipes/${recipeId}`
            );
            this.recipes.push(response.data);
          } catch (error) {
            console.log(`Error fetching recipe ${recipeId}:`, error);
            // Continue with other recipes even if one fails
          }
        }
      } catch (error) {
        console.log("Error loading last viewed recipes:", error);
        this.recipes = [];
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>
