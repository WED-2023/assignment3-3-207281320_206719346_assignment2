<template>
  <div class="container">
    <h3>{{ title }}</h3>

    <div class="row">
      <div class="col" v-for="r in recipes" :key="r.id">
        <RecipeCard :recipe="r" fullWidth="true" class="mb-3" />
      </div>
    </div>
    <b-button class="w-100" @click="updateRecipes">Refresh Recipes</b-button>
  </div>
</template>

<script>
import RecipeCard from "./global/RecipeCard.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipeCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
    console.log("Fetched recipes:", this.recipes);
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random"
        );
        /*
        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes); 
        */
        //this.recipes = response.data.recipes;
        this.recipes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>
