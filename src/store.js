import { reactive } from "vue";
import axios from "axios";

const store = reactive({
  username: localStorage.getItem("username"),
  server_domain: "http://localhost:3000",
  //server_domain: "http://localhost:3000",

  addToViewedRecipes(recipeId) {
    let viewed = JSON.parse(localStorage.getItem("viewedRecipes") || "[]");
    if (!viewed.includes(recipeId)) {
      viewed.push(recipeId);
      localStorage.setItem("viewedRecipes", JSON.stringify(viewed));
    }
  },
  isRecipeViewed(recipeId) {
    let viewed = JSON.parse(localStorage.getItem("viewedRecipes") || "[]");
    return viewed.includes(recipeId);
  },

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

  async createRecipe(recipeData) {
    const response = await axios.post(`${this.server_domain}/users/myrecipes`, {
      recipe: recipeData,
    });
    return response.data;
  },

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
});

export default store;
