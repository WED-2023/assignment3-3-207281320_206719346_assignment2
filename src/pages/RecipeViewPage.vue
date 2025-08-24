<template>
  <TwoColumnLayout>
    <template #left>
      <div v-if="recipe">
        <div class="recipe-header mb-4">
          <PageTitle>{{ recipe.title }}</PageTitle>
          <img :src="recipe.image" class="center" />
          <div class="d-flex gap-2 mt-3">
            <b-button
              variant="outline-primary"
              class="w-100"
              @click="toggleFavorite"
              :disabled="!store.username"
              :title="
                store.username ? 'Toggle favorite' : 'Login to add favorites'
              "
            >
              <i :class="['bi', isFavorited ? 'bi-star-fill' : 'bi-star']"></i>
            </b-button>
            <b-button variant="outline-primary" class="w-100"
              ><i :class="['bi', isRecipeViewed ? 'bi-eye-fill' : 'bi-eye']"></i
            ></b-button>
          </div>
        </div>
        <div>
          <div class="mb-3">
            <b-list-group>
              <b-list-group-item
                ><span class="fw-bold">Ready in:</span>
                {{ recipe.readyInMinutes }} minutes</b-list-group-item
              >
              <b-list-group-item v-if="!recipe.isUserRecipe"
                ><span class="fw-bold">Likes:</span>
                {{ recipe.aggregateLikes }} likes</b-list-group-item
              >
              <b-list-group-item v-if="recipe.isUserRecipe"
                ><span class="fw-bold">Created by:</span>
                {{ $root.store.username }}</b-list-group-item
              >
              <b-list-group-item variant="primary" v-if="recipe.owner"
                ><span class="fw-bold">Owner:</span>
                {{ recipe.owner }}</b-list-group-item
              >
              <b-list-group-item variant="primary" v-if="recipe.cookedAt"
                ><span class="fw-bold">Cooked at:</span>
                {{ recipe.cookedAt }}</b-list-group-item
              >
            </b-list-group>
          </div>
        </div>
        <!-- <pre>
        {{ $route.params }}
        {{ recipe }}
      </pre
        > -->
      </div>
    </template>
    <template #right>
      <div v-if="recipe">
        <div class="recipe-body">
          <div>
            <PageTitle>Ingredients</PageTitle>
            <b-list-group class="mb-3">
              <b-list-group-item
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </b-list-group-item>
            </b-list-group>
            <PageTitle>Instructions</PageTitle>
            <b-list-group>
              <b-list-group-item
                v-for="s in recipe._instructions"
                :key="s.number"
                >{{ s.number }} - {{ s.step }}</b-list-group-item
              >
            </b-list-group>
          </div>
        </div>
        <!-- <pre>
        {{ $route.params }}
        {{ recipe }}
      </pre
        > -->
      </div>
    </template>
  </TwoColumnLayout>
</template>

<script>
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";
import PageTitle from "@/components/global/PageTitle.vue";
import store from "@/store.js";
import axios from "axios";

export default {
  components: {
    TwoColumnLayout,
    PageTitle,
  },
  mounted() {
    document.title = this.recipe
      ? `Grandma's Recipes - ${this.recipe.title}`
      : "Grandma's Recipes";
  },
  data() {
    return {
      recipe: null,
      store,
      isFavorited: false,
    };
  },
  computed: {
    isRecipeViewed() {
      if (!this.recipe) return false;
      return store.isRecipeViewed(String(this.recipe.id));
    },
  },
  async created() {
    try {
      const recipeId = this.$route.params.recipeId;

      // Check if this is a family recipe
      if (recipeId.startsWith("family_")) {
        await this.loadFamilyRecipe(recipeId);
        return;
      }

      // First, try to get the recipe from user's database
      let userRecipe = null;
      if (this.$root.store.username) {
        try {
          const userResponse = await axios.get(
            `${this.$root.store.server_domain}/simple/myrecipes/${recipeId}?username=${this.$root.store.username}`
          );
          userRecipe = userResponse.data;
        } catch (error) {
          // Recipe not found in user's database, continue to Spoonacular
        }
      }

      let response;
      let isUserRecipe = false;

      if (userRecipe) {
        // Use user recipe from database
        isUserRecipe = true;
        response = { data: userRecipe };
      } else {
        // Try to get from Spoonacular API
        try {
          response = await axios.get(
            this.$root.store.server_domain + "/recipes/" + recipeId,
            {
              params: { id: recipeId },
            }
          );

          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
      }

      let recipeData = response.data;
      let _recipe;

      if (isUserRecipe) {
        // Handle user recipe format
        _recipe = {
          _instructions: recipeData.analyzedInstructions.map((step, index) => ({
            number: index + 1,
            step: step.steps[0].step,
          })),
          analyzedInstructions: recipeData.analyzedInstructions,
          extendedIngredients: recipeData.ingredients.map(
            (ingredient, index) => ({
              id: index,
              original: ingredient.amount + " " + ingredient.name,
              amount: ingredient.amount,
              name: ingredient.name,
            })
          ),
          aggregateLikes: 0, // User recipes don't have likes
          readyInMinutes: recipeData.readyInMinutes,
          image: recipeData.image,
          title: recipeData.title,
          id: recipeData.recipe_id,
          isUserRecipe: true,
        };
      } else {
        // Handle Spoonacular recipe format
        let {
          analyzedInstructions,
          extendedIngredients,
          popularity,
          readyInMinutes,
          image,
          title,
          id,
        } = recipeData;

        let _instructions = analyzedInstructions
          .map((fstep) => {
            fstep.steps[0].step = fstep.name + fstep.steps[0].step;
            return fstep.steps;
          })
          .reduce((a, b) => [...a, ...b], []);

        _recipe = {
          _instructions,
          analyzedInstructions,
          extendedIngredients,
          aggregateLikes: popularity,
          readyInMinutes,
          image,
          title,
          id,
          isUserRecipe: false,
        };
      }

      this.recipe = _recipe;

      // Add recipe ID to viewed recipes list using the store
      store.addToViewedRecipes(recipeId);

      // Check if recipe is favorited
      await this.checkFavoriteStatus();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async loadFamilyRecipe(recipeId) {
      try {
        // Import family recipes
        const familyRecipes = await import("@/assets/familyRecipes.js");
        const recipe = familyRecipes.default.find(
          (r) => r.recipe_id === recipeId
        );

        if (!recipe) {
          this.$router.replace("/NotFound");
          return;
        }

        // Format family recipe to match the expected structure
        this.recipe = {
          _instructions: recipe.analyzedInstructions.map((step, index) => ({
            number: index + 1,
            step: step.steps[0].step,
          })),
          analyzedInstructions: recipe.analyzedInstructions,
          extendedIngredients: recipe.ingredients.map((ingredient, index) => ({
            id: index,
            original: ingredient.amount + " " + ingredient.name,
            amount: ingredient.amount,
            name: ingredient.name,
          })),
          aggregateLikes: recipe.popularity || 0,
          readyInMinutes: recipe.readyInMinutes,
          image: recipe.image,
          title: recipe.title,
          id: recipe.recipe_id,
          vegan: recipe.vegan,
          vegetarian: recipe.vegetarian,
          glutenFree: recipe.glutenFree,
          summary: recipe.summary,
          owner: recipe.owner,
          cookedAt: recipe.cookedAt,
        };

        // Add recipe ID to viewed recipes list using the store
        store.addToViewedRecipes(recipeId);

        // Check if recipe is favorited
        await this.checkFavoriteStatus();
      } catch (error) {
        console.error("Error loading family recipe:", error);
        this.$router.replace("/NotFound");
      }
    },

    async checkFavoriteStatus() {
      if (this.store.username && this.recipe) {
        this.isFavorited = await this.store.isRecipeFavorited(this.recipe.id);
      }
    },

    async toggleFavorite() {
      if (!this.store.username) {
        // Show login prompt or redirect to login
        alert("Please login to add favorites");
        return;
      }

      if (this.isFavorited) {
        alert("Recipe is already in favorites");
        return;
      }

      try {
        await this.store.addToFavorites(this.recipe.id);
        this.isFavorited = true;
        alert("Recipe added to favorites");
      } catch (error) {
        console.error("Error adding to favorites:", error);
        alert("Failed to add to favorites");
      }
    },
  },
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
