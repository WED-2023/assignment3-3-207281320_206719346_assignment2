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
              ><i
                :class="[
                  'bi',
                  store.isRecipeViewed(recipe.id) ? 'bi-eye' : 'bi-eye-fill',
                ]"
              ></i
            ></b-button>
          </div>
        </div>
        <div>
          <div class="mb-3">
            <b-list-group>
              <b-list-group-item
                >Ready in {{ recipe.readyInMinutes }} minutes</b-list-group-item
              >
              <b-list-group-item v-if="!recipe.isUserRecipe"
                >Likes: {{ recipe.aggregateLikes }} likes</b-list-group-item
              >
              <b-list-group-item v-if="recipe.isUserRecipe"
                >Created by: {{ $root.store.username }}</b-list-group-item
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
  data() {
    return {
      recipe: null,
      store,
      isFavorited: false,
    };
  },
  async created() {
    try {
      const recipeId = this.$route.params.recipeId;

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
              original: ingredient,
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
