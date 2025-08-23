<template>
  <TwoColumnLayout>
    <template #left>
      <div v-if="recipe">
        <div class="recipe-header mb-4">
          <PageTitle>{{ recipe.title }}</PageTitle>
          <img :src="recipe.image" class="center" />
          <div class="d-flex gap-2 mt-3">
            <b-button variant="outline-primary" class="w-100"
              ><i class="bi bi-star"></i
            ></b-button>
            <b-button variant="outline-primary" class="w-100"
              ><i class="bi bi-eye"></i
            ></b-button>
          </div>
        </div>
        <div>
          <div class="mb-3">
            <b-list-group>
              <b-list-group-item
                >Ready in {{ recipe.readyInMinutes }} minutes</b-list-group-item
              >
              <b-list-group-item
                >Likes: {{ recipe.aggregateLikes }} likes</b-list-group-item
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

export default {
  components: {
    TwoColumnLayout,
    PageTitle,
  },
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;

      try {
        response = await this.axios.get(
          this.$root.store.server_domain +
            "/recipes/" +
            this.$route.params.recipeId,
          {
            params: { id: this.$route.params.recipeId },
          }
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
      } = response.data;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes: popularity,
        readyInMinutes,
        image,
        title,
      };
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
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
