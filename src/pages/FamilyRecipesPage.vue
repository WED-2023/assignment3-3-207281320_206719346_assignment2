<template>
  <DefaultLayout title="Family Recipes">
    <div>
      <div>
        <!-- Recipe Cards -->
        <div>
          <div
            v-for="recipe in familyRecipes"
            :key="recipe.recipe_id"
            class="mb-3"
          >
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
import familyRecipes from "@/assets/familyRecipes.js";
import store from "@/store.js";

export default {
  name: "FamilyRecipesPage",
  components: {
    DefaultLayout,
    RecipeCard,
  },
  data() {
    return {
      familyRecipes: familyRecipes,
    };
  },
  mounted() {
    this.familyRecipes.forEach((recipe) => {
      store.addToViewedRecipes(recipe.recipe_id);
    });
  },
};
</script>
