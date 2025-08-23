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
    const response = await axios.post(
      `${this.server_domain}/users/myrecipes`,
      { recipe: recipeData },
      { withCredentials: true }
    );
    return response.data;
  },
});

export default store;
