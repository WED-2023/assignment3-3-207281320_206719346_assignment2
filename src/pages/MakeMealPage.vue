<template>
  <TwoColumnLayout>
    <template #left>
      <div v-if="recipe">
        <div class="mb-3">
          <PageTitle>{{ recipe.title }}</PageTitle>
          <img :src="recipe.image" class="center" />

          <div class="progress-section mt-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5>Progress: {{ completedSteps }} / {{ totalSteps }} steps</h5>
              <span>{{ progressPercentage }}%</span>
            </div>
            <b-progress
              :value="completedSteps"
              :max="totalSteps"
              height="25px"
            ></b-progress>
          </div>
        </div>

        <div class="mb-3">
          <b-list-group>
            <b-list-group-item>
              <span class="fw-bold">Ready in:</span>
              {{ recipe.readyInMinutes }} minutes
            </b-list-group-item>
            <b-list-group-item v-if="!recipe.isUserRecipe">
              <span class="fw-bold">Likes:</span>
              {{ recipe.aggregateLikes }} likes
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </template>

    <template #right>
      <div v-if="recipe">
        <div class="recipe-body">
          <!-- Servings Control -->
          <PageTitle>Ingredients</PageTitle>
          <div class="d-flex align-items-center gap-2 mb-3">
            <label for="servings" class="form-label mb-0">Servings:</label>

            <input
              id="servings"
              v-model.number="servings"
              type="number"
              min="1"
              class="form-control text-center"
              style="width: 80px"
            />
          </div>

          <b-list-group class="mb-3">
            <b-list-group-item
              v-for="(ingredient, index) in adjustedIngredients"
              :key="index + '_' + ingredient.id"
            >
              {{ ingredient.adjustedAmount
              }}{{
                ingredient.adjustedUnit ? " " + ingredient.adjustedUnit : ""
              }}
              {{ ingredient.name }}
            </b-list-group-item>
          </b-list-group>

          <PageTitle>Instructions</PageTitle>
          <b-list-group>
            <b-list-group-item
              v-for="instruction in recipe._instructions"
              :key="instruction.number"
              :class="{
                completed: completedStepsArray.includes(instruction.number),
              }"
            >
              <div class="d-flex align-items-start">
                <b-form-checkbox
                  :value="instruction.number"
                  v-model="completedStepsArray"
                  class="me-3"
                ></b-form-checkbox>
                <div>
                  <strong>Step {{ instruction.number }}</strong
                  ><br />
                  {{ instruction.step }}
                </div>
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </template>
  </TwoColumnLayout>
</template>

<script>
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";
import PageTitle from "@/components/global/PageTitle.vue";
import store from "@/store.js";

export default {
  name: "MakeMealPage",
  components: { TwoColumnLayout, PageTitle },
  data() {
    return {
      recipe: null,
      servings: 1,
      completedStepsArray: [],
      store,
    };
  },
  computed: {
    totalSteps() {
      return this.recipe?._instructions?.length || 0;
    },
    completedSteps() {
      return this.completedStepsArray.length;
    },
    progressPercentage() {
      return this.totalSteps
        ? Math.round((this.completedSteps / this.totalSteps) * 100)
        : 0;
    },
    adjustedIngredients() {
      if (!this.recipe?.extendedIngredients) return [];
      const originalServings = this.recipe.servings || 1;
      const multiplier = this.servings / originalServings;

      return this.recipe.extendedIngredients.map((ingredient) => {
        const adjustedAmount = (ingredient.amount * multiplier)
          .toFixed(2)
          .replace(/\.?0+$/, "");

        return {
          ...ingredient,
          adjustedAmount: adjustedAmount,
          adjustedUnit: ingredient.unit || "",
        };
      });
    },
  },
  watch: {
    servings() {
      this.saveProgress();
    },
    completedStepsArray() {
      this.saveProgress();
    },
  },
  mounted() {
    document.title = "Grandma's Recipes - Make Meal";
    this.loadRecipe();
    this.loadProgress();
  },
  methods: {
    loadRecipe() {
      const storedRecipe = localStorage.getItem(
        `recipe_${this.$route.params.recipeId}`
      );
      if (storedRecipe) {
        this.recipe = JSON.parse(storedRecipe);
      } else {
        this.$router.replace(`/recipe/${this.$route.params.recipeId}`);
      }
    },
    loadProgress() {
      const progress = this.store.getRecipeCookingProgress(this.recipe?.id);
      if (progress) {
        this.completedStepsArray = progress.completedSteps || [];
        this.servings = progress.servings || this.recipe?.servings || 1;
      } else {
        this.servings = this.recipe?.servings || 1;
      }
    },
    saveProgress() {
      if (this.recipe) {
        this.store.updateRecipeProgress(
          this.recipe.id,
          this.completedStepsArray,
          this.servings
        );
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
