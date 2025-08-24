import { reactive } from "vue";
import axios from "axios";

const store = reactive({
  username: localStorage.getItem("username"),
  server_domain: "http://localhost:3000",
  //server_domain: "http://localhost:3000",

  // Last search stuff
  getLastSearch() {
    return sessionStorage.getItem("lastSearch");
  },

  setLastSearch(searchQuery) {
    sessionStorage.setItem("lastSearch", searchQuery);
  },

  // Viewed recipes stuff
  addToViewedRecipes(recipeId) {
    let viewed = JSON.parse(localStorage.getItem("viewedRecipes") || "[]");

    // to string
    viewed = viewed.map((id) => String(id));
    const stringRecipeId = String(recipeId);

    // Remove the recipe if it already exists in the list
    viewed = viewed.filter((id) => id !== stringRecipeId);

    // Add to the beginning for last viewed
    viewed.unshift(stringRecipeId);

    localStorage.setItem("viewedRecipes", JSON.stringify(viewed));
  },
  isRecipeViewed(recipeId) {
    let viewed = JSON.parse(localStorage.getItem("viewedRecipes") || "[]");
    return viewed.map((id) => String(id)).includes(String(recipeId));
  },

  // Login stuff
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },

  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
  },

  // Recipe stuff
  async createRecipe(recipeData) {
    const response = await axios.post(`${this.server_domain}/users/myrecipes`, {
      recipe: recipeData,
    });
    return response.data;
  },

  // Favorites stuff
  async addToFavorites(recipeId) {
    try {
      const response = await axios.post(
        `${this.server_domain}/users/favorites`,
        { recipeId, username: this.username }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  },

  async isRecipeFavorited(recipeId) {
    try {
      const response = await axios.get(
        `${this.server_domain}/users/favorites/${recipeId}`,
        {
          params: { username: this.username },
        }
      );
      return response.data.isFavorited;
    } catch (error) {
      console.error("Error checking favorite status:", error);
      return false;
    }
  },

  // Cooking progress stuff
  getRecipeCookingProgress(recipeId) {
    const progress = JSON.parse(
      sessionStorage.getItem("cookingProgress") || "[]"
    );
    return progress.find((item) => item.recipeId === String(recipeId)) || null;
  },

  updateRecipeProgress(recipeId, completedSteps, servings) {
    const progress = JSON.parse(
      sessionStorage.getItem("cookingProgress") || "[]"
    );
    const recipeIndex = progress.findIndex(
      (item) => item.recipeId === String(recipeId)
    );

    if (recipeIndex !== -1) {
      progress[recipeIndex].completedSteps = completedSteps;
      progress[recipeIndex].servings = servings;
    } else {
      progress.push({
        recipeId: String(recipeId),
        completedSteps: completedSteps,
        servings: servings,
      });
    }

    sessionStorage.setItem("cookingProgress", JSON.stringify(progress));
  },
});

export default store;
