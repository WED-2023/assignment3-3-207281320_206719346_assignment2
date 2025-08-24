<template>
  <DefaultLayout title="Search">
    <div>
      <div class="mb-4">
        <b-row>
          <b-col md="4">
            <b-form-group label="Search:" label-for="search-input">
              <b-form-input
                id="search-input"
                v-model="searchQuery"
                placeholder="SEARCH"
                @keyup.enter="searchRecipes"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group label="Numbr of Results:" label-for="number-select">
              <b-form-select
                id="number-select"
                v-model="numberOfResults"
                :options="[
                  { value: 5, text: '5' },
                  { value: 10, text: '10' },
                  { value: 15, text: '15' },
                ]"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group label="Cuisine:" label-for="cuisine-select">
              <b-form-select
                id="cuisine-select"
                v-model="selectedCuisine"
                :options="cuisineOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group label="Diet:" label-for="diet-select">
              <b-form-select
                id="diet-select"
                v-model="selectedDiet"
                :options="dietOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group label="Intolerance:" label-for="intolerance-select">
              <b-form-select
                id="intolerance-select"
                v-model="selectedIntolerance"
                :options="intoleranceOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col class="d-flex justify-content-end">
            <b-button
              @click="searchRecipes"
              :disabled="!searchQuery.trim()"
              class="w-100"
            >
              <i class="bi bi-search"></i> Search
            </b-button>
          </b-col>
        </b-row>
      </div>

      <div class="mb-3">
        <b-row>
          <b-col md="6">
            <b-form-group label="Sort by:" label-for="sort-select">
              <b-form-select
                id="sort-select"
                v-model="sortBy"
                :options="[
                  { value: 'none', text: 'None' },
                  { value: 'readyTime', text: 'Ready Time' },
                  { value: 'popularity', text: 'Popularity' },
                ]"
                @change="sortRecipes"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <div v-if="searchPerformed">
        <!-- No Results -->
        <div v-if="recipes.length === 0" class="no-results text-center my-5">
          <h3 class="mt-3">No recipes</h3>
        </div>

        <!-- Recipe Cards -->
        <div v-else class="recipes-grid">
          <div v-for="recipe in recipes" :key="recipe.id" class="mb-3">
            <RecipeCard :recipe="recipe" :fullWidth="true" />
          </div>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center mb-3">
        <h3 class="mt-3">No recipes</h3>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import RecipeCard from "@/components/global/RecipeCard.vue";
import store from "@/store.js";
import {
  cuisineFilters,
  dietFilters,
  intolerancesFilters,
} from "@/assets/filters.js";

export default {
  name: "SearchPage",
  components: {
    DefaultLayout,
    RecipeCard,
  },
  data() {
    return {
      searchQuery: "",
      numberOfResults: 5,
      selectedCuisine: "",
      selectedDiet: "",
      selectedIntolerance: "",
      recipes: [],
      searchPerformed: false,
      sortBy: "none",
      originalRecipes: [],
    };
  },
  computed: {
    cuisineOptions() {
      return [
        { value: "", text: "Any cuisine" },
        ...cuisineFilters.map((cuisine) => ({
          value: cuisine,
          text: cuisine,
        })),
      ];
    },
    dietOptions() {
      return [
        { value: "", text: "Any diet" },
        ...dietFilters.map((diet) => ({ value: diet, text: diet })),
      ];
    },
    intoleranceOptions() {
      return [
        { value: "", text: "Any intolerance" },
        ...intolerancesFilters.map((intolerance) => ({
          value: intolerance,
          text: intolerance,
        })),
      ];
    },
  },
  mounted() {
    document.title = "Grandma's Recipes - Search";
    // Check if there's a last search in sessionStorage // TODO: CHECK BUG, SESSION STORAGE IS NOT WORKING???
    const lastSearch = store.getLastSearch();
    if (lastSearch) {
      this.searchQuery = lastSearch;
      this.searchRecipes();
    }
  },
  methods: {
    async searchRecipes() {
      if (!this.searchQuery.trim()) return;
      store.setLastSearch(this.searchQuery);
      this.searchPerformed = false;

      try {
        const params = new URLSearchParams({
          query: this.searchQuery,
          number: this.numberOfResults,
        });

        if (this.selectedCuisine) {
          params.append("cuisine", this.selectedCuisine);
        }
        if (this.selectedDiet) {
          params.append("diet", this.selectedDiet);
        }
        if (this.selectedIntolerance) {
          params.append("intolerances", this.selectedIntolerance);
        }

        const response = await fetch(
          `${store.server_domain}/recipes/search?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          // TODO: Remove this after testing. WHYYY WONT IT WORK?!
          /*
          console.log("Frontend received data:", data);
          console.log("First recipe:", data[0]);
          console.log("First recipe readyInMinutes:", data[0]?.readyInMinutes);
          console.log("First recipe popularity:", data[0]?.popularity);
          */

          const detailedRecipes = [];
          for (const recipe of data) {
            try {
              const detailResponse = await fetch(
                `${store.server_domain}/recipes/${recipe.id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                }
              );

              if (detailResponse.ok) {
                const recipeDetails = await detailResponse.json();
                detailedRecipes.push(recipeDetails);
              }
            } catch (error) {
              console.error("Error fetching recipe details:", error);
            }
          }

          this.recipes = detailedRecipes;
          this.originalRecipes = [...detailedRecipes]; // Keep a copy for filtering
          this.searchPerformed = true;
        } else {
          console.error("Search failed:", response.statusText);
          this.recipes = [];
          this.searchPerformed = true;
        }
      } catch (error) {
        console.error("Search error:", error);
        this.recipes = [];
        this.searchPerformed = true;
      }
    },

    sortRecipes() {
      if (!this.originalRecipes.length) return;

      if (this.sortBy === "none") {
        this.recipes = [...this.originalRecipes];
        return;
      }

      this.recipes = [...this.originalRecipes].sort((a, b) => {
        let aValue, bValue;

        if (this.sortBy === "readyTime") {
          aValue = a.readyInMinutes || 0;
          bValue = b.readyInMinutes || 0;
        } else if (this.sortBy === "popularity") {
          aValue = a.popularity || 0;
          bValue = b.popularity || 0;
        }

        return aValue - bValue;
      });
    },
  },
};
</script>
