<template>
  <DefaultLayout title="My Favorites">
    <div>
      <div>
        <!-- No Favorites -->
        <div v-if="recipes.length === 0" class="text-center my-5">
          <h3 class="mt-3">No favorites</h3>
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
    };
  },
  async mounted() {
    await this.loadMyFavorites();
  },
  methods: {
    async loadMyFavorites() {
      try {
        const response = await window.axios.get(
          `${this.$root.store.server_domain}/users/favorites?username=${this.$root.store.username}`
        );
        this.recipes = response.data;
      } catch (error) {
        console.error("Error loading my favorites:", error);
        if (error.response?.status === 404) {
          // No favorites
          this.recipes = [];
        } else {
          console.error("erro:", error);
        }
      }
    },
  },
};
</script>
