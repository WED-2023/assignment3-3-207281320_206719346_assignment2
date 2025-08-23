<template>
  <DefaultLayout title="Search Recipes">
    <div class="search-container">
      <!-- Search Form -->
      <div class="search-form mb-4">
        <b-row>
          <b-col md="4">
            <b-form-group label="Search Recipes:" label-for="search-input">
              <b-form-input
                id="search-input"
                v-model="searchQuery"
                placeholder="Enter recipe name, ingredients, or cuisine..."
                @keyup.enter="searchRecipes"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group label="Number of Results:" label-for="number-select">
              <b-form-select
                id="number-select"
                v-model="numberOfResults"
                :options="[
                  { value: 5, text: '5 recipes' },
                  { value: 10, text: '10 recipes' },
                  { value: 15, text: '15 recipes' },
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
              variant="primary"
              @click="searchRecipes"
              :disabled="!searchQuery.trim()"
              class="px-4"
            >
              <i class="bi bi-search"></i> Search
            </b-button>
          </b-col>
        </b-row>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center my-5">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
        <p class="mt-2">Searching for recipes...</p>
      </div>

      <!-- Results Section -->
      <div v-else-if="searchPerformed">
        <!-- Filter Options -->
        <div v-if="recipes.length > 0" class="filters-section mb-4">
          <b-row>
            <b-col md="4">
              <b-form-group label="Sort by:" label-for="sort-select">
                <b-form-select
                  id="sort-select"
                  v-model="sortBy"
                  :options="[
                    { value: 'none', text: 'No sorting' },
                    { value: 'readyTime', text: 'Ready Time' },
                    { value: 'popularity', text: 'Popularity' },
                  ]"
                  @change="sortRecipes"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Order:" label-for="order-select">
                <b-form-select
                  id="order-select"
                  v-model="sortOrder"
                  :options="[
                    { value: 'asc', text: 'Ascending' },
                    { value: 'desc', text: 'Descending' },
                  ]"
                  @change="sortRecipes"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="4" class="d-flex align-items-end">
              <b-button
                variant="outline-secondary"
                @click="clearFilters"
                class="w-100"
              >
                Clear Filters
              </b-button>
            </b-col>
          </b-row>
        </div>

        <!-- Results Count -->
        <div class="results-info mb-3">
          <h5 v-if="recipes.length > 0">
            Found {{ recipes.length }} recipe{{
              recipes.length !== 1 ? "s" : ""
            }}
          </h5>
        </div>

        <!-- No Results -->
        <div v-if="recipes.length === 0" class="no-results text-center my-5">
          <i class="bi bi-search display-1 text-muted"></i>
          <h3 class="mt-3">No recipes found</h3>
          <p class="text-muted">
            Try adjusting your search terms or browse our recipe collection.
          </p>
        </div>

        <!-- Recipe Cards -->
        <div v-else class="recipes-grid">
          <div v-for="recipe in recipes" :key="recipe.id" class="mb-4">
            <RecipeCard :recipe="recipe" :fullWidth="true" />
          </div>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="initial-state text-center my-5">
        <i class="bi bi-search display-1 text-muted"></i>
        <h3 class="mt-3">Search for Recipes</h3>
        <p class="text-muted">
          Enter ingredients, cuisine types, or recipe names to discover
          delicious recipes.
        </p>
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
      loading: false,
      searchPerformed: false,
      sortBy: "none",
      sortOrder: "asc",
      originalRecipes: [], // Keep original order for filtering
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
  methods: {
    async searchRecipes() {
      if (!this.searchQuery.trim()) return;

      this.loading = true;
      this.searchPerformed = false;

      try {
        // Build query parameters
        const params = new URLSearchParams({
          query: this.searchQuery,
          number: this.numberOfResults,
        });

        // Add filter parameters if selected
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

          // Fetch detailed information for each recipe
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
              } else {
                // Fallback to basic recipe info
                detailedRecipes.push({
                  ...recipe,
                  readyInMinutes: 0,
                  popularity: 0,
                  vegan: false,
                  vegetarian: false,
                  glutenFree: false,
                });
              }
            } catch (error) {
              console.error(
                `Error fetching details for recipe ${recipe.id}:`,
                error
              );
              // Fallback to basic recipe info
              detailedRecipes.push({
                ...recipe,
                readyInMinutes: 0,
                popularity: 0,
                vegan: false,
                vegetarian: false,
                glutenFree: false,
              });
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
      } finally {
        this.loading = false;
      }
    },

    sortRecipes() {
      console.log("Sorting recipes by:", this.sortBy, "order:", this.sortOrder);
      console.log("Original recipes:", this.originalRecipes);

      if (this.sortBy === "none") {
        this.recipes = [...this.originalRecipes];
        return;
      }

      this.recipes = [...this.originalRecipes].sort((a, b) => {
        let aValue, bValue;

        if (this.sortBy === "readyTime") {
          aValue = a.readyInMinutes || 0;
          bValue = b.readyInMinutes || 0;
          console.log(
            `Comparing readyTime: ${a.title}(${aValue}) vs ${b.title}(${bValue})`
          );
        } else if (this.sortBy === "popularity") {
          aValue = a.popularity || 0;
          bValue = b.popularity || 0;
          console.log(
            `Comparing popularity: ${a.title}(${aValue}) vs ${b.title}(${bValue})`
          );
        }

        if (this.sortOrder === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });

      console.log("Sorted recipes:", this.recipes);
    },

    clearFilters() {
      this.sortBy = "none";
      this.sortOrder = "asc";
      this.recipes = [...this.originalRecipes];
    },
  },
};
</script>

<style scoped>
.search-container {
  margin: 0 auto;
}

.search-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filters-section {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.results-info {
  border-bottom: 2px solid var(--color-accent);
  padding-bottom: 10px;
}

.recipes-grid {
  min-height: 400px;
}

.no-results,
.initial-state {
  color: var(--color-muted);
}

.no-results i,
.initial-state i {
  opacity: 0.5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .search-container {
    padding: 10px;
  }

  .search-form {
    padding: 15px;
  }
}
</style>
